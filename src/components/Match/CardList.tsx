import React from "react";
import {
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { theme } from '../../utils/theme-2'

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
}

const CardList: React.FC<CardListProps> = ({ blocks, removeBlock }) => {
  return (
      <Box
        sx={{mt: theme.spacing(20),
          "@media screen and (max-width: 770px)": {
            ml: 'auto',
            mr: 'auto',
            mt: theme.spacing(5),
          },
        }}
      >
        {blocks.map((block) => (
          <Grid
            key={block.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: theme.spacing(6),
              width: theme.spacing(70),
              backgroundColor: "primary.main",
              boxShadow: 5,
              marginTop: theme.spacing(2),
              "@media screen and (max-width: 426px)": {
                width: theme.spacing(40),
              },
            }}
          >
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
              onClick={() => removeBlock(block.id)}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(3)
              }}
            >
              Delete
            </Button>
          </Grid>
        ))}
      </Box>
  );
};

export default CardList;