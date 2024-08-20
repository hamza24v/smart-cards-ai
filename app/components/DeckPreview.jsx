import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

// pop up modal
function Modal({ children, showModal, setShowModal }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white h-auto dark:bg-gray-800 rounded-2xl p-4 w-1/2">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={() => setShowModal(false)}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}
function DeckPreview({ showModal, setShowModal, deck, signedIn }) {
  const [flippedStates, setFlippedStates] = useState(
    Array(deck.cards.length).fill(false)
  );
  const handleSaveDeck = () => {
    console.log("Deck saved!");
    setShowModal(false);
  };

  const handleFlip = (index) => {
    setFlippedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  if (!deck || !deck.cards) {
    return null;
  }
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        {deck.title || "Untitled Deck"}
      </h1>
      <div className="space-y-6 overflow-y-auto overflow-x-hidden max-h-96 pr-4">
        {deck.cards.map((card, idx) => (
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
                <p className="text-lg text-center font-semibold text-gray-700 dark:text-white">
                  {card.front || "No content"}
                </p>
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-lg p-4">
                <p className="text-lg font-semibold text-gray-700 dark:text-white">
                  {card.back || "No content"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative bottom-0 mt-3 bg-white border-gray-300 w-full flex justify-center">
        <Button variant="contained" color="success" onClick={handleSaveDeck} className="w-full">
          {signedIn ? "Save Deck" : "Sign in to save"}
        </Button>
      </div>
    </Modal>
  );
}

export default DeckPreview;
