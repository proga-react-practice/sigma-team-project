import React from 'react';
import { Box } from '@mui/material';
import { theme } from '../../utils/theme';

const CustomLoader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
        marginTop: theme.spacing(40)
      }}
    >
      <video autoPlay loop muted style={{ width: '100%', height: '100%' }}>
        <source src="src\assets\preloader.webm" type="video/mp4" />
      </video>
    </Box>
  );
};

export default CustomLoader;
