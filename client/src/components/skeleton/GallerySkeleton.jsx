import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

export default function SkeletonColor() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      className="flex flex-col items-center justify-center w-full pt-10 pb-5"
      sx={{ bgcolor: '#121212' }}
    >
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={isSmallScreen ? 300 : 400}
        height={isSmallScreen ? 300 : 400}
      />
      <div className="flex items-center justify-between w-full mt-6 px-4">
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          variant="rectangular"
          width={isSmallScreen ? 200 : 290}
          height={20}
        />
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          variant="rectangular"
          width={isSmallScreen ? 50 : 70}
          height={20}
        />
      </div>
    </Box>
  );
}
