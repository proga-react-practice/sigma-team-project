import MenuItem from "@mui/material/MenuItem";
import MuiSelect, {SelectChangeEvent} from "@mui/material/Select";
interface SelectProps {
    options: {label: string; value: string | number}[];
    value: string;
    label: string;
    id?: string;
    name?: string;
    selectRef?: React.Ref<HTMLSelectElement>;
    onChange: (e: SelectChangeEvent<string>) => void;
}

const Select: React.FC<SelectProps> = ({
    options,
    value,
    label,
    onChange,
    selectRef,
    ...props
}) => {
    return (
        <MuiSelect
            labelId={props.id}
            value={value}
            onChange={onChange}
            inputRef={selectRef}
            {...props}
            label={label}
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
