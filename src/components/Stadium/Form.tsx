import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import {CardProps} from "./Card";
import {
    excludeSpecialCharsPattern,
    excludeSpecialCharsAndNumbersPattern,
    positiveIntegerPattern,
} from "../../utils/validationPatterns";
import {UseFormRegister, useForm} from "react-hook-form";
import {
    Typography,
    Stack,
    Box,
    Paper,
    InputLabel,
    FormControl,
    SelectChangeEvent,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import {theme} from "../../utils/theme";
import {useStadiumCardContext} from "./StadiumCardContext";
import {fieldTypeOptions} from "../../utils/fieldTypeOptions";

type StadiumFormValues = {
    stadiumName: string;
    city: string;
    capacity: string;
    fieldType: string;
};

const Form: React.FC = () => {
    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        clearErrors,
        setError,
        setFocus,
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
    const {cards, addCard, removeCard} = useStadiumCardContext();

    const onSubmit = (data: StadiumFormValues) => {
        if (isValid) {
            const existedStadiumName = cards.find(
                (item) => item.stadiumName === data.stadiumName.replace(/\s/g, '')
            );
            if (existedStadiumName) {
                setError("stadiumName", {
                    message: "Stadium with this name already exist",
                });
                setFocus("stadiumName");
            } else {
                const newCard: CardProps = {
                    stadiumName: data.stadiumName,
                    city: data.city,
                    capacity: data.capacity,
                    fieldType: data.fieldType,
                    id: Date.now().toString(),
                    onClick: (id) => removeCard(id),
                };
                addCard(newCard);
                handleReset();
            }
        }
    };

    const handleReset = () => {
        reset();
    };

    return (
        <Paper elevation={0} sx={{width: {xs: "100%", lg: "80%"}}}>
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
                        value={watch("stadiumName") || ""}
                        register={
                            {
                                ...register("stadiumName", {
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
                                }),
                            } as unknown as UseFormRegister<StadiumFormValues>
                        }
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
                        register={
                            {
                                ...register("city", {
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
                                }),
                            } as unknown as UseFormRegister<StadiumFormValues>
                        }
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
                        register={
                            {
                                ...register("capacity", {
                                    required: "This field cannot be empty",
                                    pattern: {
                                        value: positiveIntegerPattern,
                                        message:
                                            "This field must contain only positive integers",
                                    },
                                }),
                            } as unknown as UseFormRegister<StadiumFormValues>
                        }
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
                            register={
                                {
                                    ...register("fieldType", {
                                        required: "Please select an option",
                                    }),
                                } as unknown as UseFormRegister<StadiumFormValues>
                            }
                            onChange={(e: SelectChangeEvent<string>) => {
                                setValue("fieldType", e.target.value);
                                if (errors.fieldType) {
                                    clearErrors("fieldType");
                                }
                            }}
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
