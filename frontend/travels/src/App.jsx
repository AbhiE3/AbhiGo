import React, { useState } from 'react'
import RegisterForm from './deepcomponents/RegisterForm'
import { Routes, Route, useNavigate,Link } from 'react-router-dom'
import LoginForm from './deepcomponents/LoginForm'
import BusList from './deepcomponents/BusList'
import BusSeats from './deepcomponents/BusSeats'
import UserBookings from './deepcomponents/UserBooking'
import "@fontsource/playwrite-hu";        

import "@fontsource/saira/400.css";
import "@fontsource/saira/600.css";

import './App.css'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const [selectedBusId, setSelectedBusId] = useState(null) //Newly added state

  const handleLogin = (token, userId)=>{
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    setToken(token)
    setUserId(userId)
  }
const handleLogout = ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  setToken(null)
  setUserId(null)
  setSelectedBusId(null)
}

const logout = () => {
  handleLogout();
  navigate("/login");
};
const LogoutIcon = () => (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-7 w-7"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
  />
</svg>
);
const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-900 flex flex-col">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 bg-transparent" style={{ fontFamily: "'Playwrite HU', sans-serif" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 text-white">
            <Link to="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="currentColor"
                viewBox="0 0 125 125"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M110.8,103.6h-7.6V114c0,3.6-2.9,6.5-6.5,6.5h-9c-3.6,0-6.5-2.9-6.5-6.5v-10.3H41.5V114c0,3.6-2.9,6.5-6.5,6.5 h-9c-3.6,0-6.5-2.9-6.5-6.5v-10.3H12v-82c0-7.6,4.4-13.1,13.3-16.5c17.6-6.9,54.6-6.9,72.3,0c8.9,3.4,13.3,8.9,13.3,16.5V103.6 L110.8,103.6L110.8,103.6z M118.6,40.4h-3.8V62h3.8c2.4,0,4.3-1.9,4.3-4.3V44.7C122.9,42.3,121,40.4,118.6,40.4L118.6,40.4z M4.3,40.4h3.8V62H4.3C1.9,62,0,60.1,0,57.7V44.7C0,42.3,1.9,40.4,4.3,40.4L4.3,40.4z M46.4,8.6h30.1c0.9,0,1.6,0.7,1.6,1.6v5.2 c0,0.9-0.7,1.6-1.6,1.6H46.4c-0.9,0-1.6-0.7-1.6-1.6v-5.2C44.8,9.3,45.5,8.6,46.4,8.6L46.4,8.6z M22.9,23.2h76.7 c1,0,1.9,0.9,1.9,1.9v42.8c0,1-0.9,1.9-1.9,1.9H22.9c-1,0-1.9-0.9-1.9-1.9V25.1C21,24.1,21.8,23.2,22.9,23.2L22.9,23.2L22.9,23.2 L22.9,23.2z M98.6,84.9c0-1.9-0.7-3.6-2-4.9c-1.3-1.3-3-2-4.9-2c-1.9,0-3.5,0.7-4.9,2c-1.4,1.3-2,3-2,4.9c0,1.9,0.7,3.5,2,4.8 c1.4,1.3,3,2,4.9,2c1.9,0,3.6-0.7,4.9-2C98,88.4,98.6,86.8,98.6,84.9L98.6,84.9L98.6,84.9L98.6,84.9z M38.1,84.9 c0-1.9-0.7-3.6-2-4.9c-1.3-1.3-3-2-4.9-2c-1.9,0-3.6,0.7-4.9,2c-1.3,1.3-2,3-2,4.9c0,1.9,0.6,3.5,2,4.8c1.3,1.3,3,2,4.9,2 c2,0,3.6-0.7,4.9-2C37.4,88.4,38.1,86.8,38.1,84.9L38.1,84.9L38.1,84.9L38.1,84.9z"
                />
              </svg>
              <span className="text-xl font-bold text-white">AbhiGo</span>
            </Link>
            <div className="flex items-center space-x-6">
              {token ? (
                <>
                  <Link
                    to="/my-bookings"
                    className="px-5 py-2 text-md font-semibold text-white"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-full text-white hover:bg-transparent hover:bg-opacity-20 transition-colors"
                    aria-label="Logout"
                  >
                    <LogoutIcon />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 font-semibold text-blue-600"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 font-semibold text-blue-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          <hr color='white' />
        </div>
      </nav>

      
    <Routes>
        <Route path='/' element={<BusList onSelectBus={(id)=>setSelectedBusId(id)} token={token}/>} />
        <Route path='/register' element={<RegisterForm />}/>
        <Route path='/login' element={<LoginForm onLogin={handleLogin}/>}/>
        <Route path='/bus/:busId' element={<BusSeats token={token}/>} />
        <Route path='/my-bookings' element={<UserBookings token={token} userId={userId} />} />

      </Routes>

      {/* Footer */}
      <footer className="bg-teal-900" style={{ fontFamily: "'Playwrite HU', sans-serif" }}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-100 text-sm">
            &copy; {new Date().getFullYear()} AbhiGo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
