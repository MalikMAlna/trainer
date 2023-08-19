import RecordingButton from "../components/RecordingButton";
import { useState } from "react";
const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Logic when recording starts
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Logic when recording stops

     setRecordings([...recordings, newRecording]);
  };

  const handleSendRecording = (recordingsToSend) => {
    // Logic to send recordings to an external API
    console.log('Sending recordings:', recordingsToSend);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: "1rem" }}>
          <RecordingButton
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        </div>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {isRecording ? "Recording in progress..." : "Not recording"}
        </p>
        {recordings.length > 0 && (
          <SendRecordingButton
            recordings={recordings}
            onSendRecording={handleSendRecording}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
