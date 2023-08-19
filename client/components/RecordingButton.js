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

  return (
    <div className="w-16 h-16 mx-auto">
      <button
        className={`w-full h-full ${isRecording ? "bg-red-700" : "bg-red-500"}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
      >
        {isRecording ? (
          <div className="animate-pulse absolute w-full h-full">
            <Image
              src={recordingIcon}
              alt="Recording Icon"
              width={48}
              height={48}
              className="w-full h-full"
            />
          </div>
        ) : (
          // Render the SVG or icon of your choice for the non-recording state
          <Image
            src={recordingIcon}
            alt="Recording Icon"
            width={48}
            height={48}
            className="w-full h-full"
          />
        )}
      </button>
    </div>
  );
};

export default RecordingButton;
