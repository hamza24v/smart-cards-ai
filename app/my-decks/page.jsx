import React from 'react';
import DeckGrid from '../components/DeckGrid';

const MyDecks = () => {
  return (
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold text-center mb-8">My Decks</h1>
        <DeckGrid />
      </div>
  );
};

export default MyDecks;
