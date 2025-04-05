import React, { useContext, useState } from 'react'
import Gallery from './Gallery.jsx';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import Loader from '../components/Loader.jsx';

import AppContext from '../contexts/AppContext.js';
import { axiosInstance } from '../lib/axios.js';
import { GridPattern } from '../components/ui/GridPattern.jsx';
import { cn } from '../lib/utils.js';

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { images, setImages } = useContext(AppContext);
  const [imgUrl, setImgUrl] = useState('');
  const [preview, setPreview] = useState(null);

  const handleLogout = async () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    navigate('/secure-admin/login-access');
  };

  const checkImageUrl = async (url) => {
    try {
      const response = await axios.head(url);
      const contentType = response.headers['content-type'];
      return contentType && contentType.startsWith('image/');
    } catch {
      return false;
    }
  };

  const handleUrlChange = async (e) => {
    const url = e.target.value;
    setImgUrl(url);
    if (url) {
      const isValidImage = await checkImageUrl(url);
      if (isValidImage) {
        setPreview(url);
      } else {
        setPreview(null);
        toast.error('Invalid image URL!');
      }
    } else {
      setPreview(null);
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!preview) {
      toast.error('Please provide a valid image URL!');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Session expired! Please login again.');
        return navigate('/secure-admin/login-access');
      }

      const { data } = await axiosInstance.post('/api/images/add-image', { img_url: imgUrl }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setImages([data.image, ...images]);
        setPreview(null);
        setImgUrl('');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='pt-20 relative'>
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
      <div className='flex justify-end p-4'>
        <button className="bg-zinc-600 z-10 text-white cursor-pointer px-4 py-2 rounded hover:bg-zinc-400 transition duration-200" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <section className="min-h-[63vh] p-10 text-zinc-300 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-6 z-10">Admin Dashboard</h2>

        <form onSubmit={handleFormSubmit} className="flex z-10 flex-col justify-center items-center gap-6 border border-zinc-300 p-6 rounded-lg max-w-[50vw] w-full bg-[#39393984] shadow-lg mb-[-5em]">

          <div className="flex flex-col items-center justify-center gap-5 w-full">
            <div className='flex justify-center items-center gap-5 w-full'>
              <label htmlFor="img_url" className="text-zinc-300 mb-2 text-lg font-semibold">Image URL:</label>

              <input
                type="text"
                id="img_url"
                value={imgUrl}
                onChange={handleUrlChange}
                className="p-2 rounded-lg w-[50%] bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-zinc-400 transition duration-200"
                placeholder="Paste image URL here..."
              />
            </div>

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-48 object-cover rounded-lg border border-zinc-300 shadow-lg"
                />
              </div>
            )}
          </div>

          <button disabled={loading} className='bg-zinc-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-neutral-400 transition duration-200'>
            {loading ? <Loader className='w-4' /> : 'Upload'}
          </button>

        </form>

        <Gallery />
      </section>
    </main>
  );
};

export default AdminDashboard;
