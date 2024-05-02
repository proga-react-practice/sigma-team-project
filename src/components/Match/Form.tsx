import React, { useEffect, useState } from "react";
import "./component styles/Form.css";
import {
  Button,
  Typography,
  MenuItem,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import { theme } from "../../utils/theme-2";
import GroupsIcon from "@mui/icons-material/Groups";
import StadiumIcon from "@mui/icons-material/Stadium";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FormGroup from "@mui/material/FormGroup";

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

const Form: React.FC<FormProps> = ({ addButtonHandler }) => {
  const [formState, setFormState] = useState({
    firstTeam: "",
    secondTeam: "",
    tickets: "",
    stadium: "",
    firstTeamDirty: false,
    secondTeamDirty: false,
    ticketsDirty: false,
    stadiumDirty: false,
    firstTeamError: "Input can not be empty!",
    secondTeamError: "Input can not be empty!",
    ticketsError: "Input can not be empty!",
    stadiumError: "Input can not be empty!",
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const { firstTeamError, secondTeamError, ticketsError, stadiumError } =
      formState;
    if (firstTeamError || secondTeamError || ticketsError || stadiumError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [formState]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "tickets" && parseInt(value) < 0) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
        [`${name}Dirty`]: true,
        [`${name}Error`]: "Quantity of tickets cannot be negative!",
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
        [`${name}Dirty`]: true,
        [`${name}Error`]: value ? "" : "Input can not be empty!",
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [`${name}Dirty`]: true,
      [`${name}Error`]: value ? "" : "Input can not be empty!",
    }));
  };

  const resetHandler = () => {
    setFormState({
      firstTeam: "",
      secondTeam: "",
      tickets: "",
      stadium: "",
      firstTeamDirty: false,
      secondTeamDirty: false,
      ticketsDirty: false,
      stadiumDirty: false,
      firstTeamError: "Input can not be empty!",
      secondTeamError: "Input can not be empty!",
      ticketsError: "Input can not be empty!",
      stadiumError: "Input can not be empty!",
    });
  };

  const handleAddButtonClick = () => {
    const { firstTeam, secondTeam, tickets, stadium } = formState;
    if (formValid) {
      addButtonHandler({
        id: Date.now(),
        firstTeam,
        secondTeam,
        tickets,
        stadium,
      });
      resetHandler();
    }
  };

  return (
    <FormGroup
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        maxHeight: '500px'
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
          onChange={(e) => handleInputChange(e)}
          onBlur={(e) => handleBlur(e)}
          value={formState.firstTeam}
          name="firstTeam"
          type="text"
          placeholder="Enter first team..."
        />
      </Box>
      {formState.firstTeamDirty && formState.firstTeamError && (
        <Typography
          sx={{
            color: theme.palette.error.light,
            fontWeight: "bold",
            fontFamily: "Forum",
            fontSize: theme.spacing(2.9),
          }}
        >
          {formState.firstTeamError}
        </Typography>
      )}
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
          onChange={(e) => handleInputChange(e)}
          onBlur={(e) => handleBlur(e)}
          value={formState.secondTeam}
          name="secondTeam"
          type="text"
          className="input"
          placeholder="Enter second team..."
        />
      </Box>
      {formState.secondTeamDirty && formState.secondTeamError && (
        <Typography
          sx={{
            color: theme.palette.error.light,
            fontWeight: "bold",
            fontFamily: "Forum",
            fontSize: theme.spacing(2.9),
          }}
        >
          {formState.secondTeamError}
        </Typography>
      )}
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
          onChange={(e) => handleInputChange(e)}
          onBlur={(e) => handleBlur(e)}
          value={formState.tickets}
          name="tickets"
          type="number"
          className="input"
          placeholder="Enter the quantity of tickets..."
        />
      </Box>
      {formState.ticketsDirty && formState.ticketsError && (
        <Typography
          sx={{
            color: theme.palette.error.light,
            fontWeight: "bold",
            fontFamily: "Forum",
            fontSize: theme.spacing(2.9),
          }}
        >
          {formState.ticketsError}
        </Typography>
      )}
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
          onChange={(e) => handleInputChange(e)}
          onBlur={(e) => handleBlur(e)}
          value={formState.stadium}
          name="stadium"
          placeholder="Choose Stadium..."
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Parc des Princes"}>Parc des Princes</MenuItem>
          <MenuItem value={"Camp Nou"}>Camp Nou</MenuItem>
        </TextField>
      </Box>

      {formState.stadiumDirty && formState.stadiumError && (
        <Typography
          sx={{
            color: theme.palette.error.light,
            fontWeight: "bold",
            fontFamily: "Forum",
            fontSize: theme.spacing(2.9),
          }}
        >
          {formState.stadiumError}
        </Typography>
      )}
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Button type="reset" variant="outlined" onClick={resetHandler}>
          Reset
        </Button>
        <Button
          type="button"
          disabled={!formValid}
          onClick={handleAddButtonClick}
        >
          <span className="button-content">Add</span>
        </Button>
      </Grid>
    </FormGroup>
  );
};

export default Form;