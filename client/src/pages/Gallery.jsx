import React, { useContext, useEffect, useState } from 'react'

import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from 'motion/react';

import ImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';

import { TextAnimate } from '../components/ui/TextAnimate.jsx';
import { GridPattern } from '../components/ui/GridPattern.jsx';
import SparklesText from '../components/ui/SparklesText.jsx';
import GridSkeleton from '../components/GridSkeleton.jsx';
import AuroraText from '../components/ui/AuroraText.jsx';
import Image from '../components/Image.jsx';

import AppContext from '../contexts/AppContext.js';
import { axiosInstance } from '../lib/axios.js';
import { assets } from '../assets/assets.js';
import { cn } from '../lib/utils.js';

const Gallery = () => {

    const { images, setImages } = useContext(AppContext);

    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const fetchMoreData = async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get(`/api/images/all-images?page=${page}&limit=6`);
            if (data.success && data.images.length > 0) {
                setImages([...images, ...data.images]);
                setPage(page + 1);
            }
            // If fewer than 6 images are returned, it means no more data
            if (data.images.length < 6) {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const { data } = await axiosInstance.get(`/api/images/all-images?page=1&limit=6`);
                if (data.success) {
                    setImages(data.images);
                    setPage(2);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchImages();
    }, []);

    return (
        <main className='flex items-center justify-center pt-24 pb-40'>
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
            <motion.section
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='mt-10 mb-20 mx-10 max-w-[90vw] z-10'
            >
                <h1
                    className="font-bold mb-10 text-xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    <AuroraText>Frames</AuroraText> in Focus
                </h1>
                {images.length > 0 ?
                    <Box>
                        <InfiniteScroll
                            dataLength={images.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<GridSkeleton />}
                            endMessage={
                                !loading && !hasMore && (
                                    <div className='text-lg md:text-5xl text-center text-transparent mt-12'>
                                        <SparklesText text="Thank You for Exploring!" className={"py-5"} />
                                    </div>
                                )
                            }
                        >
                            <ImageList variant="masonry" cols={window.innerWidth < 768 ? 1 : 3} gap={10}>
                                {images.map((item, index) => (
                                    <Image item={item} key={item.id - index} image={item} />
                                ))}
                            </ImageList>
                        </InfiniteScroll>
                    </Box>
                    :
                    <div className='flex flex-col items-center justify-center mt-[15vh]'>
                        <img src={assets.no_images} alt="" className='w-[30em]' />
                        <TextAnimate animation="slideLeft" by="character" className={"text-[#ffffffa3] font-semibold text-lg text-center mt-5 hidden md:block"}>
                            No images available. Come back later!
                        </TextAnimate>
                        <TextAnimate animation="slideLeft" by="character" className={"text-[#ffffffa3] font-semibold text-lg text-center mt-5 md:hidden"}>
                            No images available.
                        </TextAnimate>
                        <TextAnimate animation="slideLeft" by="character" className={"text-[#ffffffa3] font-semibold text-lg text-center md:hidden"}>
                            Come back later!
                        </TextAnimate>
                    </div>
                }
            </motion.section>
        </main >
    )
}

export default Gallery