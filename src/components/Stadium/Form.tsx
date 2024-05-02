import React, {ChangeEvent, MouseEvent, useState, useRef} from "react";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import {CardProps} from "./Card";
import {
    specialChars,
    specialCharsAndNumbers,
    positiveIntegerPattern,
} from "../../utils/validationPatterns";
import {
    Typography,
    Stack,
    Box,
    Paper,
    InputLabel,
    FormControl,
} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import {theme} from "../../utils/theme";

interface FormProps {
    setCardInfo: React.Dispatch<React.SetStateAction<CardProps[]>>;
}

const Form: React.FC<FormProps> = ({setCardInfo}) => {
    const [stadiumName, setStadiumName] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [capacity, setCapacity] = useState<string>("");
    const [fieldType, setFieldType] = useState<string>("");

    const [stadiumNameError, setStadiumNameError] = useState<string>("");
    const [cityError, setCityError] = useState<string>("");
    const [capacityError, setCapacityError] = useState<string>("");
    const [fieldTypeError, setFieldTypeError] = useState<string>("");

    const stadiumNameRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const capacityRef = useRef<HTMLInputElement>(null);
    const fieldTypeRef = useRef<HTMLSelectElement>(null);

    const removeCard = (id: string) => {
        setCardInfo((prevCardInfo) =>
            prevCardInfo.filter((card) => card.id !== id)
        );
    };

    const handleStadiumNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStadiumName(value);
        if (value.trim() === "") {
            setStadiumNameError("This field cannot be empty");
        } else if (specialChars.test(value)) {
            setStadiumNameError("This field cannot contain special chars");
        } else if (value.length > 40) {
            setStadiumNameError(
                "The field length must be less than 40 characters"
            );
        } else {
            setStadiumNameError("");
        }
    };

    const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCity(value);
        if (value.trim() === "") {
            setCityError("This field cannot be empty");
        } else if (specialCharsAndNumbers.test(value)) {
            setCityError("This field must contain only letters");
        } else if (value.length > 40) {
            setCityError("The field length must be less than 40 characters");
        } else {
            setCityError("");
        }
    };

    const handleCapacityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCapacity(value);
        if (!positiveIntegerPattern.test(value)) {
            setCapacityError("This field must contain only positive integers");
        } else {
            setCapacityError("");
        }
    };

    const handleFieldTypeChange = (e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setFieldType(value);
        if (value.trim() === "") {
            setFieldTypeError("Please select an option");
        }
        setFieldTypeError("");
    };

    const handleFormReset = () => {
        setStadiumName("");
        setCity("");
        setCapacity("");
        setFieldType("");
        setCapacityError("");
        setCityError("");
        setFieldTypeError("");
        setStadiumNameError("");
    };

    const formValidation = () => {
        let isValid = false;
        if (!stadiumName) {
            setStadiumNameError(stadiumName || "This field cannot be empty");
        }
        if (!city) {
            setCityError(city || "This field cannot be empty");
        }
        if (!capacity) {
            setCapacityError(
                capacity || "This field must contain positive integers"
            );
        }
        if (!fieldType) {
            setFieldTypeError(fieldType || "Please select an option");
        }

        if (!isValid) {
            if (stadiumNameError || !stadiumName)
                stadiumNameRef.current?.focus();
            else if (cityError || !city) cityRef.current?.focus();
            else if (capacityError || !capacity) capacityRef.current?.focus();
            else if (fieldTypeError || !fieldType)
                fieldTypeRef.current?.focus();
            else isValid = true;
        }

        return isValid;
    };

    const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const isFormValid = formValidation();

        if (isFormValid) {
            const newCard: CardProps = {
                stadiumName: stadiumName,
                city: city,
                capacity: capacity,
                fieldType: fieldType,
                id: Date.now().toString(),
                onClick: (id) => removeCard(id),
            };

            setCardInfo((prevCardInfo) => [newCard, ...prevCardInfo]);
            handleFormReset();
        }
    };

    const fieldTypeOptions = [
        {label: "Natural", value: "natural"},
        {label: "Synthetic", value: "synthetic"},
        {label: "Mixed", value: "mixed"},
    ];

    return (
        <Paper elevation={0} sx={{width: {xs: "100%", lg: "400px"}}}>
            <Typography variant="h4">Stadium form</Typography>
            <Box mt={1} component="form">
                <Box sx={{minHeight: "80px"}}>
                    <Input
                        type="text"
                        id="stadium-name"
                        name="stadiumName"
                        placeholder="Enter stadium name"
                        label="Stadium"
                        value={stadiumName}
                        inputRef={stadiumNameRef}
                        onChange={handleStadiumNameChange}
                    />

                    {stadiumNameError && (
                        <Stack
                            direction="row"
                            gap={1}
                            sx={{color: theme.palette.error.light}}
                        >
                            <ErrorIcon fontSize="small" />
                            <Typography variant="body2">
                                {stadiumNameError}
                            </Typography>
                        </Stack>
                    )}
                </Box>
                <Box sx={{minHeight: "80px"}}>
                    <Input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter city"
                        label="City"
                        value={city}
                        inputRef={cityRef}
                        onChange={handleCityChange}
                    />
                    {cityError && (
                        <Stack
                            direction="row"
                            gap={1}
                            sx={{color: theme.palette.error.light}}
                        >
                            <ErrorIcon fontSize="small" />
                            <Typography variant="body2">{cityError}</Typography>
                        </Stack>
                    )}
                </Box>
                <Box sx={{minHeight: "80px"}}>
                    <Input
                        type="number"
                        id="capacity"
                        name="capacity"
                        placeholder="Enter stadium capacity"
                        label="Capacity"
                        value={capacity}
                        inputRef={capacityRef}
                        onChange={handleCapacityChange}
                    />
                    {capacityError && (
                        <Stack
                            direction="row"
                            gap={1}
                            sx={{
                                color: theme.palette.error.light,
                            }}
                        >
                            <ErrorIcon fontSize="small" />
                            <Typography variant="body2">
                                {capacityError}
                            </Typography>
                        </Stack>
                    )}
                </Box>
                <Box sx={{minHeight: "80px"}}>
                    <FormControl fullWidth>
                        <InputLabel id="field-type">Field type</InputLabel>
                        <Select
                            id="field-type"
                            name="fieldType"
                            label="Field type"
                            options={fieldTypeOptions}
                            onChange={handleFieldTypeChange}
                            selectRef={fieldTypeRef}
                            value={fieldType}
                        />
                        {fieldTypeError && (
                            <Stack
                                direction="row"
                                gap={1}
                                sx={{color: theme.palette.error.light}}
                            >
                                <ErrorIcon fontSize="small" />
                                <Typography variant="body2">
                                    {fieldTypeError}
                                </Typography>
                            </Stack>
                        )}
                    </FormControl>
                </Box>
                <Box mt={3} display="flex">
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                        endIcon={<AddIcon />}
                        sx={{flexGrow: 1}}
                    >
                        Add
                    </Button>
                    <Button
                        variant="outlined"
                        type="reset"
                        onClick={handleFormReset}
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
