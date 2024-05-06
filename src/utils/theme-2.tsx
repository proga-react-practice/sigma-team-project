import { createTheme } from "@mui/material";


export const theme = createTheme({
  palette: {
    primary: {
      main: "#F3F8FF",
    },
    secondary: {
      main: "#000",
      light: "#333",
    },
  },
  spacing: 5,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
              borderRadius: '8px',
              fontSize: '12px',
              marginTop: '5px',
              marginBottom: '5px',
              height: '26px',
              width: '100px',
              mb: '20px',
              color: "#000",
              border: '1px solid',
              "&:hover": {
                color: "#fff",
                backgroundColor: "#000",
              },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
          root: ({ theme }) => ({
            marginBottom: '30px',
            width: '270px',
            height: '25px',
            borderRadius: '5px',
            marginLeft: '10px',
            marginRight: '10px',
            "@media screen and (max-width: 426px)": {
              width: '160px'
            },
            '& .MuiInput-underline:before': {
              borderBottomColor: theme.palette.secondary.main,
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: theme.palette.secondary.main,
            },
            '& .MuiInput-underline:hover:before': {
              borderBottomColor: theme.palette.secondary.main,
            },
          }),
          
      },
  },
  },
  });

  