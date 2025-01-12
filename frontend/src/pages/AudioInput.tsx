import React, { useState, useRef } from "react";
import axios from "axios";

type AudioInputProps = {
  phoneNumber: number;
  callType: string;
  callerId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCheckResult: (result: any) => void;
};

const AudioInput: React.FC<AudioInputProps> = ({ phoneNumber: phone_number, callType: call_type, callerId: caller_id, onCheckResult }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef : React.RefObject<MediaRecorder | null> = useRef(null); // Use ref to persist mediaRecorder state
  const audioChunks : React.RefObject<Blob[]> = useRef([]); // To store audio chunks during recording

  // Start recording
  const startRecording = async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices) {
      console.error("MediaDevices API not available");
      return;
    }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder; // Store mediaRecorder in ref

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
          sendAudio(audioBlob);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing the microphone:", err);
      }
    }
  };

  // Stop recording
  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    } else {
      console.error("MediaRecorder is not initialized.");
    }
  };

  // Send audio to the server
  const sendAudio = async (audioBlob:Blob) => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.mp3");

    try {
      setIsLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/phone-call-check", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          phone_number: phone_number,
          call_type: call_type,
          caller_id: caller_id,
        }
      });
      onCheckResult(res.data);
    } catch (error) {
      console.error("Error uploading audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Phone Reputation Check</h2>
      <div>
        {!isRecording ? (
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-800"
            onClick={startRecording}>Start Recording</button>
        ) : (
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-800"
            onClick={stopRecording}>Stop Recording</button>
        )}
      </div>

      {isLoading && <p>Uploading...</p>}
    </div>
  );
};

export default AudioInput;
