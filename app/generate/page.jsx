"use client";
import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeckPreview from "../components/DeckPreview";
import { useDecks } from "../contexts/DeckContext";
import { toast, ToastContainer } from "react-toastify";
import { readFileAsText, isValidURL } from "../utils";
import axios from "axios";

function Generate() {
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState({ title: "", flashcards: [] });
  const [showModal, setshowModal] = useState(false);
  const { createDeck } = useDecks();
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setLink("");
  };

  const handleSaveDeck = async (deck) => {
    await createDeck({
      title: deck.title,
      cards: deck.cards.map((card) => ({
        front: card.front,
        back: card.back,
      })),
    });
    setLink("");
    toast.success("Deck saved successfully!");
    setSelectedFile(null);
    setShowModal(false);
  };

  const generateFlashcards = async (content) => {
    try {
      const response = await axios.post("/api/generate", content, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error generating flashcards:", error);
      return null;
    }
  };

  const handleGenerationClick = async (content) => {
    setLoading(true);
    let textContent;
    if (content instanceof File || content instanceof Blob) {
      textContent = await readFileAsText(content);
    } else if (typeof content === "string" && isValidURL(content)) {
      textContent = content;
    }
    if (!textContent) {
      toast.error("Please provide a valid text or link.");
      return;
    }
    const flashcardsData = await generateFlashcards(textContent);
    setDeck({
      title: flashcardsData.title,
      flashcards: flashcardsData.flashcards,
    });
    setLoading(false);
    setshowModal(true);
  };

  const showGenerateButton = link.trim().length > 0 || selectedFile !== null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl text-center font-serif font-bold text-green-500 mb-10">
        Generate Flash Cards in Seconds...
      </h1>
      <FileUploader
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
      />
      {selectedFile == null && (
        <TextField
          id="outlined-link-input"
          label="Or enter a link"
          type="link"
          variant="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-1/2"
        />
      )}

      {!loading ? (
        <div className="mt-4">
          <Button
            variant="contained"
            color="success"
            onClick={() => handleGenerationClick(link || selectedFile)}
            style={{ visibility: showGenerateButton ? "visible" : "hidden" }}
          >
            Generate
          </Button>
        </div>
      ) : (
        <button type="button" class="bg-green-500 ..." disabled>
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
          Generating...
        </button>
      )}
      {showModal && (
        <DeckPreview
          showModal={showModal}
          setShowModal={setshowModal}
          deck={deck}
          saveDeck={handleSaveDeck}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default Generate;
