
import Container from "./Container"
import { FormProvider } from "./FormContext"

const MatchContainer = () => {
  return (
    <FormProvider>
      <Container />
    </FormProvider>
  )
}

export default MatchContainer
