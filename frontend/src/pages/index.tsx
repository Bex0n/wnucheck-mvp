import { Geist, Geist_Mono } from "next/font/google";
import SmartPhone from "@/pages/Smartphone"
import IncomingCallScreen from "./IncomingCallScreen";
import { useState } from 'react';
import NewMessagePopup from "./NewMessagePopup";
import ChatWindow from "./ChatWindow";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [getScreenType, setScreenType] = useState("homescreen");

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ChatWindow />
        {/* not intended to be left this way, just collecting these phone layouts in one place */}
        <SmartPhone popup={(<NewMessagePopup />)}>
          <IncomingCallScreen />
        </SmartPhone>
        <SmartPhone>
          <NewMessagePopup />
        </SmartPhone>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
