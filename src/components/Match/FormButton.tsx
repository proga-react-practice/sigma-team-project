import Button from '@mui/material/Button';
import { theme } from '../../utils/theme'

interface CustomButtonProps {
    type: "button" | "submit" | "reset";
    variant: "text" | "outlined" | "contained"; 
    onClick: () => void;
    label: string;
  }

const CustomButton: React.FC<CustomButtonProps> = ({ type, variant, onClick, label }) => {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
      sx={{
        borderRadius: theme.spacing(1),
        fontSize: theme.spacing(2.4),
        marginTop: theme.spacing(4),
        height: theme.spacing(5),
        width: theme.spacing(20),
        mb: theme.spacing(4),
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
