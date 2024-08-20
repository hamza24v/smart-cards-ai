import React, { createContext, useState, useEffect } from 'react';
import { db } from './firebase'; 
import { doc, setDoc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";

import { useUser } from "@clerk/clerk-react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [decks, setDecks] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        if(user) {
            fetchDecks(user.email)
        }
    }, [user]);
    
    const fetchDecks = async (userEmail) => {
        if (!userEmail) return;
        const userDecksQuery = query(collection(db, 'decks'), where('userEmail', '==', userEmail));
        const querySnapshot = await getDocs(userDecksQuery);
        setDecks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    
    const addDeck = async (deck) => {
        if (!user) return;
        const userDecksRef = doc(collection(db, "decks"));
        await setDoc(userDecksRef, {
            ...deck,
            userEmail: user.email,
            createdAt: new Date(),
        });
        fetchDecks(user.email);
    };

    const deleteDeck = async (id) => {
        if (!user) return;
        await await deleteDoc(doc(db, "decks", id))
        fetchDecks(user.email);
    };

    return (
        <CardContext.Provider value={{ decks, addDeck, deleteDeck }}>
            {children}
        </CardContext.Provider>
    );
};
