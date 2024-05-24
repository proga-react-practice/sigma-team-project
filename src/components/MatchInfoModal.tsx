import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Stack } from "@mui/material";
import { useFormContext } from "./Match/FormContext";
import Card from "./Match/Card";
import { theme } from "../utils/theme";

interface MatchModalProps {
  open: boolean;
  onClose: () => void;
  stadiumId: string;
}

export interface Block {
  id: number;
  firstTeam: string;
  secondTeam: string;
  tickets: string;
  stadium: string;
  stadiumId: string | null;
}

const MatchModal: React.FC<MatchModalProps> = ({ open, onClose, stadiumId }) => {
  const { blocks, removeBlock, updateBlock } = useFormContext();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedBlock, setEditedBlock] = useState<Partial<Block>>({});
  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>([]);

  useEffect(() => {
    setFilteredBlocks(blocks.filter((block) => block.stadiumId === stadiumId));
  }, [blocks, stadiumId]);

  const handleEdit = (id: number, block: Block) => {
    setEditMode(id);
    setEditedBlock(block);
  };

  const handleChange = (field: keyof Block, value: string) => {
    setEditedBlock((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = (id: number) => {
    updateBlock(id, editedBlock);
    const updatedBlocks = filteredBlocks.map((block) =>
      block.id === id ? { ...block, ...editedBlock } : block
    );
    setFilteredBlocks(updatedBlocks);
    setEditMode(null);
  };

  const handleDelete = (id: number) => {
    removeBlock(id);
    setFilteredBlocks(filteredBlocks.filter((block) => block.id !== id));
  };

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
        {filteredBlocks.length === 0 && (
          <Stack direction="row" justifyContent="center" spacing={0.5} sx={{ color: theme.palette.text.secondary }}>
            <Typography
              sx={{
                marginTop: theme.spacing(3),
                color: theme.palette.text.secondary,
              }}
            >
              No match cards available! Please add a match card.
            </Typography>
          </Stack>
        )}
        {filteredBlocks.map((block) => (
          <Box key={block.id} sx={{ mt: 2, maxWidth: "100%" }}>
            <Card
              block={block}
              editMode={editMode}
              editedBlock={editedBlock}
              handleChange={handleChange}
              handleSave={() => handleSave(block.id)}
              handleEdit={() => handleEdit(block.id, block)}
              handleDelete={() => handleDelete(block.id)}
            />
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default MatchModal;
