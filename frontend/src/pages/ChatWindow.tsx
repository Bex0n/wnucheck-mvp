// components/ChatWindow.tsx

import { useState } from "react";
import { PopupData } from "./NewMessagePopup";
import axios from "axios";

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
      detectedScam: false,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/message-content-check", {
            content: inputValue,  
            message_type: "SMS",
            sender_email: ""
          
          });
      messagePopupData.detectedScam = response.data.is_scam
      messagePopupData.warningTitle = response.data.is_scam ? "Uwaga!" : "Ostrzeżenie";
      messagePopupData.warningContent = response.data.is_scam
        ? "Wiadomość wykryta jako niebezpieczna. To może być próba oszustwa"
        : "Numer nadawcy jest niezaufany. Bądź czujny";
    } catch (error) {
      console.error("Request failed:", error);
    }

    onChatMessage(messagePopupData);
    setInputValue("");
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Type your scam to send here..."
      />
      <button
        onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800"
      >
        Send
      </button>
    </div>
  );
};

export default ChatWindow;
