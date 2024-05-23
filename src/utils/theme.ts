import {PaletteMode} from "@mui/material";
import {purple, teal} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

const darkCardColor = "#452c63";
const lightCardColor = "#18453B";
const darkContrastText = '#00221c'

declare module "@mui/material/styles" {
    interface Palette {
        custom: {
            cardBackground: string;
            darkContrastText: string;
        };
    }

    interface PaletteOptions {
        custom?: {
            cardBackground?: string;
            darkContrastText?: string;
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
                  text: {
                      primary: teal[900],
                      secondary: teal[200],
                  },
                  custom: {
                      cardBackground: lightCardColor,
                      darkContrastText: darkContrastText
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
                      primary: purple[50],
                      secondary: purple[50],
                  },
                  custom: {
                      cardBackground: darkCardColor,
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
                    color: theme.palette.text.primary,
                    "&.Mui-focused": {
                        color: theme.palette.text.primary,
                    },
                }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: ({theme}) => ({
                    width: "100%",

                    "& input:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
                        WebkitTextFillColor: theme.palette.text.primary,
                        caretColor: theme.palette.text.primary,
                    },
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
                    "& input:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
                        WebkitTextFillColor: theme.palette.text.primary,
                        caretColor: theme.palette.text.primary,
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
