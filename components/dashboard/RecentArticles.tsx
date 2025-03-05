import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Prisma } from '@prisma/client'

type RecentArticlesProps = {
    articles: Prisma.ArticlesGetPayload<{
        include: {
            comments: true;
            author: {
                select: {
                    name: true;
                    email: true;
                    imageUrl: true;
                };
            };
        };
    }>[];
}

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>Recent Articles</CardTitle>
                    <Button className='text-muted-foreground' size={'sm'} variant={'ghost'}>View All → </Button>
                </div>
            </CardHeader>
            {
                !articles.length ? (<CardContent>No article found</CardContent>) : (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Comments</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    articles.map((article) => (
                                        <>
                                            <TableRow key={article.id}>
                                                <TableCell>{article.title}</TableCell>
                                                <TableCell>
                                                    <Badge className='rounded-full bg-green-100 text-green-800' variant={'secondary'}>Published</Badge>
                                                </TableCell>
                                                <TableCell>{
                                                    article.comments.length}</TableCell>
                                                <TableCell>{article.createdAt.toDateString()}</TableCell>
                                                <TableCell>
                                                    <div className='flex items-center gap-2'>
                                                        <Link href={`/dashboard/articles/${article.id}/edit`}>
                                                            <Button variant={'ghost'} size={'sm'}>Edit</Button>
                                                        </Link>
                                                        <DeleteButton />
                                                    </div>
                                                </TableCell>

                                            </TableRow>
                                        </>
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </CardContent>
                )
            }

        </Card>
    )
}

export default RecentArticles

const DeleteButton = () => {
    return (
        <form>
            <Button variant={'ghost'} size={'sm'} type='submit'>
                Delete
            </Button>
        </form>
    )
}
