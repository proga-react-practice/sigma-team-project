import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {StadiumCardProvider} from "./components/Stadium/StadiumCardContext.tsx";
import {ColorModeProvider} from "./components/ColorModeContext.tsx";
import {CssBaseline} from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ColorModeProvider>
        <CssBaseline />
        <StadiumCardProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </StadiumCardProvider>
    </ColorModeProvider>
);
