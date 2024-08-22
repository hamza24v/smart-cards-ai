"use client";
import React, { useState } from "react";
import DeckCard from "./DeckCard";
import { useDecks } from "../contexts/DecksContext";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

const DeckGrid = () => {
  const { decks, deleteDeck } = useDecks();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deckIdToDelete, setDeckIdToDelete] = useState(null);

  const confirmDelete = (deckId) => {
    deleteDeck(deckId);
    setShowModal(false);
  };

  const handleDelete = (deckId) => {
    setShowModal(true);
    setDeckIdToDelete(deckId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} handleDelete={handleDelete} />
      ))}
      <div
        onClick={() => router.push("/generate")}
        className="flex items-center justify-center border-2 cursor-pointer border-dashed border-gray-400 rounded-lg p-4"
      >
        <button className="text-gray-600 text-xl">+ Add New Deck</button>
      </div>
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Delete Deck
            </h2>
            <hr className="w-full border-t border-gray-300 mb-4" />
            <p className="text-md text-gray-500 mb-6 text-center">
              This action cannot be undone. Are you sure you want to delete this
              deck?
            </p>
            <div className="flex gap-4">
              <button
                className="px-6 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition duration-150"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-150"
                onClick={() => confirmDelete(deckIdToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeckGrid;
