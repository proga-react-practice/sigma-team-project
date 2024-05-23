import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";
import { useFormContext } from "./FormContext";
import Card from "./Card";

export interface Block {
  id: number;
  firstTeam: string;
  secondTeam: string;
  tickets: string;
  stadium: string;
  stadiumId: string | null;
}

const deleteAnimationClass = "delete-animation";

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
                            <Card
                              block={block}
                              editMode={editMode}
                              editedBlock={editedBlock}
                              handleChange={handleChange}
                              handleSave={handleSave}
                              handleEdit={handleEdit}
                              handleDelete={handleDelete}
                            />
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
