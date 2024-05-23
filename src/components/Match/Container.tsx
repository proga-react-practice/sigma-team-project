import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Form from "./Form";
import CardList from "./CardList";
import CustomLoader from "./CustomLoader";
import { useFormContext } from './FormContext';
import {useTheme} from "@mui/material";



const Container: React.FC = () => {
  const { blocks } = useFormContext();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CustomLoader />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: theme.spacing(5),
            justifyContent: 'center',
            '@media screen and (max-width: 770px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Grid
            sx={{
              mt: theme.spacing(20),
              py: theme.spacing(8),
              px: theme.spacing(5),
              borderRadius: theme.spacing(2),
              '@media screen and (max-width: 426px)': {
                pl: theme.spacing(2),
                pr: theme.spacing(2),
              },
              boxShadow: 5,
              height: 'fit-content',
              border: `2px solid ${theme.palette.custom.cardBackground}`,

            }}
          >
            <Typography
              sx={{
                marginBottom: theme.spacing(3),
                fontSize: theme.spacing(5),
                fontFamily: 'Platypi',
                fontWeight: 600,
                textAlign: 'center',
                '@media screen and (max-width: 426px)': {
                  fontSize: theme.spacing(4),
                },
              }}
            >
              Football Match Form
            </Typography>
            <Form />
          </Grid>
          {blocks.length > 0 && (
            <CardList />
          )}
        </Box>
      )}
      </>
  );
};

export default Container;
