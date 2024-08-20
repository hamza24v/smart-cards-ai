"use client";
import React from "react";
import DeckCard from "./DeckCard";
import { useDecks } from "../contexts/DecksContext";
import { useRouter } from "next/navigation";

const DeckGrid = () => {
  const { decks } = useDecks();
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
      <div className="flex items-center justify-center border-2 cursor-pointer border-dashed border-gray-400 rounded-lg p-4">
        <button
          className="text-gray-600 text-xl"
          onClick={router.push("/generate")}
        >
          + Add New Deck
        </button>
      </div>
    </div>
  );
};

export default DeckGrid;
