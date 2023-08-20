"use client";

import RecordingButton from "../components/RecordingButton";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

interface HomeProps {
  talkId: string;
}

export default function Home({ talkId }: HomeProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [videoLink, setVideoLink] = useState(null);

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
  };

  return (
    <div className="flex-col flex items-center justify-center h-screen relative bg-white">
      <header className="text-center mb-8 flex-col items-center justify-center">
        <h1 className="text-3xl font-medium text-gray-700">trAIner</h1>
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Record your workout instructions with trAIner. Your virutal AI
          personal trainer.
        </p>
      </header>
      {videoLink && (
        <div className="p-2">
          <ReactPlayer width="530px" height="300px" url={videoLink} playing />
        </div>
      )}
      <div className="text-center">
        <div className="mb-4">
          <RecordingButton
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            isRecording={isRecording}
          />
        </div>
        <p className="text-xl font-medium text-gray-700">
          {isRecording ? "Recording in progress..." : "Not recording"}
        </p>
      </div>
    </div>
  );
}
