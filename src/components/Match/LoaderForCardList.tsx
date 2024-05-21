import React from 'react';
import { Box } from '@mui/material';
import { theme } from '../../utils/theme';

const LoaderForCardList: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: theme.spacing(50),
        position: 'absolute'
      }}
    >
      <img src="src\assets\loaderCardlist.gif" alt="Loading..." 
      style={{
      }} />
    </Box>
  );
};

export default LoaderForCardList;
