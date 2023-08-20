import RecordingButton from "../components/RecordingButton";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import fs from "fs/promises";

export async function getServerSideProps() {
  const talkId = await fs.readFile(process.env.TALK_ID_PATH, "utf8");

  return {
    props: { talkId: talkId },
  };
}

const fallingItemsStyle = {
  position: "absolute",
  top: "-50px",
  left: "0",
  width: "100px",
  height: "100px",
  animation: "fallingAnimation 10s linear infinite",
};

const svgStyle = {
  position: "absolute",
  width: "30px",
  height: "30px",
  fill: "#808080",
};

const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "2rem",
  zIndex: "1",
};

const Home = ({ talkId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [microphoneAccessGranted, setMicrophoneAccessGranted] = useState(false);
  const [videoLink, setVideoLink] = useState(null);

  // const generateRandomPosition = () => {
  //   const randomX = Math.random() * 100;
  //   const randomY = Math.random() * 100;
  //   return { left: `${randomX}%`, top: `${randomY}%` };
  // };

  // const renderFallingItems = () => {
  //   const numItems = 10; // Adjust the number of dumbbell icons
  //   const items = [];

  //   for (let i = 0; i < numItems; i++) {
  //     const position = generateRandomPosition();
  //     items.push(
  //       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  //         <g
  //           id="SVGRepo_tracerCarrier"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //         ></g>
  //         <g id="SVGRepo_iconCarrier">
  //           {" "}
  //           <path
  //             d="M19.7781 1.39348C20.1686 1.00295 20.8018 1.00295 21.1923 1.39348L22.6066 2.80769C22.9971 3.19822 22.9971 3.83138 22.6066 4.22191C22.216 4.61243 21.5829 4.61243 21.1923 4.22191L19.7781 2.80769C19.3876 2.41717 19.3876 1.784 19.7781 1.39348Z"
  //             fill="#0F0F0F"
  //           ></path>{" "}
  //           <path
  //             d="M16.2425 2.10051C16.633 1.70999 17.2662 1.70999 17.6567 2.10051L21.8993 6.34315C22.2899 6.73368 22.2899 7.36684 21.8993 7.75736C21.5088 8.14789 20.8756 8.14789 20.4851 7.75736L16.2425 3.51472C15.852 3.1242 15.852 2.49103 16.2425 2.10051Z"
  //             fill="#0F0F0F"
  //           ></path>{" "}
  //           <path
  //             d="M16.9497 8.46463L8.46451 16.9498L10.5858 19.0711C10.9763 19.4616 10.9763 20.0948 10.5858 20.4853C10.1952 20.8758 9.56207 20.8758 9.17155 20.4853L3.5147 14.8284C3.12417 14.4379 3.12417 13.8048 3.51469 13.4142C3.90522 13.0237 4.53838 13.0237 4.92891 13.4142L7.05029 15.5356L15.5355 7.05041L13.4141 4.92903C13.0236 4.53851 13.0236 3.90534 13.4141 3.51482C13.8046 3.12429 14.4378 3.12429 14.8283 3.51482L20.4852 9.17167C20.8757 9.56219 20.8757 10.1954 20.4852 10.5859C20.0947 10.9764 19.4615 10.9764 19.071 10.5859L16.9497 8.46463Z"
  //             fill="#0F0F0F"
  //           ></path>{" "}
  //           <path
  //             d="M3.5146 16.2428C3.12408 15.8523 2.49091 15.8523 2.10039 16.2428C1.70986 16.6334 1.70986 17.2665 2.10039 17.6571L6.34303 21.8997C6.73355 22.2902 7.36672 22.2902 7.75724 21.8997C8.14777 21.5092 8.14777 20.876 7.75724 20.4855L3.5146 16.2428Z"
  //             fill="#0F0F0F"
  //           ></path>{" "}
  //           <path
  //             d="M2.80757 19.7782C2.41705 19.3877 1.78388 19.3877 1.39336 19.7782C1.00283 20.1688 1.00283 20.8019 1.39336 21.1925L2.80757 22.6067C3.1981 22.9972 3.83126 22.9972 4.22178 22.6067C4.61231 22.2161 4.61231 21.583 4.22178 21.1925L2.80757 19.7782Z"
  //             fill="#0F0F0F"
  //           ></path>{" "}
  //         </g>
  //       </svg>
  //     );
  //   }

  //   return items;
  // };

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
    setVideoLink(null);
    setIsRecording(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/get_talk_id", {
        mode: "cors",
      });

      if (!res.ok) {
        throw new Error("error with d-id api");
      }
      const resultUrlRes = await res.json();
      console.log("result_url", resultUrlRes);

      setVideoLink(resultUrlRes["result_url"]);
    } catch (e) {
      console.error(e);
    }
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
    }
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
  };

  // const saveRecording = () => {
  //   const audioBlob = new Blob(recordedChunks, { type: "audio/wav" });
  //   // Store audioBlob in state or send to API
  // };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          // zIndex: "-1",
        }}
      >
        <div style={fallingItemsStyle}>
          Add your SVGs for falling barbells and weights here
          {renderFallingItems()}
          Add more SVG elements for different barbells and weights
        </div>
      </div> */}
      <header style={headerStyle}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>trAIner</h1>
        <p style={{ color: "#666", marginTop: "0.5rem", fontSize: "1.2rem" }}>
          Record your workout instructions with trAIner. Your virutal AI
          personal trainer.
        </p>
      </header>
      {videoLink && (
        <div style={{ padding: "8px" }}>
          <ReactPlayer width="530px" height="300px" url={videoLink} playing />
        </div>
      )}
      {/* {microphoneAccessGranted ? ( */}
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: "1rem" }}>
          <RecordingButton
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            isRecording={isRecording}
          />
        </div>
        <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
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
