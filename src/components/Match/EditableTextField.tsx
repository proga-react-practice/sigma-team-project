import React from "react";
import { TextField } from "@mui/material";
import { theme } from '../../utils/theme-2'

interface EditableTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const EditableTextField: React.FC<EditableTextFieldProps> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <TextField
      value={value}
      variant="standard"
      onChange={(e) => onChange(e.target.value)}
      label={label}
      sx={{
        width: "70%",
        fontFamily: "Platypi",
        fontSize: theme.spacing(3),
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(5),
        marginRight: 0,
      }}
    />
  );
};

export default EditableTextField;
