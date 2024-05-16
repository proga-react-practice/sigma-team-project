import React, { useState, useEffect } from "react";
import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Form from "./Form";
import CardList from "./CardList";
import CustomLoader from "./CustomLoader";
import { theme } from "../../utils/theme-2";

interface Block {
  id: number;
  firstTeam: string;
  secondTeam: string;
  tickets: string;
  stadium: string;
}

const Container: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const addButtonHandler = (block: Block) => {
    setBlocks([...blocks, block]);
    setIsVisible(true);
  };

  const removeBlock = (id: number) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const updateBlock = (id: number, updatedBlock: Partial<Block>) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, ...updatedBlock } : block
      )
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedBlocks = Array.from(blocks);
    const [removed] = reorderedBlocks.splice(result.source.index, 1);
    reorderedBlocks.splice(result.destination.index, 0, removed);

    setBlocks(reorderedBlocks);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {loading ? (
          <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
             alignItems: 'center'
          }}>
            <CustomLoader />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: theme.spacing(5),
              justifyContent: "center",
              "@media screen and (max-width: 770px)": {
                flexDirection: "column",
              },
            }}
          >
            <Grid
              sx={{
                mt: theme.spacing(20),
                py: theme.spacing(8),
                px: theme.spacing(5),
                borderRadius: theme.spacing(8),
                maxHeight: "490px",
                "@media screen and (max-width: 426px)": {
                  pl: theme.spacing(2),
                  pr: theme.spacing(2),
                },
                backgroundColor: theme.palette.primary.main,
                boxShadow: 5,
                color: "secondary.main",
              }}
            >
              <Typography
                sx={{
                  marginBottom: theme.spacing(3),
                  fontSize: theme.spacing(5),
                  fontFamily: "Platypi",
                  fontWeight: 600,
                  color: theme.palette.secondary.main,
                  textAlign: "center",
                  "@media screen and (max-width: 426px)": {
                    fontSize: theme.spacing(4),
                  },
                }}
              >
                Football Match Form
              </Typography>
              <Form addButtonHandler={addButtonHandler} />
            </Grid>
            <DragDropContext onDragEnd={handleDragEnd}>
              {isVisible && (
                <CardList
                  blocks={blocks}
                  removeBlock={removeBlock}
                  updateBlock={updateBlock}
                />
              )}
            </DragDropContext>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
};

export default Container;
