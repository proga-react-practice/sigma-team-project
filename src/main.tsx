import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { FormProvider } from './components/Match/FormContext.tsx'
import {StadiumCardProvider} from "./components/Stadium/StadiumCardContext.tsx";
import {ColorModeProvider} from "./components/ColorModeContext.tsx";
import {CssBaseline} from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ColorModeProvider>
        <CssBaseline />
        <FormProvider>
          <StadiumCardProvider>
              <React.StrictMode>
                  <App />
              </React.StrictMode>
          </StadiumCardProvider>
        </FormProvider>
    </ColorModeProvider>

