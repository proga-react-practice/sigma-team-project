import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { useFormContext } from './Match/FormContext';

interface MatchModalProps {
  open: boolean;
  onClose: () => void;
  stadiumId: string;
}

const MatchModal: React.FC<MatchModalProps> = ({ open, onClose, stadiumId }) => {
    const { blocks } = useFormContext();

    const matchingCards = blocks.filter((block) => block.stadiumId === stadiumId);
  
    return (
      <Modal
        open={open}
        onClose={onClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography  variant="h6" component="h2">
            Match Cards
          </Typography>
          {matchingCards.map((card) => (
            <Box key={card.id}>

              <Typography>{card.firstTeam} vs {card.secondTeam}</Typography>
              <Typography>Tickets: {card.tickets}</Typography>
              <Typography>Stadium: {card.stadium}</Typography>

            </Box>
          ))}
        </Box>
      </Modal>
    );
  };
  
  export default MatchModal;