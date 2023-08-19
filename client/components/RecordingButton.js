import { useState } from "react";
import Image from "next/image"; // Import the NextImage component

const RecordingButton = ({
  onStartRecording,
  onStopRecording,
  isRecording,
}) => {
  const handleTouchStart = () => {
    onStartRecording();
  };

  const handleTouchEnd = () => {
    onStopRecording();
  };

  return (
    <div
      style={{
        width: "4rem",
        height: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        flexDirection: "column",
      }}
    >
      <button
        // onTouchStart={handleTouchStart}
        // onTouchEnd={handleTouchEnd}
        // onMouseDown={handleTouchStart}
        // onMouseUp={handleTouchEnd}
        onClick={handleTouchStart}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: isRecording ? "#B91C1C" : "#EF4444", // Adjusted colors
          border: "none",
          borderRadius: "50%",
          animation: isRecording ? "blink 1s linear infinite" : "none", // Added animation
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default RecordingButton;
