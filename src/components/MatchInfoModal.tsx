import React from "react";
import { Modal, Box, Typography, Stack } from "@mui/material";
import { useFormContext } from "./Match/FormContext";
import Card from "./Match/Card";
import { theme } from "../utils/theme";

interface MatchModalProps {
  open: boolean;
  onClose: () => void;
  stadiumId: string;
}

const MatchModal: React.FC<MatchModalProps> = ({
  open,
  onClose,
  stadiumId,
}) => {
  const {
    blocks,
    editMode,
    editedBlock,
    handleChange,
    handleSave,
    handleEdit,
    handleDelete,
  } = useFormContext();
  const filteredBlocks = blocks.filter(
    (block) => block.stadiumId === stadiumId
  );
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxHeight: "80vh",
          overflowY: "auto",
          width: "30%",
        }}
      >
        <Typography variant="h6" component="h2">
          Match Cards
        </Typography>
        {blocks.length === 0 && (
          <>
          <Stack direction="row" justifyContent='center' spacing={0.5}
             sx={{color:theme.palette.text.secondary}}>
            <Typography
              sx={{
                marginTop: theme.spacing(3),
                color: theme.palette.text.secondary,
              }}
            >
              No match cards available! Please add a match card.
            </Typography>
            </Stack>
          </>
        )}
        {filteredBlocks.map((block) => (
          <Box key={block.id} sx={{ mt: 2, maxWidth: "100%" }}>
            <Card
              block={block}
              editMode={editMode ?? null}
              editedBlock={editedBlock ?? {}}
              handleChange={handleChange || (() => {})}
              handleSave={handleSave || (() => {})}
              handleEdit={handleEdit || (() => {})}
              handleDelete={handleDelete || (() => {})}
            />
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default MatchModal;
