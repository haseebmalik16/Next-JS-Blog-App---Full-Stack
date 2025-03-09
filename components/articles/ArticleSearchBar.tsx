'use client'
import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { searchAction } from '@/actions/search'
import { useSearchParams } from 'next/navigation'

const ArticleSearchBar = () => {

  const searchParams = useSearchParams();

  return (
    <form action={searchAction} className='mx-auto max-w-2xl'>
      <div className='relative border border-gray-600 rounded-md'>
        <Search className='w-5 h-5 text-gray-900 absolute left-3 top-1/2 -translate-y-1/2' />
        <Input
          type='text'
          name='search'
          defaultValue={searchParams.get("search") || ""}
          placeholder='Search articles...'
          className='w-full pl-10 pr-4 text-lg dark:text-white placeholder:text-gray-900'
        />
      </div>
    </form>
  )
}

export default ArticleSearchBar
