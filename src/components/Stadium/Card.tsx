import {useState} from "react";
import Button from "./Button";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiCard from "@mui/material/Card";
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
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import EditCardModal from "./EditCardModal";
import {useStadiumCardContext} from "./StadiumCardContext";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MatchModal from "../MatchInfoModal";

export interface CardProps {
    stadiumName: string;
    city: string;
    capacity: string;
    fieldType: string;
    id: string;
    onClick: (id: string) => void;
    showMatchButton?: boolean;
}

const Card: React.FC<CardProps & Omit<MuiCardProps, "onClick">> = ({
    stadiumName,
    city,
    capacity,
    fieldType,
    id,
    showMatchButton: showStadiumButton = false,
}) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [MatchModalOpen, setMatchModalOpen] = useState(false);
    const {removeCard} = useStadiumCardContext();
    const handleRemove = () => {
        removeCard(id);
    };
    const {attributes, listeners, setNodeRef, transform, transition} =
        useSortable({id});

    const openEditModal = () => {
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const openMatchModal = () => {
        setMatchModalOpen(true);
    };

    const closeMatchModal = () => {
        setMatchModalOpen(false);
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <MuiCard
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            id={id}
            sx={{padding: 0.5}}
            style={style}
        >
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
                    variant="contained"
                    type="button"
                    size="small"
                    onClick={openEditModal}
                    sx={{flex: 1}}
                    startIcon={<Edit />}
                >
                    Edit
                </Button>
                {showStadiumButton && (
                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            "&:hover": {
                                backgroundColor: theme.palette.secondary.dark,
                            },
                            flex: 1,
                        }}
                        variant="contained"
                        type="button"
                        size="small"
                        startIcon={<SportsSoccerIcon />}
                        onClick={openMatchModal}
                    >
                        Match
                    </Button>
                )}
                <Button
                    sx={{
                        backgroundColor: theme.palette.error.dark,
                        "&:hover": {
                            backgroundColor: theme.palette.error.main,
                        },
                        flex: 1,
                    }}
                    variant="contained"
                    type="button"
                    size="small"
                    onClick={handleRemove}
                    startIcon={<DeleteIcon />}
                >
                    Remove
                </Button>
            </CardActions>
            <EditCardModal
                open={editModalOpen}
                onClose={closeEditModal}
                initialData={{
                    stadiumName,
                    city,
                    capacity,
                    fieldType,
                    id,
                    onClick: () => handleRemove(),
                }}
                id={id}
            />
            <MatchModal
                open={MatchModalOpen}
                onClose={closeMatchModal}
                stadiumId={id}
            />
        </MuiCard>
    );
};

export default Card;
