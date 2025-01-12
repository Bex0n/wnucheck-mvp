import { Geist, Geist_Mono } from "next/font/google";
import SmartPhone from "@/pages/Smartphone";
import IncomingCallScreen from "./IncomingCallScreen";
import { useState } from 'react';
import NewMessagePopup from "./NewMessagePopup";
import ChatWindow from "./ChatWindow";
import HomeScreen from "./HomeScreen";
import CallScreen, { CallData } from "./CallScreen";
import DialKeypad from "./DialKeypad";
import AudioInput from "./AudioInput";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [screenType, setScreenType] = useState("homescreen");
  const [popup, setPopup] = useState(null);
  const [incomingNumber, setIncomingNumber] = useState(213721372);
  const [checkResult, setCheckResult] = useState(null);

  const incomingCallCallback = (data: CallData) => {
    setScreenType("incomingcall");
    setIncomingNumber(data.phonenum);
  }
  const setCallScreen = () => {
    setScreenType("call");
  }
  const setHomeScreen = () => {
    setScreenType("homescreen");
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="grid grid-cols-3 gap-8 row-start-2 items-start w-full">
        <div className="col-span-1 flex flex-col gap-8 border-2 border-red-500 rounded-lg p-4 bg-gray-100 shadow-lg">
          <div className="text-xl font-semibold text-center text-gray-700 mb-4">
            Centrum skamera
          </div>

          <div className="flex flex-col gap-8">
            <ChatWindow onChatMessage={setPopup} />
            {screenType !== "call" && <DialKeypad onCallPress={incomingCallCallback} />}
            {screenType === "call" && <AudioInput phoneNumber={incomingNumber} callType={"???"} callerId={"???"} onCheckResult={setCheckResult}/>}
          </div>
        </div>

        <div className="col-span-1 flex flex-col items-center gap-8">
          <SmartPhone popup=
            {popup != null && (<NewMessagePopup dismiss={() => setPopup(null)} data={popup} />)}
          >
            {screenType === "incomingcall" && <IncomingCallScreen phoneNumber={incomingNumber} onAnswerCall={setCallScreen} onDenyCall={setHomeScreen}/>}
            {screenType === "call" && <CallScreen phonenum={incomingNumber} scamCheckResult={checkResult} onHangUp={setHomeScreen}/>}
            {screenType === "homescreen" && <HomeScreen />}
          </SmartPhone>
        </div>

      </main>
    </div>
  );
}

