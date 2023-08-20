import clsx from "clsx";

interface ComponentProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
}

export default function RecordingButton(props: ComponentProps) {
  const { onStartRecording, onStopRecording, isRecording } = props;
  const handleTouchStart = () => {
    onStartRecording();
    // Set timeout to stop recording after 7 seconds
    setTimeout(() => {
      onStopRecording();
    }, 7000);
  };

  // const handleTouchEnd = () => {
  //   onStopRecording();
  // };

  return (
    <div className="w-16 h-16 flex items-center justify-center mx-auto flex-col">
      <button
        // onTouchStart={handleTouchStart}
        // onTouchEnd={handleTouchEnd}
        // onMouseDown={handleTouchStart}
        // onMouseUp={handleTouchEnd}
        onClick={handleTouchStart}
        className={clsx(
          "w-full h-full bg-red-500 rounded-full flex items-center justify-center cursor-pointer",
          isRecording && "bg-red-700 animate-pulse"
        )}
        // style={{
        //   width: "100%",
        //   height: "100%",
        //   border: "none",
        //   borderRadius: "50%",
        //   animation: isRecording ? "blink 1s linear infinite" : "none", // Added animation
        //   cursor: "pointer",
        // }}
      />
    </div>
  );
}
