import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { GridPattern } from '../components/ui/GridPattern';
import Loader from '../components/Loader';

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FiLock, FiUser } from 'react-icons/fi'

import { axiosInstance } from '../lib/axios.js';
import { cn } from '../lib/utils.js';

const AdminLogin = () => {

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(`/api/admin-login`, { username, password });
      if (data.success) {
        setPassword('');
        setUsername('');
        localStorage.setItem('admin', data.admin);
        localStorage.setItem('token', data.jwt);
        toast.success(data.message);
        navigate('/secure-admin/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(showPassword => !showPassword);
  };

  return (
    <section className='flex flex-col items-center justify-center min-h-[63vh] text-gray-200 gap-8 pt-60'>
      <GridPattern
        width={30}
        height={30}
        x={0}
        y={0}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(1700px_circle_at_center,white,red)]",
        )}
      />
      <h1 className='text-2xl'>Admin Login</h1>
      <form className='flex flex-col gap-4' onSubmit={handleLogin}>

        <div className='border bg-[#92929285] px-4 py-2 flex items-center gap-2 rounded-full focus-within:ring-1 focus-within:ring-zinc-300 transition duration-150'>
          <FiUser />
          <input onChange={e => setUsername(e.target.value)} type="text" placeholder='Username' id='name' value={username} required className='outline-none text-sm flex-1' />
        </div>

        <div className='border bg-[#92929285] px-4 py-2 flex items-center gap-2 rounded-full mt-4 focus-within:ring-1 focus-within:ring-zinc-300 transition duration-150'>
          <FiLock />
          <input onChange={e => setPassword(e.target.value)} type={`${!showPassword ? 'password' : 'text'}`} placeholder='Password' id='password' value={password} required className='flex-1 outline-none text-sm' />
          <div onClick={togglePasswordVisibility} className='cursor-pointer hover:scale-110'>
            {!showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </div>
        </div>

        <button disabled={loading} className={`bg-[#212020e5] z-10 w-full text-white py-2 mt-4 rounded-full cursor-pointer ${!loading ? 'hover:bg-zinc-500 hover:scale-105 transition-all duration-200' : 'bg-zinc-500'}`}>
          {!loading ? 'Login' : <Loader className='w-3' />}
        </button>

      </form>
      <p className='text-zinc-500'>
        If you're not the site admin, please avoid sending unnecessary requests. Thank you!
      </p>
    </section>
  )
}

export default AdminLogin