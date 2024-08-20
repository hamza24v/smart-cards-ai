import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
  return (
    <p className="flex text-2xl justify-center items-center min-h-screen">
      <CircularProgress size={20} thickness={5} className="text-green-500 mr-2" />
      Loading...
    </p>
  );
}

export default Loading;
