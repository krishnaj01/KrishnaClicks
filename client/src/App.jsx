import React from 'react'

import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Footer from './components/Footer'
import Navbar from './components/Navbar'

import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import AdminLogin from './pages/AdminLogin'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Home from './pages/Home'

const App = () => {
  return (
    <main className="relative min-h-screen bg-black">
      <ToastContainer position='bottom-right' theme='dark' autoClose={3000} />
      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/about-me' element={<About />} />

        <Route path='/secure-admin/login-access' element={<AdminLogin />} />

        {localStorage.getItem('admin') === import.meta.env.VITE_ADMIN && <Route path='/secure-admin/dashboard' element={<AdminDashboard />} />}

        <Route path='*' element={<NotFoundPage />} />

      </Routes>

      <Footer />
    </main>
  )
}

export default App