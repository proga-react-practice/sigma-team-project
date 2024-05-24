import * as React from "react";
import {createContext, useContext, useMemo, useState, ReactNode} from "react";
import {PaletteMode, ThemeProvider, createTheme} from "@mui/material";
import {getDesignTokens} from "../utils/theme";
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

export const ColorModeProvider: React.FC<{children: ReactNode}> = ({
    children,
}) => {
    const [mode, setMode] = useState<PaletteMode>("light");

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
