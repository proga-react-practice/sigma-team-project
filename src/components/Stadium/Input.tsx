import TextField, {TextFieldProps} from "@mui/material/TextField";
import React from "react";

interface InputProps {
    type: "text" | "number";
    placeholder?: string;
    id?: string;
    name?: string;
    inputRef?: React.Ref<HTMLInputElement>;
}
const Input = React.forwardRef<HTMLInputElement, InputProps & TextFieldProps>(
    ({...props}, ref) => {
        return <TextField {...props} inputRef={ref} />;
    }
);

export default Input;
