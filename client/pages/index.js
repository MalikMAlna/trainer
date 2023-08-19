import RecordingButton from "../components/RecordingButton";

const Home = () => {
  const handleStartRecording = () => {
    // You can add your logic here when recording starts
  };

  const handleStopRecording = () => {
    // You can add your logic here when recording stops
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
      
      </div>
    </div>
  );
};

export default Home;
