"use client";
import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeckPreview from "../components/DeckPreview";
import { useUser } from "@clerk/clerk-react";
import { flashcards } from "../constants";

function Generate() {
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const { isSignedIn } = useUser();


  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setLink("");
  };

  const handleGeneration = (content) => {
    console.log("source: ", content);
    setShowCards(true);
    // api logic
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

      <div className="mt-4">
        <Button
          variant="contained"
          color="success"
          onClick={() => handleGeneration(link || selectedFile)}
          style={{ visibility: showGenerateButton ? "visible" : "hidden" }}
        >
          Generate
        </Button>
      </div>
      {showCards && (
        <DeckPreview
          showModal={showCards}
          setShowModal={setShowCards}
          deck={flashcards}
          signedIn={isSignedIn}
        />
      )}
    </div>
  );
}

export default Generate;
