import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa"

const page = () => {
    return (
        <div className='min-h-screen w-full flex flex-col p-5'>
            <div className='flex items-center px-5 justify-between'>
                {/* button  */}
                <div className="flex w-full items-center justify-start">
                    <Link href="/">
                        <Button variant="outline" className="border-gray-300/50 hover:border-gray-300/80">
                            <FaLongArrowAltLeft className="text-gray-700 dark:text-gray-300" />
                        </Button>
                    </Link>
                </div>
                <ul className='flex items-center gap-5'>
                    <li className='hover:underline cursor-pointer font-medium capitalize'>First</li>
                    <li className='hover:underline cursor-pointer font-medium capitalize'>Second</li>
                    <li className='hover:underline cursor-pointer font-medium capitalize'>third</li>
                </ul>
            </div>
            <div>
                <h1 className='font-bold text-xl text-center'>
                    Tutorial Page that are available.
                </h1>
            </div>
        </div>
    )
}

export default page
