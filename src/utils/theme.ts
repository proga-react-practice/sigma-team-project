import {PaletteMode} from "@mui/material";
import { grey, purple, teal} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

const darkCardColor = '#452c63';
const lightCardColor = '#18453B';

const logoLightColorBackground = 'radial-gradient(circle at 7.1% 15.6%, rgb(22, 160, 133) 0%, rgb(64, 240, 206) 100.3%)';
const logoDarkColorBackground = 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)';


declare module "@mui/material/styles" {
    interface Palette {
      custom: {
        cardBackground: string;
        quotesColor: string;
        logoLightColorBackground: string;
        logoDarkColorBackground: string;
      };
    }
  
    interface PaletteOptions {
      custom?: {
        cardBackground?: string;
        quotesColor: string;
        logoLightColorBackground: string;
        logoDarkColorBackground: string;
      };
    }
  }

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  primary: teal,
                  divider: teal[200],
                  background: {
                    default: teal[100],
                    paper: teal[100],
                },
                  text: {
                      primary: teal[900],
                      secondary: grey[500],
                  },
                  custom: {
                    cardBackground: lightCardColor,
                    quotesColor: 'teal',
                    logoBackground: logoLightColorBackground
                  },
              }
            : {
                  primary: purple,
                  divider: purple[700],
                  background: {
                      default: purple[900],
                      paper: purple[900],
                  },
                  text: {
                      primary: purple[200],
                      secondary: grey[500],
                  },
                  custom: {
                    cardBackground: darkCardColor,
                    quotesColor: purple[200],
                    logoBackground: logoDarkColorBackground
                  },
              }),
    },
});
const theme = createTheme({
    spacing: 5,
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: ({theme}) => ({
                    color: theme.palette.primary.main,
                }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: ({theme}) => ({
                    width: "100%",
                    backgroundColor: theme.palette.background.default,
                }),
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: ({theme}) => ({
                    width: "100%",
                    backgroundColor: theme.palette.background.default,
                    icon: {
                        color: theme.palette.primary.main,
                    },
                }),
            },
        },
        MuiCard: {
            styleOverrides: {
                root: ({theme}) => ({
                    border: `2px solid${theme.palette.primary.main}`,
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: theme.palette.background.default,
                    boxShadow: `10px 7px 10px ${theme.palette.primary.main}`,
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                        boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
                    },
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({theme}) => ({
                    width: "100%",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.main,
                        borderWidth: "3px",
                        transition: "border-color 0.5s, box-shadow 0.5s",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.main,

                        borderWidth: "3px",
                        transition: "border-color 0.5s, box-shadow 0.5s",
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.main,
                        borderWidth: "2px",
                    },
                }),
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: ({theme}) => ({
                    padding: "10px",
                    "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                    },
                }),
            },
        },
    },
});

export {theme};
