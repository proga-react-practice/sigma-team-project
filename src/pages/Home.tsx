import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, CardMedia } from '@mui/material';
import sigmaLogo from '../assets/sigma-team-logo-black.png';

const HomePage = () => {
  return (
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to sigma team website
      </Typography>
      <Box sx={{ maxWidth: 300, margin: '0 auto' }}>
        <CardMedia
          component="img"
          image={sigmaLogo}
          alt="Sigma Team Logo"
        />
      </Box>
        <Typography  paragraph>
        This is the main page. Enjoy using our website.
        </Typography>
        <Button component={Link} to="/stadium" variant="contained" color="primary" sx={{ mr: 1 }}>
         Move to stadium form page
        </Button>
        <Button component={Link} to="/match" variant="contained" color="secondary">
            Move to match form page
        </Button>
    </Container>
  );
};

export default HomePage;
