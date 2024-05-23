import React from "react";
import { Button, Typography, Grid, TextField, Box, FormHelperText } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { Block } from "./CardList";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Block>>({
    defaultValues: editedBlock,
  });

  const onSubmit = () => {
    handleSave(block.id);
  };

  const textFieldStyle = {
    backgroundColor: theme.palette.custom.cardBackground,
  };

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
              label="Stadium"
              variant="outlined"
              sx={{
                ...textFieldStyle,
              }}
              InputProps={{
                sx: textFieldStyle,
              }}
              {...register("stadium", {
                required: "Please, select an option!",
              })}
              error={!!errors.stadium}
              onChange={(e) => handleChange("stadium", e.target.value)}
              fullWidth
            />
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
            }}
          >
            Match Info:
          </Typography>
          <Typography sx={{ marginTop: theme.spacing(2) }}>
            {block.firstTeam} - {block.secondTeam}
          </Typography>
          <Typography sx={{ marginTop: theme.spacing(2) }}>
            Number of tickets: {block.tickets}
          </Typography>
          <Typography sx={{ marginTop: theme.spacing(2) }}>
            Field: {block.stadium}
          </Typography>
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