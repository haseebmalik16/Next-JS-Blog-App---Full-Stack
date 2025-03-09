import AllArticlePage from '@/components/articles/AllArticlePage'
import ArticleSearchBar from '@/components/articles/ArticleSearchBar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchArticleByQuery } from '@/lib/query/fetchArticleByQuery'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";

type SearchPageProps = {
    searchParams: Promise<{ search?: string, page?: string }>
}

const ITEMS_PER_PAGE = 3;

const page: React.FC<SearchPageProps> = async ({ searchParams }) => {
    const searchText = (await searchParams).search || '';
    const currentPage = Number((await searchParams).page) || 1;

    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    const take = ITEMS_PER_PAGE;

    // fetch articles.
    const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen">
            <main className="container mx-auto flex flex-col items-center px-6 py-16 sm:px-8 lg:px-12">

                {/* Page Header */}
                <div className="flex w-full items-center justify-start">
                    <Link href="/">
                        <Button variant="outline" className="border-gray-300/50 hover:border-gray-300/80">
                            <FaLongArrowAltLeft className="text-gray-700 dark:text-gray-300" />
                        </Button>
                    </Link>
                </div>

                {/* Page Title & Search Bar */}
                <div className="mb-10 flex flex-col items-center space-y-6 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl font-[Gilroy]">
                        All Articles
                    </h1>
                    <ArticleSearchBar />
                </div>

                {/* Articles Section */}
                <Suspense fallback={<AllArticlesPageSkeleton />}>
                    <AllArticlePage articles={articles} />
                </Suspense>

                {/* Pagination */}
                <div className="mt-12 flex justify-center gap-4">
                    <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
                        <Button disabled={currentPage === 1} variant="ghost" size="sm" className="transition-transform hover:scale-105">
                            ← Prev
                        </Button>
                    </Link>
                    {
                        Array.from({ length: totalPages }).map((_, index) => (
                            <Link key={index} href={`?search=${searchText}&page=${index + 1}`} passHref>
                                <Button
                                    variant={currentPage === index + 1 ? "destructive" : "ghost"}
                                    size="sm"
                                    className="rounded-lg transition-all hover:shadow-md"
                                >
                                    {index + 1}
                                </Button>
                            </Link>
                        ))
                    }
                    <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
                        <Button disabled={currentPage === totalPages} variant="ghost" size="sm" className="transition-transform hover:scale-105">
                            Next →
                        </Button>
                    </Link>
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
                    className="group relative overflow-hidden rounded-xl bg-white/40 backdrop-blur-lg shadow-md transition-all hover:shadow-lg dark:bg-gray-800/40"
                >
                    <div className="p-6">
                        {/* Article Image Skeleton */}
                        <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-200/60 to-blue-200/60 dark:from-purple-900/40 dark:to-blue-900/40" />

                        {/* Article Title Skeleton */}
                        <Skeleton className="h-6 w-3/4 rounded-lg bg-gray-300/60 dark:bg-gray-700/60" />

                        {/* Article Category Skeleton */}
                        <Skeleton className="mt-2 h-4 w-1/2 rounded-lg bg-gray-300/50 dark:bg-gray-700/50" />

                        {/* Author & Metadata Skeleton */}
                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Author Avatar Skeleton */}
                                <Skeleton className="h-8 w-8 rounded-full bg-gray-400/50 dark:bg-gray-600/50" />

                                {/* Author Name Skeleton */}
                                <Skeleton className="h-4 w-20 rounded-lg bg-gray-300/50 dark:bg-gray-700/50" />
                            </div>

                            {/* Date Skeleton */}
                            <Skeleton className="h-4 w-24 rounded-lg bg-gray-300/50 dark:bg-gray-700/50" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
