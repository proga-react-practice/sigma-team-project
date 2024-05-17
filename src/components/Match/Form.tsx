import React from 'react';
import {
  Button,
  MenuItem,
  Grid,
  TextField,
  Box,
  FormHelperText,
} from '@mui/material';
import { theme } from '../../utils/theme-2';
import GroupsIcon from '@mui/icons-material/Groups';
import StadiumIcon from '@mui/icons-material/Stadium';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useFormContext } from './FormContext';

const Form: React.FC = () => {
  const { addBlock } = useFormContext();
  const { register, reset, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormValues>();

  type FormValues = {
    firstTeam: string;
    secondTeam: string;
    numberOfTickets: number;
    stadium: string;
  };

  const onSubmit = (data: FormValues) => {
    addBlock({
      id: Date.now(),
      firstTeam: data.firstTeam,
      secondTeam: data.secondTeam,
      tickets: data.numberOfTickets.toString(),
      stadium: data.stadium,
    });
    reset();
    setValue('stadium', '');
  };

  const handleReset = () => {
    reset();
    setValue('stadium', '');
  };

  const firstTeamValue = watch('firstTeam');
  const secondTeamValue = watch('secondTeam');
  const numberOfTicketsValue = watch('numberOfTickets');
  const stadiumValue = watch('stadium');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginLeft: theme.spacing(2),
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset}
        noValidate
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <GroupsIcon sx={{ color: 'action.active', mb: theme.spacing(2) }} />
          <TextField
            id="firstTeam"
            label="First Team:"
            variant="standard"
            type="text"
            placeholder="Enter first team.."
            {...register('firstTeam', {
              required: { value: true, message: 'Input cannot be empty!' },
              minLength: { value: 5, message: 'Minimum length is 5 characters!' },
              maxLength: { value: 30, message: 'Maximum length is 30 characters!' },
              pattern: { value: /^[a-zA-Z\s]+$/, message: 'Only letters and spaces are allowed!' },
            })}
            value={firstTeamValue || ''}
            onChange={(e) => setValue('firstTeam', e.target.value)}
            error={!!errors.firstTeam}
          />
        </Box>
        <FormHelperText error={!!errors.firstTeam}>
          {errors.firstTeam && errors.firstTeam.message}
        </FormHelperText>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <GroupsIcon sx={{ color: 'action.active', mb: theme.spacing(2) }} />
          <TextField
            id="secondTeam"
            label="Second Team:"
            variant="standard"
            type="text"
            placeholder="Enter second team.."
            {...register('secondTeam', {
              required: { value: true, message: 'Input cannot be empty!' },
              minLength: { value: 5, message: 'Minimum length is 5 characters!' },
              maxLength: { value: 30, message: 'Maximum length is 30 characters!' },
              pattern: { value: /^[a-zA-Z\s]+$/, message: 'Only letters and spaces are allowed!' },
            })}
            value={secondTeamValue || ''}
            onChange={(e) => setValue('secondTeam', e.target.value)}
            error={!!errors.secondTeam}
          />
        </Box>
        <FormHelperText error={!!errors.secondTeam}>
          {errors.secondTeam && errors.secondTeam.message}
        </FormHelperText>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <ReceiptIcon sx={{ color: 'action.active', mb: theme.spacing(2) }} />
          <TextField
            id="numberOfTickets"
            label="Tickets:"
            variant="standard"
            type="number"
            placeholder="Enter the quantity of tickets..."
            {...register('numberOfTickets', {
              required: { value: true, message: 'Input cannot be empty!' },
              max: { value: 300000, message: 'Maximum number of tickets is 300000!' },
              validate: { positiveNumber: (value) => value >= 0 || 'Value must be a positive number!' },
            })}
            value={numberOfTicketsValue || ''}
            onChange={(e) => setValue('numberOfTickets', parseInt(e.target.value))}
            error={!!errors.numberOfTickets}
          />
        </Box>
        <FormHelperText error={!!errors.numberOfTickets}>
          {errors.numberOfTickets && errors.numberOfTickets.message}
        </FormHelperText>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <StadiumIcon sx={{ color: 'action.active', mb: theme.spacing(2) }} />
          <TextField
            id="stadium"
            select
            label="Stadium:"
            variant="standard"
            placeholder="Please, choose the stadium..."
            {...register('stadium', {
              required: { value: true, message: 'Please, select an option!' },
            })}
            value={stadiumValue || ''}
            onChange={(e) => setValue('stadium', e.target.value)}
            error={!!errors.stadium}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Parc des Princes">Parc des Princes</MenuItem>
            <MenuItem value="Camp Nou">Camp Nou</MenuItem>
          </TextField>
        </Box>
        <FormHelperText error={!!errors.stadium}>
          {errors.stadium && errors.stadium.message}
        </FormHelperText>

        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Button type="reset" variant="outlined" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            <span className="button-content">Add</span>
          </Button>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default Form;
