import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#222831",
    },
    secondary: {
      main: "#31363F",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => {
          const { palette } = theme;
          return {
            display: "inline-block",
            padding: "0.35em 1.2em",
            margin: "0 0.3em 0.3em 0",
            borderRadius: "0.12em",
            boxSizing: "border-box",
            textDecoration: "none",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 300,
            color: "#FFFFFF",
            textAlign: "center",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: palette.secondary.main,
            },
            "@media all and (max-width:30em)": {
              display: "block",
              margin: "0.4em auto",
            },
          };
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Barlow",
        },
      },
    },
  },
});
