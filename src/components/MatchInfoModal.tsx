import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useFormContext } from "./Match/FormContext";
import Card from "./Match/Card";


interface MatchModalProps {
  open: boolean;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ open, onClose }) => {
  const {
    blocks,
    editMode,
    editedBlock,
    handleChange,
    handleSave,
    handleEdit,
    handleDelete,
  } = useFormContext();

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
        }}
      >
        <Typography variant="h6" component="h2">
          Match Cards
        </Typography>
        {blocks.map((block) => (
          <Box key={block.id} sx={{ mt: 2 }}>
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
