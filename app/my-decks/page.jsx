import React from "react";
import DeckGrid from "../components/DeckGrid";

function MyDeck() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-green-500 text-center mt-28">My Decks</h1>
      <DeckGrid />
    </div>
  );
}

export default MyDeck;
