import RecordingButton from "../components/RecordingButton";
import { useState, useEffect } from "react";

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [microphoneAccessGranted, setMicrophoneAccessGranted] = useState(false);

  // useEffect(() => {
  //   const requestMicrophoneAccess = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         audio: true,
  //       });
  //       setMicrophoneAccessGranted(true);
  //       stream.getTracks().forEach((track) => track.stop()); // Close the stream
  //     } catch (error) {
  //       console.error("Microphone access denied:", error);
  //     }
  //   };

  //   requestMicrophoneAccess();
  // }, []);

  // let mediaRecorder;
  // let audioStream;

  const handleStartRecording = async () => {
    // try {
    //   audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //   mediaRecorder = new MediaRecorder(audioStream);
    //   mediaRecorder.ondataavailable = (event) => {
    //     if (event.data.size > 0) {
    //       setRecordedChunks([...recordedChunks, event.data]);
    //     }
    //   };
    //   mediaRecorder.start();
    //   setIsRecording(true);
    // } catch (error) {
    //   console.error("Error starting recording:", error);
    // }
    setIsRecording(true)
    // Logic when recording starts
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Logic when recording stops

    // console.log("recordingChunks", recordedChunks);
  };

  const handleSendRecording = (recordingsToSend) => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
  };

  const saveRecording = () => {
    const audioBlob = new Blob(recordedChunks, { type: "audio/wav" });
    // Store audioBlob in state or send to API
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
      {/* {microphoneAccessGranted ? ( */}
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
          {/* <button
            style={{
              backgroundColor: recordedChunks.length ? "#10B981" : "#D1D5DB",
              color: "white",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              border: "none",
              borderRadius: "0.25rem",
              cursor: recordedChunks.length ? "pointer" : "not-allowed",
              transition:
                "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
            }}
            onClick={saveRecording}
            disabled={!recordedChunks.length}
          >
            Save Recording
          </button> */}
        </div>
      {/* ) : (
        <p>
          Microphone access not granted. Please allow microphone access to use
          this feature.
        </p>
      )} */}
    </div>
  );
};

export default Home;
