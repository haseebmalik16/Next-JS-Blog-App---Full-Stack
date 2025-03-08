'use server'
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createCommentSchema = z.object({
    body: z.string().min(1)
})

type CreateCommentFormState = {
    errors: {
        body?: string[]
        formErrors?: string[]
    }
}

export const createComment = async (articleId: string, prevState: CreateCommentFormState, formData: FormData): Promise<CreateCommentFormState> => {
    const result = createCommentSchema.safeParse({
        body: formData.get('body')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const { userId } = await auth();

    if (!userId) {
        return {
            errors: {
                formErrors: ['You have to login first.']
            }
        }
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        }
    });
    if (!existingUser) {
        return {
            errors: {
                formErrors: ['User not found. Please login again.']
            }
        }
    }

    // after that create user.
    try {
        await prisma.comment.create({
            data: {
                body: result.data.body,
                authorId: existingUser.id,
                articleId
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
                    formErrors: ['Error occurred while creating comment']
                }
            }
        }
    }

    revalidatePath(`/articles/${articleId}`);
    return { errors: {} }
}