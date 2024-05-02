import React from "react";
import Button from "./Button";
import DeleteIcon from "@mui/icons-material/Delete";
import MiuCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import {CardProps as MuiCardProps} from "@mui/material/Card";
import {theme} from "../../utils/theme";
import StadiumIcon from "@mui/icons-material/Stadium";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import GrassIcon from "@mui/icons-material/Grass";
import EventSeatIcon from "@mui/icons-material/EventSeat";

export interface CardProps {
    stadiumName: string;
    city: string;
    capacity: string;
    fieldType: string;
    id: string;
    onClick: (id: string) => void;
}

const Card: React.FC<CardProps & Omit<MuiCardProps, "onClick">> = ({
    stadiumName,
    city,
    capacity,
    fieldType,
    id,
    onClick,
}) => {
    const handleRemove = () => {
        onClick(id);
    };

    return (
        <MiuCard id={id} sx={{padding: 0.5}}>
            <CardContent sx={{padding: 0.5}}>
                <Stack direction="row" spacing={0.5}>
                    <StadiumIcon fontSize="small" />
                    <Typography variant="body1">
                        Stadium - {stadiumName}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                    <LocationCityIcon fontSize="small" />
                    <Typography variant="body1">City - {city}</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                    <EventSeatIcon fontSize="small" />
                    <Typography variant="body1">
                        Capacity - {capacity}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                    <GrassIcon fontSize="small" />
                    <Typography variant="body1">Field - {fieldType}</Typography>
                </Stack>
            </CardContent>
            <CardActions sx={{paddingTop: 0, justifyContent: "flex-end"}}>
                <Button
                    sx={{
                        backgroundColor: theme.palette.error.dark,
                        "&:hover": {
                            backgroundColor: theme.palette.error.main,
                        },
                    }}
                    variant="contained"
                    type="button"
                    size="small"
                    onClick={handleRemove}
                    endIcon={<DeleteIcon />}
                >
                    Remove
                </Button>
            </CardActions>
        </MiuCard>
    );
};

export default Card;
