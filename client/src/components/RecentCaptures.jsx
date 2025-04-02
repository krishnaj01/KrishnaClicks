import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react'
import { Link } from 'react-router-dom';

import InteractiveHoverButton from './ui/HoverButton.jsx';
import { TypingAnimation } from './ui/TypingAnimation.jsx';
import { TextAnimate } from './ui/TextAnimate.jsx';
import Carousel from './ui/Carousel.jsx';
import Loader from '../components/Loader.jsx';

import { homeBackgroundImage } from '../assets/assets.js';
import { axiosInstance } from '../lib/axios.js';

const RecentCaptures = () => {
    const [latestImages, setLatestImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLatestImages = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get('/api/images/home-page-images');
            if (data.success) {
                setLatestImages(data.images);
            } else {
                console.error('Failed to fetch latest images:', data.message);
            }
        } catch (error) {
            console.error('Error fetching latest images:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLatestImages();
    }, []);
    return (
        <section
            className={`relative w-full min-h-screen ${latestImages.length > 0 ? '' : 'flex justify-center items-center'} pb-64 py-20 bg-cover bg-center bg-no-repeat`}
            style={{ backgroundImage: `url(${homeBackgroundImage})` }}
        >
            <motion.div
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='flex flex-col items-center justify-center'
            >
                <TypingAnimation className='font-bold text-xl md:text-4xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-7'>
                    Explore My Recent Captures
                </TypingAnimation>
                {loading ? <Loader /> : latestImages.length > 0 ? (
                    <div className="relative overflow-hidden w-full h-full pb-15">
                        <Carousel slides={latestImages} />
                    </div>
                ) : (
                    <TextAnimate animation="slideLeft" by="character" className={"text-[#ffffffa3] font-semibold text-lg text-center"}>
                        No images available. Come back later!
                    </TextAnimate>
                )}
                <Link to="/gallery" className='mt-5'>
                    <InteractiveHoverButton >
                        View Full Gallery
                    </InteractiveHoverButton>
                </Link>
            </motion.div>
        </section>
    )
}

export default RecentCaptures;