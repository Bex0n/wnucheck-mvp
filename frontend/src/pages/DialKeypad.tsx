import { useState } from "react";
import { CallData } from "./CallScreen";

type DialKeypadProps = {
  onCallPress: (callData: CallData) => void;
};

const DialKeypad: React.FC<DialKeypadProps> = ({ onCallPress }) => {
  // State to hold the current input
  const [input, setInput] = useState<string>("");

  // Function to handle number button click
  const handleNumberClick = (number: string) => {
    setInput((prevInput) => prevInput + number);
  };

  // Function to handle backspace button click
  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  // Function to handle the call button press
  const sendCall = async () => {
    const callData: CallData = {
      phonenum: parseInt(input), // Convert the input string to a number
    };
    onCallPress(callData);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md">
      {/* Input display window */}
      <div className="w-full mb-4 p-4 bg-white rounded-lg text-xl font-bold text-center shadow-md">
        {input || "Enter number"}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handleNumberClick((i + 1).toString())}
            className="w-16 h-16 bg-white rounded-full text-xl font-bold shadow hover:bg-gray-300"
          >
            {i + 1}
          </button>
        ))}
        {/* Backspace Button */}
        <button
          onClick={handleBackspace}
          className="w-16 h-16 bg-red-600 rounded-full text-xl font-bold text-white shadow hover:bg-red-700"
        >
          ←
        </button>
        <button
          onClick={() => handleNumberClick("0")}
          className="w-16 h-16 bg-white rounded-full text-xl font-bold shadow hover:bg-gray-300"
        >
          0
        </button>
        <div className="w-16 h-16"></div>
      </div>

      {/* Call Button */}
      <button
        onClick={sendCall}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-800"
      >
        Call
      </button>
    </div>
  );
};

export default DialKeypad;
