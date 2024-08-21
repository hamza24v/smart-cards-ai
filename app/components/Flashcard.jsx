import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Flashcard = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className="relative w-full max-w-sm mx-auto perspective"
      onClick={handleFlip}
    >
      <div
        className={`relative  transition-transform transform-style-3d duration-500 ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="inset-0 backface-hidden flex items-center justify-center bg-green-100 dark:bg-gray-700 rounded-lg p-4">
          <Card className="h-64 w-full">
            <CardContent className="flex items-center justify-center h-full">
              <Typography variant="h5" component="div">
                {frontContent}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center bg-green-100 dark:bg-gray-600 rounded-lg p-4">
          <Card className="h-64 w-full">
            <CardContent className="flex items-center justify-center h-full">
              <Typography variant="h5" component="div">
                {backContent}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
