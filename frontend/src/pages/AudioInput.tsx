import React, { useState, useRef } from "react";
import axios from "axios";

type AudioInputProps = {
  phoneNumber: string;
  callType: string;
  callerId: string;
};

const AudioInput: React.FC<AudioInputProps> = ({ phoneNumber: phone_number, callType: call_type, callerId: caller_id, onCheckResult }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const mediaRecorderRef = useRef(null); // Use ref to persist mediaRecorder state
  const audioChunks = useRef([]); // To store audio chunks during recording

  // Start recording
  const startRecording = async () => {
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
          setAudioBlob(audioBlob);
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
  const sendAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.mp3");

    try {
      setIsLoading(true);

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
      setResponse(res.data);
    } catch (error) {
      console.error("Error uploading audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  onCheckResult(response);

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

      {audioBlob && !isLoading && (
        <div>
          <button onClick={sendAudio}>Send Audio for Check</button>
        </div>
      )}

      {isLoading && <p>Uploading...</p>}

      {response && (
        <div>
          <h3>Reputation Check Result</h3>
          <p><strong>Is Scam:</strong> {response.is_scam ? "Yes" : "No"}</p>
          <p><strong>Reputation Score:</strong> {response.reputation_score}</p>
          <p><strong>Reported Count:</strong> {response.reported_count}</p>
          <p><strong>Last Reported:</strong> {response.last_reported}</p>
        </div>
      )}
    </div>
  );
};

export default AudioInput;
