import AllArticlePage from '@/components/articles/AllArticlePage'
import ArticleSearchBar from '@/components/articles/ArticleSearchBar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'

type SearchPageProps = {
    searchParams: Promise<{ search?: string }>
}

const page: React.FC<SearchPageProps> = async ({ searchParams }) => {
    const searchText = (await searchParams).search || ''
    return (
        <div className='min-h-screen bg-background'>
            <main className='container mx-auto px-4 py-12 sm:px-6 lg:text-5xl'>
                {/* page header  */}
                <div className='mb-12 space-y-6 text-center'>
                    <h1 className='text-4xl font-bold sm:text-5xl'>All Articles </h1>

                    {/* search bar  */}
                    <ArticleSearchBar />
                </div>

                {/* all articles card  */}
                <Suspense fallback={<AllArticlesPageSkeleton />}>
                    <AllArticlePage searchText={searchText} />
                </Suspense>


                {/* pagination  */}
                <div className='mt-12 flex justify-center gap-2'>
                    <Button variant={'ghost'} size={'sm'}> ← Prev</Button>
                    <Button variant={'ghost'} size={'sm'}>1</Button>
                    <Button variant={'ghost'} size={'sm'}>2</Button>
                    <Button variant={'ghost'} size={'sm'}>3</Button>
                    <Button variant={'ghost'} size={'sm'}>Next → </Button>
                </div>
            </main>
        </div>
    )
}

export default page

export function AllArticlesPageSkeleton() {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <Card
                    key={index}
                    className="group relative overflow-hidden transition-all hover:shadow-lg"
                >
                    <div className="p-6">
                        {/* Article Image Skeleton */}
                        <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />

                        {/* Article Title Skeleton */}
                        <Skeleton className="h-6 w-3/4 rounded-lg" />

                        {/* Article Category Skeleton */}
                        <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />

                        {/* Author & Metadata Skeleton */}
                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Author Avatar Skeleton */}
                                <Skeleton className="h-8 w-8 rounded-full" />

                                {/* Author Name Skeleton */}
                                <Skeleton className="h-4 w-20 rounded-lg " />
                            </div>

                            {/* Date Skeleton */}
                            <Skeleton className="h-4 w-24 rounded-lg " />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
