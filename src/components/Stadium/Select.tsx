import MenuItem from "@mui/material/MenuItem";
import MuiSelect, {SelectChangeEvent} from "@mui/material/Select";
import {UseFormRegister} from "react-hook-form";
type StadiumFormValues = {
    stadiumName: string;
    city: string;
    capacity: string;
    fieldType: string;
};
interface SelectProps {
    options: {label: string; value: string | number}[];
    value?: string;
    label: string;
    id?: string;
    name?: string;
    onChange?: (e: SelectChangeEvent<string>) => void;
    register: UseFormRegister<StadiumFormValues>;
}
const Select = ({
    options,
    label,
    onChange,
    register,
    ...props
}: SelectProps) => {
    return (
        <MuiSelect
            defaultValue=" "
            labelId={props.id}
            {...register}
            {...props}
            label={label}
            onChange={onChange}
        >
            <MenuItem value="" disabled hidden>
                {label}
            </MenuItem>
            {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </MuiSelect>
    );
};

export default Select;
