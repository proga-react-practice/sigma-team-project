import React from "react";
import {
  Button,
  MenuItem,
  Grid,
  TextField,
  Box,
  FormHelperText,
} from "@mui/material";
import { theme } from "../../utils/theme-2";
import GroupsIcon from "@mui/icons-material/Groups";
import StadiumIcon from "@mui/icons-material/Stadium";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FormGroup from "@mui/material/FormGroup";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface FormProps {
  addButtonHandler: (block: Block) => void;
}

interface Block {
  id: number;
  firstTeam: string;
  secondTeam: string;
  tickets: string;
  stadium: string;
}

const Form: React.FC<FormProps> = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  type FormValues = {
    firstTeam: string;
    secondTeam: string;
    numberOfTickets: number;
    stadium: string;
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  return (
    <>
      <FormGroup
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          maxHeight: "500px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <GroupsIcon
            sx={{
              color: "action.active",
              mb: theme.spacing(2),
            }}
          />
          <TextField
            id="firstTeam"
            label="First Team:"
            variant="standard"
            type="text"
            placeholder="Enter first team..."
            {...register("firstTeam", {
              required: {
                value: true,
                message: "Input cannot be empty!",
              },
            })}
            error={!!errors.firstTeam}
          />
        </Box>
        <FormHelperText error={!!errors.firstTeam}>
          {errors.firstTeam && errors.firstTeam.message}
        </FormHelperText>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <GroupsIcon
            sx={{
              color: "action.active",
              mb: theme.spacing(2),
            }}
          />
          <TextField
            id="secondTeam"
            label="Second Team:"
            variant="standard"
            type="text"
            placeholder="Enter second team..."
            {...register("secondTeam", {
              required: {
                value: true,
                message: "Input cannot be empty!",
              },
            })}
            error={!!errors.secondTeam}
          />
        </Box>
        <FormHelperText error={!!errors.secondTeam}>
          {errors.secondTeam && errors.secondTeam.message}
        </FormHelperText>
        

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <ReceiptIcon
            sx={{
              color: "action.active",
              mb: theme.spacing(2),
            }}
          />
          <TextField
            id="numberOfTickets"
            label="Tickets:"
            variant="standard"
            type="number"
            placeholder="Enter the quantity of tickets..."
            {...register("numberOfTickets", {
              required: {
                value: true,
                message: "Input cannot be empty!",
              },
            })}
            error={!!errors.numberOfTickets}
          />
        </Box>
        <FormHelperText error={!!errors.numberOfTickets}>
          {errors.numberOfTickets && errors.numberOfTickets.message}
        </FormHelperText>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <StadiumIcon
            sx={{
              color: "action.active",
              mb: theme.spacing(2),
            }}
          />
          <TextField
            id="stadium"
            select
            label="Stadium:"
            variant="standard"
            placeholder="Choose Stadium..."
            {...register("stadium", {
              required: {
                value: true,
                message: "Please, select an option!",
              },
            })}
            error={!!errors.stadium}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Parc des Princes"}>Parc des Princes</MenuItem>
            <MenuItem value={"Camp Nou"}>Camp Nou</MenuItem>
          </TextField>
        </Box>
        <FormHelperText error={!!errors.stadium}>
          {errors.stadium && errors.stadium.message}
        </FormHelperText>

        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button type="reset" variant="outlined">
            Reset
          </Button>
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            <span className="button-content">Add</span>
          </Button>
        </Grid>
      </FormGroup>
      <DevTool control={control} />
    </>
  );
};

export default Form;
