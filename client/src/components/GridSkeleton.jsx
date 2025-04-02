import React from 'react'
import GallerySkeleton from './skeleton/GallerySkeleton';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';

const GridSkeleton = () => {
    return (
        <Box>
            <ImageList variant="masonry" cols={window.innerWidth < 768 ? 1 : 3} gap={10}>
                {
                    window.innerWidth < 768 ?
                    <GallerySkeleton />
                    :
                    [...Array(3)].map((_, index) => (
                        <GallerySkeleton key={index} />
                    ))
                }
            </ImageList>
        </Box>
    )
}

export default GridSkeleton