import TextField, {TextFieldProps} from "@mui/material/TextField";
import {UseFormRegister} from "react-hook-form";
type StadiumFormValues = {
    stadiumName: string;
    city: string;
    capacity: string;
    fieldType: string;
};
interface InputProps {
    type: "text" | "number";
    placeholder?: string;
    id?: string;
    name?: string;
    register: UseFormRegister<StadiumFormValues>;
}
const Input = ({register, ...props}: InputProps & TextFieldProps) => {
    return <TextField {...props} {...register} />;
};

export default Input;
