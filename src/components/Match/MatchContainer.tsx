import Container from "./Container";
import { FormProvider } from "./FormContext";
import { theme } from "../../utils/theme";
import { ThemeProvider } from "@mui/material";

const MatchContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <FormProvider>
        <Container />
      </FormProvider>
    </ThemeProvider>
  );
};

export default MatchContainer;
