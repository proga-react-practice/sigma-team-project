import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { FormProvider } from '../src/components/Match/FormContext';

function App() {
  return (
    <>
      <FormProvider>
        <RouterProvider router={router} />
      </FormProvider>
    </>
  );
}

export default App;
