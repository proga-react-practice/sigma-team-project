import React from "react";
import { Button, Typography, Grid, TextField, Box, FormHelperText, MenuItem, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { Block } from "./CardList";
import { useStadiumCardContext } from "../Stadium/StadiumCardContext";
import WarningIcon from '@mui/icons-material/Warning';

interface CardProps {
  block: Block;
  editMode: number | null;
  editedBlock: Partial<Block>;
  handleChange: (field: keyof Block, value: string) => void;
  handleSave: (id: number) => void;
  handleEdit: (id: number, block: Block) => void;
  handleDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
  block,
  editMode,
  editedBlock,
  handleChange,
  handleSave,
  handleEdit,
  handleDelete,
}) => {
  const theme = useTheme();
  const {cards} = useStadiumCardContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Block>>({
    defaultValues: block
  });

  const onSubmit = () => {
    handleSave(block.id);
  };

  const textFieldStyle = {
    backgroundColor: theme.palette.custom.cardBackground,
    color:theme.palette.text.secondary,
    "& .MuiInputLabel-root": {
      color:theme.palette.text.secondary,
      "&.Mui-focused": {
        color:theme.palette.text.secondary,
      },
    }
  };
  const selectedStadium = cards.find((card) => card.id === block.stadiumId);
  const stadiumRemoved = !selectedStadium;
  const stadiumNameChanged = selectedStadium && selectedStadium.stadiumName !== block.stadium;
  const capacityReduced = selectedStadium && parseInt(selectedStadium.capacity) < parseInt(block.tickets);
  const needToUpdateData = stadiumRemoved || stadiumNameChanged || capacityReduced;

  return (
    <Grid
      key={block.id}
      id={`card-${block.id}`}
      sx={{
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        display: "flex",
        flexDirection: "column",
        borderRadius: theme.spacing(3),
        width: "100%",
        boxShadow: 5,
        marginTop: theme.spacing(2),
        textAlign: "center",
        backgroundColor: theme.palette.custom.cardBackground,
        color:theme.palette.text.secondary,
        transition: "transform 0.3s ease-in-out",
        "&.delete-animation": {
          transform: "scale(0)",
        },
        "@media screen and (max-width: 426px)": {
          width: "auto",
        },
      }}
    >
      {editMode === block.id ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            sx={{
              marginTop: theme.spacing(3),
              fontSize: theme.spacing(4),
              fontFamily: "Platypi",
              fontWeight: 600,
              color:theme.palette.text.secondary,
            }}
          >
            Editing Mode:
          </Typography>
          <Box sx={{ marginTop: theme.spacing(3) }}>
            <TextField
              id="firstTeam"
              label="First Team"
              variant="outlined"
              sx={{
                ...textFieldStyle,
              }}
              InputProps={{
                sx: textFieldStyle,
              }}
              {...register("firstTeam", {
                required: "Input cannot be empty!",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5 characters!",
                },
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters!",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Only letters and spaces are allowed!",
                },
              })}
              error={!!errors.firstTeam}
              onChange={(e) => handleChange("firstTeam", e.target.value)}
              fullWidth
            />
            {errors.firstTeam && (
              <FormHelperText error={!!errors.firstTeam} sx={{ color: theme.palette.error.main }}>
                {errors.firstTeam.message}
              </FormHelperText>
            )}
          </Box>
          <Box sx={{ marginTop: theme.spacing(3) }}>
            <TextField
              id="secondTeam"
              label="Second Team"
              variant="outlined"
              sx={{
                ...textFieldStyle,
                }}
              InputProps={{
                sx: textFieldStyle,
              }}
              {...register("secondTeam", {
                required: "Input cannot be empty!",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5 characters!",
                },
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters!",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Only letters and spaces are allowed!",
                },
              })}
              error={!!errors.secondTeam}
              onChange={(e) => handleChange("secondTeam", e.target.value)}
              fullWidth
            />
            {errors.secondTeam && (
              <FormHelperText error={!!errors.secondTeam} sx={{ color: theme.palette.error.main }}>
                {errors.secondTeam.message}
              </FormHelperText>
            )}
          </Box>
          <Box sx={{ marginTop: theme.spacing(3) }}>
            <TextField
              id="tickets"
              label="Number of Tickets"
              variant="outlined"
              type="number"
              sx={{
                ...textFieldStyle,
               }}
              InputProps={{
                sx: textFieldStyle,
              }}
              {...register("tickets", {
                required: "Input cannot be empty!",
                min: {
                  value: 0,
                  message: "Value must be a positive number!",
                },
                validate: {stadiumCapacity: (value) => {
                  const parsedValue = value !== undefined ? parseInt(value) : NaN;
                    if (editedBlock.stadium === "") {
                      return true;
                    }
                    const selectedStadium = cards.find((card) => card.stadiumName === editedBlock.stadium);
                    const capacity = selectedStadium ? parseInt(selectedStadium.capacity) : 0;
                    return parsedValue <= capacity || `Number of tickets exceeds stadium capacity (${capacity})`;
                  },
                },
              })}
              error={!!errors.tickets}
              onChange={(e) => handleChange("tickets", e.target.value)}
              fullWidth
            />
            {errors.tickets && (
              <FormHelperText error={!!errors.tickets} sx={{ color: theme.palette.error.main }}>
                {errors.tickets.message}
              </FormHelperText>
            )}
          </Box>
          <Box sx={{ marginTop: theme.spacing(3) }}>
            <TextField
              id="stadium"
              select
              label="Stadium"
              variant="outlined"
              sx={{
                ...textFieldStyle,
                  textAlign: 'left',
              }}
              InputProps={{
                sx: textFieldStyle,
              }}
              {...register("stadium", {
                required: "Please, select an option!",
              })}
              error={!!errors.stadium}
              onChange={(e) => {
                handleChange("stadium", e.target.value);
                const selectedStadium = cards.find((card) => card.stadiumName === e.target.value);
                handleChange("stadiumId", selectedStadium ? selectedStadium.id.toString() : "");
              }}
              fullWidth
              defaultValue={block.stadium}
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cards.map((card) => (
              <MenuItem key={card.id} value={card.stadiumName}>
                {card.stadiumName}
              </MenuItem>
            ))}
            </ TextField >
            {errors.stadium && (
              <FormHelperText error={!!errors.stadium} sx={{ color: theme.palette.error.main }}>
                {errors.stadium.message}
              </FormHelperText>
            )}
          </Box>
          <Button
            type="submit"
            variant="outlined"
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: theme.spacing(1),
              fontSize: theme.spacing(2.4),
              marginTop: theme.spacing(4),
              height: theme.spacing(5),
              width: theme.spacing(20),
              mb: theme.spacing(4),
            }}
          >
            Save
          </Button>
        </form>
      ) : (
        <>
          <Typography
            sx={{
              marginTop: theme.spacing(3),
              fontSize: theme.spacing(4),
              fontFamily: "Platypi",
              fontWeight: 600,
              color:theme.palette.text.secondary,
            }}
          >
            Match Info:
          </Typography>
          <Typography sx={{ marginTop: theme.spacing(2), color:theme.palette.text.secondary}}>
            {block.firstTeam} - {block.secondTeam}
          </Typography>
          <Typography sx={{ marginTop: theme.spacing(2), color:theme.palette.text.secondary}}>
            Number of tickets: {block.tickets}
          </Typography>
          <Typography sx={{ marginTop: theme.spacing(2),  color:theme.palette.text.secondary, }}>
            Field: {block.stadium}
          </Typography>
          {needToUpdateData && (
            <Stack direction="row" justifyContent="center" spacing={0.5} sx={{ color: theme.palette.warning.main }}>
              <WarningIcon fontSize="small" />
              <Typography sx={{ color: theme.palette.warning.main }}>
                Please update {stadiumRemoved || stadiumNameChanged ? 'field information.' : 'tickets value.'}
              </Typography>
            </Stack>
          )}
          <Button
            variant="outlined"
            onClick={() => handleEdit(block.id, block)}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: theme.spacing(1),
              fontSize: theme.spacing(2.4),
              marginTop: theme.spacing(4),
              height: theme.spacing(5),
              width: theme.spacing(20),
              mb: theme.spacing(2),
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleDelete(block.id)}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: theme.spacing(1),
              fontSize: theme.spacing(2.4),
              marginTop: theme.spacing(2),
              height: theme.spacing(5),
              width: theme.spacing(20),
              mb: theme.spacing(4),
            }}
          >
            Delete
          </Button>
        </>
      )}
    </Grid>
  );
};

export default Card;
