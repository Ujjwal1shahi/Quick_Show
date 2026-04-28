import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Movies from './pages/Movies'
import Home from './pages/Home'
import Favourite from './pages/Favourite'
import MovieDetails from './pages/MovieDetails'
import MyBookings from './pages/MyBookings'
import SeatLayout from './pages/SeatLayout'
import {Toaster} from 'react-hot-toast'

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster/>
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:id' element={<MovieDetails/>} />
        <Route path='/movies/:id/:date' element={<SeatLayout/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        <Route path='/favourite' element={<Favourite/>} />
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  )
}

export default App
