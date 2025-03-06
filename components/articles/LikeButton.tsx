import React from 'react'
import { Button } from '../ui/button'
import { Bookmark,Share2, ThumbsUp } from 'lucide-react'

const LikeButton = () => {
  return (
    <div className='flex gap-4 mb-12 border-t pt-8'>
      <form action="">
        <Button type='button' variant={'ghost'} className='gap-2'>
            <ThumbsUp className='h-5 w-5' />
            0
        </Button>
        <Button variant={'ghost'} className='gap-2'>
            <Bookmark className='h-5 w-5'/>
        </Button>
        <Button variant={'ghost'} className='gap-2'>
            <Share2 className='h-5 w-5'/>
        </Button>
      </form>
    </div>
  )
}

export default LikeButton
