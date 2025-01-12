import { Geist, Geist_Mono } from "next/font/google";
import SmartPhone from "@/pages/Smartphone"
import IncomingCallScreen from "./IncomingCallScreen";
import { useState } from 'react';
import NewMessagePopup, { PopupData } from "./NewMessagePopup";
import ChatWindow from "./ChatWindow";
import HomeScreen from "./HomeScreen";
import CallScreen from "./CallScreen";



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
 
  const answerCallCallback = () => {
    setScreenType("call");
  }
  const denyCallCallback = () => {
    setScreenType("homescreen");
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ChatWindow onChatMessage={setPopup}/>
        {/* not intended to be left this way, just collecting these phone layouts in one place */}
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
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
