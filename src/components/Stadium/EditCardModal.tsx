import React from "react";
import {
    Modal,
    Box,
    Typography,
    FormControl,
    Stack,
    InputLabel,
    SelectChangeEvent,
} from "@mui/material";
import {useForm, SubmitHandler, UseFormRegister} from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import {CardProps} from "./Card";
import ErrorIcon from "@mui/icons-material/Error";
import Clear from "@mui/icons-material/Clear";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SaveIcon from "@mui/icons-material/Save";
import {
    excludeSpecialCharsAndNumbersPattern,
    excludeSpecialCharsPattern,
    positiveIntegerPattern,
} from "../../utils/validationPatterns";
import {theme} from "../../utils/theme";
import {useStadiumCardContext} from "./StadiumCardContext";
import {fieldTypeOptions} from "../../utils/fieldTypeOptions";

type StadiumFormValues = {
    stadiumName: string;
    city: string;
    capacity: string;
    fieldType: string;
};

interface EditCardModalProps {
    open: boolean;
    onClose: () => void;
    initialData: CardProps;
    id: string;
}

const EditCardModal: React.FC<EditCardModalProps> = ({
    open,
    onClose,
    initialData,
    id,
}) => {
    const {
        handleSubmit,
        register,
        watch,
        reset,
        setValue,
        clearErrors,
        setError,
        setFocus,
        formState: {errors, isValid},
    } = useForm<StadiumFormValues>({
        defaultValues: {
            stadiumName: initialData.stadiumName,
            city: initialData.city,
            capacity: initialData.capacity,
            fieldType: initialData.fieldType,
        },
        mode: "onChange",
    });
    const {cards, updateCard, removeCard} = useStadiumCardContext();
    const onSubmit: SubmitHandler<StadiumFormValues> = (data) => {
        if (isValid) {
            const existedStadiumName = cards.find(
                (item) => item.stadiumName === data.stadiumName
            );
            if (existedStadiumName) {
                setError("stadiumName", {
                    message: "Stadium with this name already exist",
                });
                setFocus("stadiumName");
            } else {
                const updatedCard: CardProps = {
                    stadiumName: data.stadiumName,
                    city: data.city,
                    capacity: data.capacity,
                    fieldType: data.fieldType,
                    id,
                    onClick: removeCard,
                };

                updateCard(updatedCard);
                onClose();
            }
        }
    };

    const handleModalExit = () => {
        reset({
            stadiumName: initialData.stadiumName,
            city: initialData.city,
            capacity: initialData.capacity,
            fieldType: initialData.fieldType,
        });
        onClose();
    };

    return (
        <Modal open={open}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: {xs: "70%", sm: "50%", md: "40%"},
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 4,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Edit Stadium Information
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{mb: 2}}>
                        <Input
                            type="text"
                            variant="standard"
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
                    </FormControl>
                    <FormControl fullWidth sx={{mb: 2}}>
                        <Input
                            type="text"
                            label="City"
                            variant="standard"
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
                    </FormControl>
                    <FormControl fullWidth sx={{mb: 2}}>
                        <Input
                            type="number"
                            label="Capacity"
                            variant="standard"
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
                    </FormControl>
                    <InputLabel id="field-type">Field type</InputLabel>
                    <FormControl variant="standard" fullWidth>
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
                    <Stack
                        sx={{
                            direction: {
                                xs: "column",
                                sm: "row",
                            },
                        }}
                        spacing={2}
                        justifyContent="space-between"
                        mt={1}
                    >
                        <Button
                            startIcon={<SaveIcon />}
                            variant="contained"
                            type="submit"
                            sx={{flex: 1}}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            type="reset"
                            onClick={reset}
                            startIcon={<Clear />}
                            sx={{
                                flex: 1,
                                backgroundColor: theme.palette.warning.dark,
                                "&:hover": {
                                    backgroundColor: theme.palette.warning.main,
                                },
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleModalExit}
                            startIcon={<ExitToAppIcon />}
                            sx={{
                                flex: 1,
                                backgroundColor: theme.palette.error.dark,
                                "&:hover": {
                                    backgroundColor: theme.palette.error.main,
                                },
                            }}
                        >
                            Exit
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditCardModal;
