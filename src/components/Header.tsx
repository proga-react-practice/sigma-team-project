import { AppBar, Box, Toolbar, ThemeProvider } from "@mui/material";
import React from "react";
import { theme } from "../utils/theme-2";
import ProgressBar from "./Match/ProgressBar";

const Header: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            "@media screen and (max-width: 426px)": {
              width: "100%",
            },
          }}
        >
          <ProgressBar />
          <Toolbar></Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
