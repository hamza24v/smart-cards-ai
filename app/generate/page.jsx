"use client"
import React, { useState } from "react";
import FileUploader from '../components/FileUploader'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Generate() {
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setUploadStatus("idle");
  };

  const handleUpload = () => {
    if (selectedFile) {
      setUploadStatus("uploading");
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploadStatus("success");
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else if (link) {
      console.log("processing link...");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-5">
      <h1 className="text-5xl font-serif font-bold text-green-500 mb-10">
        Generate Flash Cards in Seconds...
      </h1>
      <FileUploader
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        uploadProgress={uploadProgress}
        uploadStatus={uploadStatus}
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
        <Button variant="contained" color="success" onClick={handleUpload}>
          Generate
        </Button>
      )}
    </div>
  );
}

export default Generate;
