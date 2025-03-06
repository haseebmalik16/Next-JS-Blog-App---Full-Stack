import AllArticlePage from '@/components/articles/AllArticlePage'
import ArticleSearchBar from '@/components/articles/ArticleSearchBar'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
    return (
        <div className='min-h-screen bg-background'>
            <main className='container mx-auto px-4 py-12 sm:px-6 lg:text-5xl'>
{/* page header  */}
<div className='mb-12 space-y-6 text-center'>
    <h1 className='text-4xl font-bold sm:text-5xl'>All Articles </h1>

    {/* search bar  */}
    <ArticleSearchBar/>
</div>

{/* all articles card  */}
<AllArticlePage/>


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
