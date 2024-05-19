import {PaletteMode} from "@mui/material";
import {grey, purple, teal} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";
export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  primary: teal,
                  divider: teal[200],
                  text: {
                      primary: "#000",
                      secondary: grey[500],
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
                      primary: "#fff",
                      secondary: grey[500],
                  },
              }),
    },
});
const theme = createTheme({
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
