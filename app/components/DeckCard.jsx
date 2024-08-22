import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const DeckCard = ({ deck, handleDelete }) => {
  const router = useRouter();

  return (
    <Card className="max-w-sm mx-auto my-4">
      <CardContent>
        <Typography variant="h5" component="div">
          {deck.title}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={deck.progress || 0}
          className="my-4"
        />
        <div className="flex sm:flex-row flex-col justify-between ">
          <Button
            variant="contained"
            color="success"
            onClick={() => router.push('/study/' + deck.id)}
          >
            Start Studying
          </Button>

            <IconButton aria-label="edit">
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDelete(deck.id)}>
              <Delete />
            </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeckCard;
