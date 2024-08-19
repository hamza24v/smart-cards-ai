"use client";
import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Generate() {
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  let source;
  if (link) source = link;
  else if (selectedFile) source = selectedFile;

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleGeneration = (content) => {
    console.log("source: ", content)
    // api logic 
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-5">
      <h1 className="text-5xl font-serif font-bold text-green-500 mb-10">
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
          onChange={(e) => setLink(e.target.value)}
          className="w-1/2"
        />
      )}

      {(link.length > 0 || selectedFile) && (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleGeneration(source)}
        >
          Generate
        </Button>
      )}
    </div>
  );
}

export default Generate;
