import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'
import {
  CalendarDays,
  Clock,
  Armchair,
  Ticket,
  CreditCard,
  Clapperboard,
  Star,
  Languages,
  Calendar
} from 'lucide-react'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getMyBookings()
  }, [])

  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-32 xl:px-40 pt-32 md:pt-40 pb-20 min-h-[80vh] overflow-hidden'>
      <BlurCircle top='90px' left='80px' />
      <BlurCircle bottom='100px' right='400px' />
      <BlurCircle top='600px' left='400px' />

      <div className='relative z-10'>
        <div className='mb-7'>
          <p className='text-primary text-sm font-medium mb-2'>Your Tickets</p>
          <h1 className='text-2xl md:text-3xl font-semibold text-white'>
            My Bookings
          </h1>
          <p className='text-gray-400 text-sm mt-2'>
            View all your booked movie tickets in one place.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className='max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center'>
            <Ticket className='mx-auto mb-4 text-primary' size={38} />
            <h2 className='text-xl font-semibold'>No bookings found</h2>
            <p className='text-gray-400 text-sm mt-2'>
              Your booked tickets will appear here.
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-5'>
            {bookings.map((item, index) => {
              const movie = item.show.movie

              const genres =
                movie.genres?.map((genre) => genre.name).join(', ') ||
                movie.genre_ids?.join(', ') ||
                'Action, Adventure'

              return (
                <div
                  key={index}
                  className='group relative max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_0_25px_rgba(255,0,80,0.08)] transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.06] hover:shadow-[0_0_35px_rgba(255,0,80,0.15)]'
                >
                  <div className='absolute left-0 top-0 h-full w-1 bg-primary opacity-80'></div>

                  <div className='flex flex-col md:flex-row'>
                    <div className='relative md:w-52 w-full shrink-0'>
                      <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className='h-48 md:h-full w-full object-cover object-bottom'
                      />

                      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/40'></div>
                    </div>

                    <div className='flex flex-1 flex-col justify-between p-4 md:p-5 min-h-[250px]'>
                      <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4'>
                        <div className='max-w-xl'>
                          <h2 className='text-lg md:text-xl font-semibold text-white leading-tight group-hover:text-primary transition-colors'>
                            {movie.title}
                          </h2>

                          <div className='mt-2 flex items-start gap-2 text-xs text-gray-400'>
                            <Clapperboard size={14} className='text-primary mt-0.5 shrink-0' />
                            <span className='line-clamp-1'>{genres}</span>
                          </div>

                          <div className='mt-3 flex flex-wrap gap-2 text-xs text-gray-300'>
                            <div className='flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-3 py-1.5'>
                              <Clock size={14} className='text-primary' />
                              <span>{timeFormat(movie.runtime)}</span>
                            </div>

                            <div className='flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-3 py-1.5'>
                              <CalendarDays size={14} className='text-primary' />
                              <span>{dateFormat(item.show.showDateTime)}</span>
                            </div>
                          </div>
                        </div>

                        <div className='lg:text-right shrink-0'>
                          <p className='text-gray-400 text-xs mb-1'>Total Amount</p>
                          <p className='text-xl md:text-2xl font-bold text-white'>
                            {currency}{item.amount}
                          </p>

                          {!item.isPaid ? (
                            <button className='mt-2 inline-flex items-center gap-2 bg-primary hover:opacity-85 px-4 py-1.5 text-xs rounded-full font-medium cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(255,0,80,0.35)]'>
                              <CreditCard size={14} />
                              Pay Now
                            </button>
                          ) : (
                            <span className='mt-2 inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400'>
                              Paid
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='my-4 grid grid-cols-1 sm:grid-cols-3 gap-2'>
                        <div className='rounded-xl bg-black/20 border border-white/10 px-3 py-2'>
                          <div className='flex items-center gap-2 text-primary text-xs mb-1'>
                            <Star size={13} />
                            <span>Rating</span>
                          </div>
                          <p className='text-white text-sm font-semibold'>
                            {movie.vote_average ? movie.vote_average.toFixed(1) : '8.5'} / 10
                          </p>
                        </div>

                        <div className='rounded-xl bg-black/20 border border-white/10 px-3 py-2'>
                          <div className='flex items-center gap-2 text-primary text-xs mb-1'>
                            <Languages size={13} />
                            <span>Language</span>
                          </div>
                          <p className='text-white text-sm font-semibold uppercase'>
                            {movie.original_language || 'EN'}
                          </p>
                        </div>

                        <div className='rounded-xl bg-black/20 border border-white/10 px-3 py-2'>
                          <div className='flex items-center gap-2 text-primary text-xs mb-1'>
                            <Calendar size={13} />
                            <span>Release</span>
                          </div>
                          <p className='text-white text-sm font-semibold'>
                            {movie.release_date
                              ? new Date(movie.release_date).getFullYear()
                              : '2025'}
                          </p>
                        </div>
                      </div>

                      {movie.overview && (
                        <p className='mb-4 text-xs text-gray-400 leading-relaxed line-clamp-1 max-w-2xl'>
                          {movie.overview}
                        </p>
                      )}

                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-white/10 pt-4 text-xs'>
                        <div className='flex items-center justify-between rounded-xl bg-black/20 border border-white/10 px-3 py-2.5'>
                          <div className='flex items-center gap-2 text-gray-300'>
                            <Ticket size={14} className='text-primary' />
                            <span>Total Tickets</span>
                          </div>
                          <span className='font-semibold text-white'>
                            {item.bookedSeats.length}
                          </span>
                        </div>

                        <div className='flex items-center justify-between rounded-xl bg-black/20 border border-white/10 px-3 py-2.5'>
                          <div className='flex items-center gap-2 text-gray-300'>
                            <Armchair size={14} className='text-primary' />
                            <span>Seats</span>
                          </div>
                          <span className='font-semibold text-white text-right'>
                            {item.bookedSeats.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='absolute -right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 rounded-full bg-[#09090B] md:block'></div>
                  <div className='absolute -left-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 rounded-full bg-[#09090B] md:block'></div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default MyBookings