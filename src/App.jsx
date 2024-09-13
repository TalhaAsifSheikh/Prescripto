import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import MyAppointment from './pages/MyAppointment'
import MyProfile from './pages/MyProfile'
import Login from './pages/Login'
import About from './pages/About'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


export default function 
() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/my-appointments' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      <Footer />

    </div>
  )
}
