import RecordingButton from '../components/RecordingButton';

const Home = () => {
  const handleStartRecording = () => {
    // You can add your logic here when recording starts
  };

  const handleStopRecording = () => {
    // You can add your logic here when recording stops
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <div className="mb-4">
          <RecordingButton
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        </div>
        {/* Other UI elements */}
      </div>
    </div>
  );
};

export default Home;
