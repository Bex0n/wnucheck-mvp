import { Geist, Geist_Mono } from "next/font/google";
import SmartPhone from "@/pages/Smartphone";
import IncomingCallScreen from "./IncomingCallScreen";
import { useState } from 'react';
import NewMessagePopup, { PopupData } from "./NewMessagePopup";
import ChatWindow from "./ChatWindow";
import HomeScreen from "./HomeScreen";
import CallScreen from "./CallScreen";
import DialKeypad from "./DialKeypad";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [screenType, setScreenType] = useState("incomingcall");
  const [popup, setPopup] = useState(null);

  const samplePopupData: PopupData = {
    title: "Nowa wiadomość",
    warningTitle: "Uwaga!",
    warningContent: "Numer nadawcy jest niezaufany. To może być próba oszustwa",
    messageTitle: "213 721 372",
    messageContent: "Hej dziadku, tu wnuczek pilnie potrzebuje pieniedzy przekazesz mi 2000zl prosze????!!",
  };
 
  const incomingCallCallback = () => {
    setScreenType("incomingcall");
  }
  const answerCallCallback = () => {
    setScreenType("call");
  }
  const denyCallCallback = () => {
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
	    <DialKeypad onCallPress={incomingCallCallback} />
	  </div>
	</div>

	<div className="col-span-1 flex flex-col items-center gap-8">
        	<SmartPhone popup=
        	  {popup != null && (<NewMessagePopup dismiss={()=>setPopup(null)} data={popup}/>)}
        	  >
        	{screenType === "incomingcall" && <IncomingCallScreen onAnswerCall={answerCallCallback} onDenyCall={denyCallCallback}/>}
        	{screenType === "call" && <CallScreen />}
        	{screenType === "homescreen" && <HomeScreen />}
        	</SmartPhone>
        	<SmartPhone>
        	  <NewMessagePopup data={samplePopupData}/>
        	</SmartPhone>
	</div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}

