import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { theme } from '../../utils/theme-2'

const ProgressBar: React.FC = () => {
    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setProgressWidth(progress);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


  return (
    <Box sx={{
        width: '100%',
        height: theme.spacing(2),
        backgroundColor: 'primary.main',
        position: 'fixed',
        l: '0',
        r: '0',
        zIndex:999,
        bottom: '0'
    }}>
        <Box sx={{
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898',
            backgroundBlendMode: 'multiply,multiply',
            width: `${progressWidth}%`,
        }}>
        </Box>
    </Box>
  )
}

export default ProgressBar