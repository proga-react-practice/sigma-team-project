import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";
import EditableTextField from "./EditableTextField";
import { useFormContext } from "./FormContext"; // Importing the context hook

const deleteAnimationClass = "delete-animation";

interface Block {
  id: number;
  firstTeam: string;
  secondTeam: string;
  tickets: string;
  stadium: string;
}

const CardList: React.FC = () => {
  const theme = useTheme();
  const { blocks, removeBlock, updateBlock } = useFormContext();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedBlock, setEditedBlock] = useState<Partial<Block>>({});
  const [sortedBlocks, setSortedBlocks] = useState<Block[]>(blocks);
  const [, setDeletingId] = useState<number | null>(null);

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

  const handleDelete = (id: number) => {
    setDeletingId(id);
    const card = document.getElementById(`card-${id}`);
    if (card) {
      card.classList.add(deleteAnimationClass);
    }
    setTimeout(() => {
      removeBlock(id);
    }, 300);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(sortedBlocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSortedBlocks(items);
  };

  return (
    <>
      {sortedBlocks.length === 0 ? null : (
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
          <Box
            sx={{
              width: "70%",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={sortByTickets}
              sx={{
                borderRadius: theme.spacing(1),
                fontSize: theme.spacing(2.4),
                marginBottom: theme.spacing(1),
                marginTop: theme.spacing(4),
                height: '100%',
                width: '100%',
                mb: theme.spacing(4),
              }}
            >
              Sort by tickets
            </Button>
            <Button
              variant="outlined"
              onClick={sortByFirstTeamLetter}
              sx={{
                borderRadius: theme.spacing(1),
                fontSize: theme.spacing(2.4),
                marginTop: theme.spacing(4),
                height: '100%',
                width: '100%',
                mb: theme.spacing(4),
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                marginBottom: theme.spacing(1),
              }}
            >
              Sort by 1st Team
            </Button>
            <Button
              variant="outlined"
              onClick={sortBySecondTeamLetter}
              sx={{
                borderRadius: theme.spacing(1),
                fontSize: theme.spacing(2.4),
                marginBottom: theme.spacing(1),
                marginTop: theme.spacing(4),
                height: '100%',
                width: '100%',
                mb: theme.spacing(4),
              }}
            >
              Sort by 2nd Team
            </Button>
          </Box>
          <Box
            sx={{
              marginTop: theme.spacing(1.5),
              maxHeight: "100%",
              padding: theme.spacing(5),
              borderRadius: theme.spacing(2),
              backgroundImage: "",
              WebkitOverflowScrolling: "touch",
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                width: theme.spacing(2),
                display: "none",
              },
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: theme.spacing(2),
              "@media screen and (max-width: 770px)": {
                flexDirection: "column",
              },
            }}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: theme.spacing(2),
                      width: "100%",
                      maxWidth: "calc(100% - 10px)",
                      "@media screen and (max-width: 770px)": {
                        flexDirection: "column",
                      },
                    }}
                  >
                    {sortedBlocks.map((block, index) => (
                      <Draggable
                        key={block.id}
                        draggableId={`draggable-${block.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              flex: "1 1 calc(33.333% - 16px)",
                              boxSizing: "border-box",
                              maxWidth: "calc(33.333% - 16px)",
                              minWidth: "250px",
                              margin: "0 auto",
                            }}
                          >
                            <Grid
                              key={block.id}
                              id={`card-${block.id}`}
                              sx={{
                                paddingLeft: theme.spacing(6),
                                paddingRight: theme.spacing(6),
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: theme.spacing(6),
                                width: "100%",
                                boxShadow: 5,
                                marginTop: theme.spacing(2),
                                textAlign: "center",
                                backgroundColor:
                                  theme.palette.custom.cardBackground,
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
                                    onChange={(value) =>
                                      handleChange("firstTeam", value)
                                    }
                                  />
                                  <EditableTextField
                                    value={editedBlock.secondTeam || ""}
                                    label="Second Team"
                                    onChange={(value) =>
                                      handleChange("secondTeam", value)
                                    }
                                  />
                                  <EditableTextField
                                    value={editedBlock.tickets || ""}
                                    label="Number of Tickets"
                                    onChange={(value) =>
                                      handleChange("tickets", value)
                                    }
                                  />
                                  <EditableTextField
                                    value={editedBlock.stadium || ""}
                                    label="Stadium"
                                    onChange={(value) =>
                                      handleChange("stadium", value)
                                    }
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
                                  <Typography
                                    sx={{
                                      marginTop: theme.spacing(2),
                                    }}
                                  >
                                    {block.firstTeam} - {block.secondTeam}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      marginTop: theme.spacing(2),
                                    }}
                                  >
                                    Number of tickets: {block.tickets}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      marginTop: theme.spacing(2),
                                    }}
                                  >
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
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CardList;
