import TextField, {TextFieldProps} from "@mui/material/TextField";
import {ChangeEvent} from "react";

interface InputProps {
    type: "text" | "number";
    placeholder?: string;
    id?: string;
    name?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps & TextFieldProps> = ({
    onChange,
    inputRef,
    ...props
}) => {
    return <TextField {...props} inputRef={inputRef} onChange={onChange} />;
};

export default Input;
