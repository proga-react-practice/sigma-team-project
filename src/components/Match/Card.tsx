import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditableTextField from "./EditableTextField";
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
        <>
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
          <EditableTextField
            value={editedBlock.firstTeam || ""}
            label="First Team"
            onChange={(value) => handleChange("firstTeam", value)}
          />
          <EditableTextField
            value={editedBlock.secondTeam || ""}
            label="Second Team"
            onChange={(value) => handleChange("secondTeam", value)}
          />
          <EditableTextField
            value={editedBlock.tickets || ""}
            label="Number of Tickets"
            onChange={(value) => handleChange("tickets", value)}
          />
          <EditableTextField
            value={editedBlock.stadium || ""}
            label="Stadium"
            onChange={(value) => handleChange("stadium", value)}
          />
          <Button
            variant="outlined"
            onClick={() => handleSave(block.id)}
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
        </>
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
