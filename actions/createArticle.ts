'use server'
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { z } from "zod"

import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const createArcticleSchema = z.object({
    title: z.string().min(3).max(100),
    category: z.string().min(3).max(50),
    content: z.string().min(10)
})

// initial state 
type createArticlesFormstate = {
    errors: {
        title?: string[], // optionaly only 
        category?: string[],
        featuredImage?: string[],
        content?: string[],
        formErrors?: string[]
    }
}

export const createArticle = async (prevState: createArticlesFormstate, formData: FormData): Promise<createArticlesFormstate> => {
    const result = createArcticleSchema.safeParse({
        title: formData.get('title'),
        category: formData.get('category'),
        content: formData.get('content')
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    // user authenticated or not.
    const { userId } = await auth();
    if (!userId) {
        return {
            errors: {
                formErrors: ['You have to login first.']
            }
        }
    }

    // check if user already exists in our database.
    const existingUser = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    })

    if (!existingUser) {
        return {
            errors: {
                formErrors: ['User not found. Please login again.']
            }
        }
    }

    // start creating article.
    const imageFile = formData.get('featuredImage') as File | null;
    if (!imageFile || imageFile.name === 'undefined') {
        return {
            errors: {
                featuredImage: ['Image file is requried.']
            }
        }
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }
        );
        uploadStream.end(buffer);
    })
    const imageUrl = uploadResponse?.secure_url;
    if (!imageUrl) {
        return {
            errors: {
                featuredImage: ['Failed to upload image. Please try again']
            }
        }
    }

    try {
        await prisma.articles.create({
            data: {
                title: result.data.title,
                category: result.data.category,
                content: result.data.content,
                featuredImage: imageUrl,
                authorId: existingUser.id,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formErrors: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    formErrors: [
                        'Some internal server error occurred'
                    ]
                }
            }
        }
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
};