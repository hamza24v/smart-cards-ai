"use client"
import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from "uuid";

export const DecksContext = createContext();

export const DecksProvider = ({ children }) => {
  const [decks, setDecks] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchDecks(user.id);
    }
  }, [user]);

  const fetchDecks = async (id) => {
    if (!user) return;
    const userDecksRef = doc(db, "decks", id);
    const decks = await getDoc(userDecksRef);
    setDecks(decks.exists ? decks.data().decks : []);
  };

  const createDeck = async (flashcards) => {
    if (!user) return;

    const userDecksRef = doc(db, "decks", user.id);
    const newDeck = { id: uuidv4(), ...flashcards };

    await setDoc(userDecksRef, { decks: arrayUnion(newDeck) }, { merge: true });
    fetchDecks(user.id);
  };

  const deleteDeck = async (id) => {
    if (!user) return;
    const userDecksRef = doc(db, "decks", user.id);
    const userDecksSnapshot = await getDoc(userDecksRef);
    
    if (userDecksSnapshot.exists()) {
      const decksData = userDecksSnapshot.data().decks || [];
      const updatedDecks = decksData.filter((deck) => deck.id !== id);
      await setDoc(userDecksRef, { decks: updatedDecks }, { merge: true });
    }
    fetchDecks(user.id);
  };

  return (
    <DecksContext.Provider value={{ decks, createDeck, deleteDeck }}>
      {children}
    </DecksContext.Provider>
  );
};

export const useDecks = () => {
  const context = useContext(DecksContext);
  if (!context) {
    throw new Error("useDecks must be used within an DecksProvider");
  }
  return context;
};
