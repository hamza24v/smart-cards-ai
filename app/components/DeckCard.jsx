import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Button, IconButton } from '@mui/material';
import { Edit, Delete, Share } from '@mui/icons-material';
import { useDecks } from '../contexts/DecksContext';

const DeckCard = ({ deck }) => {
  const { deleteDeck } = useDecks();

  const handleDelete = () => {
    deleteDeck(deck.id);
  };

  return (
    <Card className="max-w-sm mx-auto my-4">
      <CardContent>
        <Typography variant="h5" component="div">
          {deck.title}
        </Typography>
        <LinearProgress variant="determinate" value={deck.progress || 0} className="my-4" />
        <div className="flex justify-between">
          <Button variant="contained" color="success">Start Studying</Button>
          <div>
            <IconButton aria-label="edit">
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <Delete />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeckCard;
