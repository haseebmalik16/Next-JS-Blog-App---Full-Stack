import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const AllArticlePage = () => {
  return (
    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      <Card className='group relative overflow-hidden translate-all hover:shadow-lg'>
        <div className='p-6'>
            <div className='relative mb-4 h-48 w-full overflow-hidden rounded-xl'>
                <Image src={'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D'} alt='blog_image' fill className='object-cover' />
            </div>
            {/* article content  */}
            <h3 className='text-xl font-semibold'>title</h3>
            <p className='mt-2'>web-developement</p>

            <div className='mt-6 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <Avatar>
                        <AvatarImage src='' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <span className='text-sm'>
                        haseeb-mernstack
                    </span>
                </div>
                <div className='text-sm'>12 feb</div>
            </div>
        </div>
      </Card>
    </div>
  )
}

export default AllArticlePage
