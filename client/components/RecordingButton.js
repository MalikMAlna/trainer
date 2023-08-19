import { useState } from "react";
import Image from "next/image"; // Import the NextImage component
import recordingIcon from "../public/images/recording-icon.svg";

const RecordingButton = ({ onStartRecording, onStopRecording }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleTouchStart = () => {
    setIsRecording(true);
    onStartRecording();
  };

  const handleTouchEnd = () => {
    setIsRecording(false);
    onStopRecording();
  };
  console.log("is reacording", isRecording);
  return (
    <div
      style={{
        width: "16rem",
        height: "16rem",
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
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: isRecording ? "#B91C1C" : "#EF4444", // Adjusted colors
          border: "none",
          borderRadius: "50%",
          animation: isRecording ? "blink 1s linear infinite" : "none", // Added animation
        }}
      />
      {isRecording ? (
        <p>Recording in process...</p>
      ) : (
        <p>Press and hold to record</p>
      )}
    </div>
  );
};

export default RecordingButton;
