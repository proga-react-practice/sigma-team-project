import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import {CardProps} from "./Card";
import {
    excludeSpecialCharsPattern,
    excludeSpecialCharsAndNumbersPattern,
    positiveIntegerPattern,
} from "../../utils/validationPatterns";
import {useForm} from "react-hook-form";
import {
    Typography,
    Stack,
    Box,
    Paper,
    InputLabel,
    FormControl,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import {theme} from "../../utils/theme";

type StadiumFormValues = {
    stadiumName: string;
    city: string;
    capacity: string;
    fieldType: string;
};
interface FormProps {
    setCardInfo: React.Dispatch<React.SetStateAction<CardProps[]>>;
}

const Form: React.FC<FormProps> = ({setCardInfo}) => {
    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: {errors, isValid},
    } = useForm<StadiumFormValues>({
        defaultValues: {
            stadiumName: "",
            city: "",
            capacity: "",
            fieldType: "",
        },
        mode: "onChange",
    });

    const fieldTypeOptions = [
        {label: "Natural", value: "natural"},
        {label: "Synthetic", value: "synthetic"},
        {label: "Mixed", value: "mixed"},
    ];
    const removeCard = (id: string) => {
        setCardInfo((prevCardInfo) =>
            prevCardInfo.filter((card) => card.id !== id)
        );
    };
    const onSubmit = (data: StadiumFormValues) => {
        if (isValid) {
            const newCard: CardProps = {
                stadiumName: data.stadiumName,
                city: data.city,
                capacity: data.capacity,
                fieldType: data.fieldType,
                id: Date.now().toString(),
                onClick: (id) => removeCard(id),
            };

            setCardInfo((prevCardInfo) => [newCard, ...prevCardInfo]);
            handleReset();
        }
    };

    const handleReset = () => {
        reset();
    };
    return (
        <Paper elevation={0} sx={{width: {xs: "100%", lg: "400px"}}}>
            <Typography variant="h4">Stadium form</Typography>
            <Box
                mt={1}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                onReset={handleReset}
                noValidate
            >
                <Box sx={{minHeight: "80px"}}>
                    <Input
                        type="text"
                        label="Stadium name"
                        value={watch("stadiumName") || ""} // отримання значення з форми
                        {...register("stadiumName", {
                            required: "This field cannot be empty",
                            maxLength: {
                                value: 40,
                                message:
                                    "The field length must be less than 40 characters",
                            },
                            pattern: {
                                value: excludeSpecialCharsPattern,
                                message:
                                    "This field cannot contain special chars",
                            },
                        })}
                    />
                    {errors.stadiumName && (
                        <Stack
                            direction="row"
                            gap={1}
                            sx={{color: theme.palette.error.light}}
                        >
                            <ErrorIcon fontSize="small" />
                            <Typography variant="body2">
                                {errors.stadiumName.message}
                            </Typography>
                        </Stack>
                    )}
                </Box>
                <Box sx={{minHeight: "80px"}}>
                    <Input
                        type="text"
                        label="City"
                        value={watch("city") || ""}
                        {...register("city", {
                            required: "This field cannot be empty",
                            maxLength: {
                                value: 40,
                                message:
                                    "The field length must be less than 40 characters",
                            },
                            pattern: {
                                value: excludeSpecialCharsAndNumbersPattern,
                                message:
                                    "This field cannot contain special chars and numbers",
                            },
                        })}
                    />
                    {errors.city && (
                        <Stack
                            direction="row"
                            gap={1}
                            sx={{color: theme.palette.error.light}}
                        >
                            <ErrorIcon fontSize="small" />
                            <Typography variant="body2">
                                {errors.city.message}
                            </Typography>
                        </Stack>
                    )}
                </Box>
                <Box sx={{minHeight: "80px"}}>
                    <Input
                        type="number"
                        label="Capacity"
                        value={watch("capacity") || ""}
                        {...register("capacity", {
                            required: "This field cannot be empty",
                            pattern: {
                                value: positiveIntegerPattern,
                                message:
                                    "This field must contain only positive integers",
                            },
                        })}
                        onKeyDown={(e) => {
                            if (e.key === "e" || e.key === "E") {
                                e.preventDefault();
                            }
                        }}
                    />
                    {errors.capacity && (
                        <Stack
                            direction="row"
                            gap={1}
                            sx={{color: theme.palette.error.light}}
                        >
                            <ErrorIcon fontSize="small" />
                            <Typography variant="body2">
                                {errors.capacity.message}
                            </Typography>
                        </Stack>
                    )}
                </Box>
                <Box sx={{minHeight: "80px"}}>
                    <FormControl fullWidth>
                        <InputLabel id="field-type">Field type</InputLabel>
                        <Select
                            id="field-type"
                            label="Field type"
                            value={watch("fieldType") || ""}
                            options={fieldTypeOptions}
                            {...register("fieldType", {
                                required: "Please select an option",
                            })}
                        />
                        {errors.fieldType && (
                            <Stack
                                direction="row"
                                gap={1}
                                sx={{color: theme.palette.error.light}}
                            >
                                <ErrorIcon fontSize="small" />
                                <Typography variant="body2">
                                    {errors.fieldType.message}
                                </Typography>
                            </Stack>
                        )}
                    </FormControl>
                </Box>
                <Box mt={3} display="flex">
                    <Button
                        variant="contained"
                        type="submit"
                        endIcon={<AddIcon />}
                        sx={{flexGrow: 1}}
                    >
                        Add
                    </Button>
                    <Button
                        variant="outlined"
                        type="reset"
                        endIcon={<ClearIcon />}
                        sx={{flexGrow: 1}}
                    >
                        Reset
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default Form;
