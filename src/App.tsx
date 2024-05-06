import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ThemeProvider } from "@emotion/react";
import { mainTheme } from "./utils/theme-main";

function App() {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
