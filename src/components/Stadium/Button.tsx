import {MouseEvent, ReactNode} from "react";
import MuiButton, {ButtonProps} from "@mui/material/Button";

interface CustomButtonProps {
    type: "button" | "submit" | "reset";
    children: ReactNode;
    id?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<CustomButtonProps & ButtonProps> = ({...props}) => {
    return <MuiButton {...props} />;
};

export default Button;
