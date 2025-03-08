import type { Prisma } from '@prisma/client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import LikeButton from './LikeButton'
import CommentList from '../comments/CommentList'
import CommentInput from '../comments/CommentInput'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
type ArticleDetailPageProps = {
    article: Prisma.ArticlesGetPayload<{
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>
}


const ArticleDetailPage: React.FC<ArticleDetailPageProps> = async ({ article }) => {
    // all comments fetch.
    const comments = await prisma.comment.findMany({
        where: { articleId: article.id },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    });

    const likes = await prisma.like.findMany({
        where: { articleId: article.id }
    });

    // find userID.
    const { userId } = await auth();

    // find the user.
    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId as string
        }
    });

    const isLiked: boolean = likes.some((like) => like.userId === user?.id);

    return (
        <div className='min-h-screen bg-background'>
            <main className='container mx-auto py-12 px-4 sm:px-6 lg:px-6'>
                <article className='mx-auto max-w-3xl'>
                    {/* header  */}
                    <header className='mb-12'>
                        <div className='flex flex-wrap gap-2 mb-4'>
                            <span className='px-3 py-1 text-sm'>{article.category}</span>
                        </div>
                        <h1 className='font-bold text-4xl mb-4'>{article.title}</h1>
                        <div className='flex items-center gap-4'>
                            <Avatar>
                                <AvatarImage src={article.author.imageUrl || ""} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div>
                                <p className='font-medium'>{article.author.name}</p>
                                <p className='text-sm flex items-center gap-2'>{article.createdAt.toDateString()} <span className='text-xl'>&#183;</span> 12min to read</p>
                            </div>
                        </div>
                    </header>
                    {/* article information  */}
                    <section className='mb-12 max-w-none' dangerouslySetInnerHTML={{ __html: article.content }} />

                    {/* article actions button  */}
                    <LikeButton articleId={article.id} likes={likes} isLiked={isLiked} />

                    {/* comment input  */}
                    <CommentInput articleId={article.id} />

                    {/* comment section  */}
                    <CommentList comments={comments} />
                </article>
            </main>
        </div>
    )
}

export default ArticleDetailPage
