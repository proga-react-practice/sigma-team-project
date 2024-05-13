import { createTheme } from "@mui/material";
import { teal } from "@mui/material/colors";

const color = teal[500];

declare module "@mui/material/styles" {
  interface TypeBackground {
    gradient?: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F3F8FF",
    },
    secondary: {
      main: "#000",
      light: "#333",
    },
  background: {
    gradient: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  },
},
  spacing: 5,
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "8px",
          fontSize: "12px",
          marginTop: "20px",
          height: "26px",
          width: "100px",
          mb: "20px",
          color: "#000",
          border: "1px solid",
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            color: "#fff",
            backgroundColor: color,
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginBottom: "30px",
          width: "270px",
          height: "25px",
          borderRadius: "5px",
          marginLeft: "10px",
          marginRight: "10px",
          "@media screen and (max-width: 426px)": {
            width: "160px",
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: theme.palette.secondary.main,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: theme.palette.secondary.main,
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: theme.palette.secondary.main,
          },
        }),
      },
    },
  },
});
