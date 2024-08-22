import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <CircularProgress sx={{ color: "#4CAF50" }} />
      <Typography variant="h6" sx={{ mt: 2, color: "#4CAF50" }}>
        Loading...
      </Typography>
    </div>
  );
}

export default Loading;
