import React, { useState } from 'react';
import { Box, Grid, Typography } from "@mui/material";
import Form from "./Form";
import CardList from "./CardList";
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

  const addButtonHandler = (block: Block) => {
    setBlocks([...blocks, block]);
    setIsVisible(true);
  };

  const removeBlock = (id: number) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };
  return (
    <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: theme.spacing(5),
            "@media screen and (max-width: 770px)": {
              flexDirection: "column",
            },
          }}
        >
          <Grid
            sx={{
              mt: theme.spacing(20),
              paddingTop: theme.spacing(10),
              paddingBottom: theme.spacing(8),
              paddingLeft: theme.spacing(5),
              paddingRight: theme.spacing(5),
              borderRadius: theme.spacing(8),
              "@media screen and (max-width: 426px)": {
                pl: theme.spacing(2),
                pr: theme.spacing(2)
              },
              backgroundColor: "primary.main",
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
                "@media screen and (max-width: 426px)": {
                  fontSize: theme.spacing(4),
                },
              }}
            >
              Football Match Form
            </Typography>
            <Form addButtonHandler={addButtonHandler} />
          </Grid>
          {isVisible && <CardList blocks={blocks} removeBlock={removeBlock} />}
        </Box>
    </>
  );
};

export default Container;