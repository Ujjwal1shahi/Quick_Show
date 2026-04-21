import React, { useEffect, useRef, useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef(null)

  const loopTrailers = [...dummyTrailers, ...dummyTrailers]

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const interval = setInterval(() => {
      if (isPaused) return

      container.scrollLeft += 1

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0
      }
    }, 20)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>
        Trailers
      </p>

      <div className='relative mt-6 max-w-[960px] mx-auto'>
        <BlurCircle top='-100px' right='-100px' />
        <ReactPlayer
          src={currentTrailer.videoUrl}
          playing
          muted
          controls={false}
          width='100%'
          height='540px'
          className='mx-auto max-w-full'
        />
      </div>

      <div
        ref={scrollRef}
        className='mt-8 overflow-x-auto scrollbar-hide'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className='flex gap-4 md:gap-6 w-max group'>
          {loopTrailers.map((trailer, index) => (
            <div
              key={`${trailer.image}-${index}`}
              onClick={() => setCurrentTrailer(trailer)}
              className='
                relative cursor-pointer overflow-hidden rounded-lg
                w-40 md:w-48 flex-shrink-0
                transition duration-300
                group-hover:opacity-50 hover:!opacity-100
              '
            >
              <img
                src={trailer.image}
                alt='trailer'
                className='w-full h-24 md:h-28 object-cover brightness-75'
              />

              <PlayCircleIcon
                strokeWidth={1.6}
                className='absolute top-1/2 left-1/2 w-8 h-8 text-white -translate-x-1/2 -translate-y-1/2'
              />

              {currentTrailer.videoUrl === trailer.videoUrl && (
                <div
                  className='
    absolute bottom-0 left-0 w-full h-[2.5px] rounded-full
    bg-gradient-to-r from-transparent via-rose-600 to-transparent
    shadow-[0_0_10px_rgba(236,72,153,0.7)]
  '
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrailerSection
