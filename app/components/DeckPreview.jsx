import React, { useState } from "react";
import Button from "@mui/material/Button";
import { SignInButton, useUser } from "@clerk/clerk-react";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Modal from "./Modal";

function DeckPreview({ showModal, setShowModal, deck,  saveDeck }) {
  const { isSignedIn } = useUser();
  const [flippedStates, setFlippedStates] = useState(
    Array(deck.flashcards.length).fill(false)
  );

  const handleFlip = (index) => {
    setFlippedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };


  if (!deck || !deck.flashcards) {
    return null;
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Preview: {deck.title || "Untitled Deck"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-auto gap-3 overflow-y-auto overflow-x-hidden max-h-96 pr-4">
        {deck.flashcards.map((card, idx) => (
          <div
            key={idx}
            className={`relative w-full h-40 perspective`}
            onClick={() => handleFlip(idx)}
          >
            <div
              className={`absolute inset-0 transition-transform transform-style-3d duration-500 ${
                flippedStates[idx] ? "rotate-y-180" : ""
              }`}
            >
              <div className="absolute inset-0 backface-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="max-h-32 overflow-y-auto overflow-x-hidden w-full p-2">
                  <p className="text-lg text-center font-semibold text-gray-700 dark:text-white">
                    {card.front || "No content"}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-lg p-4">
                <div className="max-h-32 overflow-y-auto w-full p-2">
                  <p className="text-lg font-semibold text-gray-700 dark:text-white">
                    {card.back || "No content"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative bottom-0 mt-3 bg-white border-gray-300 w-full flex justify-center">
        {isSignedIn ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => saveDeck(deck) }
          className="w-full"
        >
          Save Deck
          <span>
            <DownloadOutlinedIcon />
          </span>
        </Button>
        ) : (
        <SignInButton>
          <Button variant="contained" color="success" className="w-full">
            Sign in to save
          </Button>
        </SignInButton>
        )}
      </div>
    </Modal>
  );
}

export default DeckPreview;
