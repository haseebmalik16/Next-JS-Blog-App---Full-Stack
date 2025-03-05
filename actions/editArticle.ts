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

export const editArticle = async (articleId: string, prevState: createArticlesFormstate, formData: FormData): Promise<createArticlesFormstate> => {
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

    // get the article first.
    const existingArticle = await prisma.articles.findUnique({
        where: {
            id: articleId
        }
    });
    if (!existingArticle) {
        return {
            errors: {
                formErrors: ['Article not found']
            }
        }
    }

    // check if user already exists in our database.
    const existingUser = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    })

    if (!existingUser || existingArticle.authorId !== existingUser.id) {
        return {
            errors: {
                formErrors: ['User not found. Please login again.']
            }
        }
    }

    // start editing article.
    let imageUrl = existingArticle.featuredImage;
    const imageFile = formData.get('featuredImage') as File | null;
    if (imageFile && imageFile.name !== 'undefined') {
        try {
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
            });

            if (uploadResponse?.secure_url) {
                imageUrl = uploadResponse.secure_url
            } else {
                return {
                    errors: {
                        featuredImage: ['Failed to upload image. Please try again']
                    }
                }
            }

        } catch (error) {
            return {
                errors: {
                    featuredImage: ['Failed to upload image. Please try again']
                },
            };
        }

        try {
            await prisma.articles.update({
                where: { id: articleId },
                data: {
                    title: result.data.title,
                    category: result.data.content,
                    content: result.data.content,
                    featuredImage: imageUrl,
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
    }
}