import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme";
import { StadiumCardProvider } from "./components/Stadium/StadiumCardContext.tsx";
import { FormProvider } from './components/Match/FormContext.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <FormProvider>
      <StadiumCardProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </StadiumCardProvider>
    </FormProvider>
  </ThemeProvider>
);
