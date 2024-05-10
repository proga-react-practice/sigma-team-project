import MenuItem from "@mui/material/MenuItem";
import MuiSelect, {SelectChangeEvent} from "@mui/material/Select";
import React from "react";
interface SelectProps {
    options: {label: string; value: string | number}[];
    value?: string;
    label: string;
    id?: string;
    name?: string;
    selectRef?: React.Ref<HTMLSelectElement>;
    onChange: (e: SelectChangeEvent<string>) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({options, label, onChange, ...props}, ref) => {
        return (
            <MuiSelect
                defaultValue=" "
                labelId={props.id}
                inputRef={ref}
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
    }
);

export default Select;
