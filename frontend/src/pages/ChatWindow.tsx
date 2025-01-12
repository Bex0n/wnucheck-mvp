// components/ChatWindow.tsx

import { useState } from "react";
import { PopupData } from "./NewMessagePopup";
import axios, { AxiosError } from "axios";

type ChatWindowProps = {
  onChatMessage: (message: PopupData) => void;
};

const ChatWindow: React.FC<ChatWindowProps> = ({onChatMessage}) => {
  const [inputValue, setInputValue] = useState("");

    // {/* Simple Chat Window */}
  const sendMessage = async () => {
    if (inputValue.trim() === "") return; // Prevent sending empty messages

    const messagePopupData: PopupData = {
      title: "Nowa wiadomość",
      warningTitle: "???",
      warningContent: "???",
      messageTitle: "213 721 372",
      messageContent: inputValue,
    };

    try {
      const response = await axios.post("/content-scam-detection", {
            content: inputValue,
          });
      messagePopupData.warningTitle = response.data.is_scam ? "Uwaga!" : "";
      messagePopupData.warningContent = response.data.is_scam
        ? "Numer nadawcy jest niezaufany. To może być próba oszustwa"
        : "";
    } catch (error: AxiosError) {
      if (error.response?.status === 404) {
        console.error("Endpoint not found:", error.response?.data);
      } else {
        console.error("Request failed:", error);
      }
    }
    
    onChatMessage(messagePopupData);
    setInputValue("");
  }
  
  return (
    <div className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow-lg max-w-md w-full">
      <div className="flex flex-col gap-2 overflow-y-auto max-h-64">
        <div className="self-start bg-blue-100 p-3 rounded-lg text-black">
        </div>
        <div className="self-end bg-gray-200 p-3 rounded-lg text-black">
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Type your scam here..."
        />
        <button
          onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
