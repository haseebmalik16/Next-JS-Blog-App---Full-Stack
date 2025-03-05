import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <section className='relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-950 to-indigo-900'>
            {/* Gradient Overlay */}
            <div className='absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[600px] before:w-[600px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/30 before:to-indigo-600/30 before:blur-3xl'></div>

            <div className='container relative mx-auto flex h-full flex-col items-center justify-center px-6 py-24 md:flex-row md:py-32'>
                {/* Text Section */}
                <div className='flex-1 space-y-8 text-center md:text-left'>
                    <h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl'>
                        Explore the World Through
                        <span className='bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent'> Words</span>
                    </h1>
                    <p className='max-w-2xl mx-auto text-lg text-gray-300 md:text-xl'>
                        Discover insightful articles, thought-provoking stories, and expert perspectives on technology, lifestyle, and innovation.
                    </p>

                    <div className='flex flex-col items-center gap-4 sm:flex-row md:justify-start'>
                        <Button className='rounded-full px-6 py-3 text-lg'>Start Reading</Button>
                        <Button className='rounded-full px-6 py-3 text-lg' variant='outline'>Explore Topics</Button>
                    </div>

                    {/* Stats */}
                    <div className='grid grid-cols-3 gap-6 pt-8 text-white md:max-w-md'>
                        {[
                            { value: '1k+', label: 'Published articles' },
                            { value: '50+', label: 'Expert writers' },
                            { value: '10M', label: 'Monthly Readers' }
                        ].map((stat, index) => (
                            <div key={index} className='text-center'>
                                <div className='text-3xl font-bold'>{stat.value}</div>
                                <div className='text-sm text-gray-400'>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Section */}
                <div className='mt-12 flex-1 md:mt-0 md:flex md:justify-end'>
                    <div className={cn(
                        'relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden',
                        'bg-gradient-to-br from-white/10 to-transparent border border-primary/20 backdrop-blur-lg',
                        'shadow-xl shadow-indigo-500/20'
                    )}>
                        <Image
                            src='https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            fill
                            alt='hero_image'
                            className='object-cover'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
