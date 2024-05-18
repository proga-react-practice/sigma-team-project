import * as React from "react";
import {createContext, useContext, useMemo, useState, ReactNode} from "react";
import {ThemeProvider, createTheme, PaletteMode} from "@mui/material";
import {purple, teal, grey} from "@mui/material/colors";
import {theme as baseTheme} from "../utils/theme";

interface ColorModeContextType {
    toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(
    undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useColorMode = () => {
    const context = useContext(ColorModeContext);
    if (!context) {
        throw new Error("useColorMode must be used within a ColorModeProvider");
    }
    return context;
};

const getDesignTokens = (mode: PaletteMode) => ({
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

export const ColorModeProvider: React.FC<{children: ReactNode}> = ({
    children,
}) => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = useMemo(
        () => createTheme({...baseTheme, ...getDesignTokens(mode)}),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};
