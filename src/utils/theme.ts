import {createTheme} from "@mui/material/styles";
import {teal} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: {
            main: "#10776b",
        },
        background: {
            default: "#f0f8ff",
        },
        text: {
            primary: "#0C0C0C",
            secondary: "#10776b",
        },
    },

    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {fontSize: "18px", color: teal[900]},
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
                }),
                icon: {
                    color: teal[500],
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: ({theme}) => ({
                    border: "2px solid #009879",
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: theme.palette.background.default,
                    boxShadow: "10px 7px 10px #20a78c",
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                        boxShadow: "0px 0px 10px #20a78c",
                    },
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    width: "100%",

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: teal[500],
                        borderWidth: "3px",
                        transition: "border-color 0.5s, box-shadow 0.5s",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: teal[700],
                        boxShadow: `0 0 10px ${teal[500]}`,
                        borderWidth: "3px",
                        transition: "border-color 0.5s, box-shadow 0.5s",
                        transform: "translateY(-2px)",
                    },
                },
                notchedOutline: {
                    borderColor: teal[300],
                    borderWidth: "2px",
                },
                input: {
                    color: teal[900],
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    padding: "10px",
                    "&:hover": {
                        backgroundColor: teal[200],
                    },
                    "&:selected": {
                        backgroundColor: teal[300],
                    },
                },
            },
        },
    },
});

export {theme};
