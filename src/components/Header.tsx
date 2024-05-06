import { AppBar, Box, Button, ThemeProvider } from "@mui/material";
import React from "react";
import { theme } from "../utils/theme-2";
import ProgressBar from "./Match/ProgressBar";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const Header: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        flexGrow: 1,
      }}>
        <AppBar
          position="static"
          sx={{
            "@media screen and (max-width: 426px)": {
              width: "100%",
            },
          }}
        >
          <ProgressBar />
          <Button component={Link} to="/" color="inherit" 
          sx={{
            width: '50px',
            height: '50px'
          }}>
              <HomeIcon />
          </Button>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;