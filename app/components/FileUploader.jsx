import React from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { FileInput, Label } from "flowbite-react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CloseIcon from '@mui/icons-material/Close';

function FileUploader({ onFileSelect, selectedFile }) {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-1/2 h-1/2">
      {selectedFile ? (
        <div className="flex flex-row items-center p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 border-green-500">
          <InsertDriveFileOutlinedIcon />
          <div className="flex flex-col ml-5 flex-grow">
            <p className="text-md text-gray-900 dark:text-white">
              <strong>{selectedFile.name}</strong>
            </p>
            <p className='text-gray-400 font-mono'>{(selectedFile.size / 1024).toFixed(2)} KB</p>
          </div>
          <div className="ml-auto cursor-pointer"> <CloseIcon onClick={() => onFileSelect(null)}/></div>
        </div>
      ) : (
        <Label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-48 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudUploadOutlinedIcon className="text-4xl text-green-500 dark:text" />
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
            onChange={handleFileChange}
          />
        </Label>
      )}
    </div>
  );
}

export default FileUploader;
