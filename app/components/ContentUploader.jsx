"use client";
import React, { useState } from "react";
import { FileInput, Label, Progress } from "flowbite-react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import ClickAwayListener from "@mui/material/ClickAwayListener"; // used to close pop up modal when clicked outside of it
import Button from "@mui/material/Button";

// pop up modal
function Modal({ children, showModal, setShowModal }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ClickAwayListener onClickAway={() => setShowModal(false)}>
        <div className="relative bg-white space-y-2 dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => setShowModal(false)}
          >
            <CloseIcon />
          </button>
          {children}
        </div>
      </ClickAwayListener>
    </div>
  );
}

function FileUploader({
  onFileSelect,
  selectedFile,
  uploadProgress,
  uploadStatus,
}) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  // got this below code from flowbite react docs
  return (
    <div className="w-full">
      {selectedFile ? (
        <div className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-700">
          <p className="text-sm text-gray-900 dark:text-white">
            <strong>File:</strong> {selectedFile.name} (
            {(selectedFile.size / 1024).toFixed(2)} KB)
          </p>
          {uploadStatus === "uploading" && (
            <Progress
              className="mt-2"
              progress={uploadProgress}
              color="blue"
              label={`${uploadProgress}%`}
            />
          )}
          {uploadStatus === "success" && (
            <p className="mt-2 text-green-600 dark:text-green-400">
              Upload complete!
            </p>
          )}
          {uploadStatus === "error" && (
            <p className="mt-2 text-red-600 dark:text-red-400">
              Upload failed. Please try again.
            </p>
          )}
        </div>
      ) : (
        <Label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-48 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            onChange={handleFileChange} // Attach the file change handler
          />
        </Label>
      )}
    </div>
  );
}

function ContentUploader({ showModal, setShowModal }) {
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
    }
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Generate flashcards in seconds
      </h1>
      {selectedFile == null && (
        <TextField
          id="outlined-link-input"
          label="Enter link"
          type="link"
          variant="outlined"
          onChange={(e) => setLink(e.target.value)}
          className="w-full"
        />
      )}
      <FileUploader
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        uploadProgress={uploadProgress}
        uploadStatus={uploadStatus}
      />
      {(link.length > 0 || selectedFile) && (
        <Button variant="contained" color="success" onClick={handleUpload}>
          Generate
        </Button>
      )}
    </Modal>
  );
}

export default ContentUploader;
