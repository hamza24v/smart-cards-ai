"use client"
import React, { useState, useEffect } from 'react';
import Flashcard from '../../components/Flashcard';
import { Button } from '@mui/material';
import { useDecks } from '../../contexts/DecksContext';
import { useParams } from 'next/navigation'

const StudyDeck = () => {
  const { id } = useParams();
  const { decks } = useDecks();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deck, setDeck] = useState(null);
  useEffect(() => {
    if (id && decks.length > 0) {
      const foundDeck = decks.find((d) => d.id === id);
      setDeck(foundDeck);
    }
  }, [id, decks]);

  if (!deck) {
    return <div>Loading...</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % deck.cards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + deck.cards.length) % deck.cards.length);
  };

  const { front, back } = deck.cards[currentIndex];


  return (
    <div className="flex flex-col min-h-screen justify-center items-center container mx-auto my-8">
      <h1 className="text-3xl font-serif font-bold text-green-500 text-center mb-8">{deck.title}</h1>
      {front && back && <Flashcard frontContent={front} backContent={back} />}
      <div className="flex justify-between mt-8 w-1/4">
        <Button variant="outlined" color='success' onClick={handlePrevious} className='w-[90px]'>
          Previous
        </Button>
        <Button variant="outlined" color='success' onClick={handleNext} className='w-[90px]'>
          Next
        </Button>
      </div>
    </div>
  );
};

export default StudyDeck;
