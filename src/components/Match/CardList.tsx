import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Grid, TextField } from "@mui/material";
import { theme } from "../../utils/theme-2";

interface Block {
  id: number;
  firstTeam: string;
  secondTeam: string;
  tickets: string;
  stadium: string;
}

interface CardListProps {
  blocks: Block[];
  removeBlock: (id: number) => void;
  updateBlock: (id: number, updatedBlock: Partial<Block>) => void;
}

const CardList: React.FC<CardListProps> = ({
  blocks,
  removeBlock,
  updateBlock,
}) => {
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedBlock, setEditedBlock] = useState<Partial<Block>>({});
  const [sortedBlocks, setSortedBlocks] = useState<Block[]>(blocks);

  useEffect(() => {
    setSortedBlocks(blocks);
  }, [blocks]);

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
    const updatedBlocks = sortedBlocks.map((block) =>
      block.id === id ? { ...block, ...editedBlock } : block
    );
    setSortedBlocks(updatedBlocks);
    setEditMode(null);
  };

  const sortByTickets = () => {
    const sorted = [...sortedBlocks].sort(
      (a, b) => parseInt(a.tickets) - parseInt(b.tickets)
    );
    setSortedBlocks(sorted);
  };

  const sortByFirstTeamLetter = () => {
    const sorted = [...sortedBlocks].sort((a, b) =>
      a.firstTeam.localeCompare(b.firstTeam)
    );
    setSortedBlocks(sorted);
  };

  const sortBySecondTeamLetter = () => {
    const sorted = [...sortedBlocks].sort((a, b) =>
      a.secondTeam.localeCompare(b.secondTeam)
    );
    setSortedBlocks(sorted);
  };

  return (
    <Box
      sx={{
        mt: theme.spacing(20),
        "@media screen and (max-width: 770px)": {
          ml: "auto",
          mr: "auto",
          mt: theme.spacing(5),
        },
      }}
    >
      <Button
        onClick={sortByTickets}
        sx={{ height: theme.spacing(8), marginBottom: theme.spacing(1) }}
      >
        Sort by tickets
      </Button>
      <Button
        onClick={sortByFirstTeamLetter}
        sx={{
          height: theme.spacing(8),
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          marginBottom: theme.spacing(1),
        }}
      >
        Sort by 1st Team
      </Button>
      <Button
        onClick={sortBySecondTeamLetter}
        sx={{ height: theme.spacing(8), marginBottom: theme.spacing(1) }}
      >
        Sort by 2nd Team
      </Button>
      <Box
        sx={{
          marginTop: theme.spacing(1.5),
          overflow: "auto",
          maxHeight: "70vh",
          padding: theme.spacing(5),
        }}
      >
        {sortedBlocks.map((block) => (
          <Grid
            key={block.id}
            sx={{
              paddingLeft: theme.spacing(6),
              paddingRight: theme.spacing(6),
              display: "flex",
              flexDirection: "column",
              borderRadius: theme.spacing(6),
              width: "auto",
              height: "auto",
              backgroundColor: "primary.main",
              boxShadow: 5,
              marginTop: theme.spacing(2),
              textAlign: "center",
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
                <TextField
                  value={editedBlock.firstTeam || ""}
                  variant="standard"
                  onChange={(e) => handleChange("firstTeam", e.target.value)}
                  sx={{
                    width: "70%",
                    fontFamily: "Platypi",
                    fontSize: theme.spacing(3),
                    marginTop: theme.spacing(2),
                    marginLeft: theme.spacing(5),
                    marginRight: 0,
                  }}
                />
                <TextField
                  value={editedBlock.secondTeam || ""}
                  variant="standard"
                  onChange={(e) => handleChange("secondTeam", e.target.value)}
                  sx={{
                    width: "70%",
                    fontFamily: "Platypi",
                    fontSize: theme.spacing(3),
                    marginTop: theme.spacing(2),
                    marginLeft: theme.spacing(5),
                    marginRight: 0,
                  }}
                />
                <TextField
                  value={editedBlock.tickets || ""}
                  variant="standard"
                  onChange={(e) => handleChange("tickets", e.target.value)}
                  sx={{
                    width: "70%",
                    fontFamily: "Platypi",
                    fontSize: theme.spacing(3),
                    marginTop: theme.spacing(2),
                    marginLeft: theme.spacing(5),
                    marginRight: 0,
                  }}
                />
                <TextField
                  value={editedBlock.stadium || ""}
                  variant="standard"
                  onChange={(e) => handleChange("stadium", e.target.value)}
                  sx={{
                    width: "70%",
                    fontFamily: "Platypi",
                    fontSize: theme.spacing(3),
                    marginTop: theme.spacing(2),
                    marginLeft: theme.spacing(5),
                    marginRight: 0,
                  }}
                />
                <Button
                  onClick={() => handleSave(block.id)}
                  sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: theme.spacing(3),
                    marginBottom: theme.spacing(3),
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
                <Typography
                  sx={{
                    fontFamily: "Platypi",
                    fontSize: theme.spacing(3),
                    marginTop: theme.spacing(2),
                  }}
                >
                  {block.firstTeam} - {block.secondTeam}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Platypi",
                    fontSize: theme.spacing(3),
                    marginTop: theme.spacing(2),
                  }}
                >
                  Number of tickets - "{block.tickets}"
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Platypi",
                    fontSize: theme.spacing(3),
                    marginTop: theme.spacing(2),
                  }}
                >
                  Field - "{block.stadium}"
                </Typography>
                <Button
                  onClick={() => handleEdit(block.id, block)}
                  sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: theme.spacing(3),
                    marginBottom: theme.spacing(3),
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => removeBlock(block.id)}
                  sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(3),
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default CardList;
