import React, { useContext, useState } from 'react'
import './Image.css';

import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Lens from './ui/Lens';

import AppContext from '../contexts/AppContext.js';
import { formatDate } from '../utils/index.js';
import { axiosInstance } from '../lib/axios';

import ImageListItem from '@mui/material/ImageListItem';

const Image = ({ image }) => {

    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const { images, setImages } = useContext(AppContext);

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    const handleDeleteImage = async (id) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post(`/api/images/delete-image/${id}`);
            if (data.success) {
                toast.success('Image deleted successfully!');
                setImages(images.filter((img) => img.id !== id));
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
        <ImageListItem
            key={image.id}
            onContextMenu={handleContextMenu}
            className='relative w-full group border-2 border-zinc-300 rounded-t-xl overflow-hidden'
        >
            <Lens
                zoomFactor={1.7}
                lensSize={150}
            >
                <img
                    src={image.img_url}
                    loading="lazy"
                    draggable="false"
                    className="w-full h-auto duration-300 group-hover:scale-105"
                />

                {localStorage.getItem('admin') === import.meta.env.VITE_ADMIN && location.pathname === '/secure-admin/dashboard' &&
                    <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="cursor-pointer absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs md:text-sm hover:bg-red-500 transition"
                    >
                        {loading ? <Loader className='w-3' /> : 'Delete'}
                    </button>
                }

                <div className="absolute bottom-0 text-center right-0 left-0 text-xs md:text-sm text-gray-100 bg-white/50 px-2 py-1">
                    {formatDate(image.date)} &nbsp; | &nbsp; Krishna Jhanwar &copy; 2025
                </div>
            </Lens>
        </ImageListItem>
    )
}

export default Image
