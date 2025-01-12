import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import SmartPhone from "@/pages/Smartphone";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-row gap-8 row-start-2 items-start sm:items-start">
        {/* Simple Chat Window */}
        <div className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col gap-2 overflow-y-auto max-h-64">
            <div className="self-start bg-blue-100 p-3 rounded-lg text-black">
            </div>
            <div className="self-end bg-gray-200 p-3 rounded-lg text-black">
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Type your scam here..."
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800"
            >
              Send
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 items-center sm:items-start">
          {/* Not intended to be left this way, just collecting these phone layouts in one place */}
          <SmartPhone>
            <div className="flex p-4 flex-col items-center gap-10">
              <div className="items-center gap-10">
                <p className="text-5xl font-bold text-center mt-4">213 721 372</p>
                <p className="text-3xl text-center mt-4">Niezaufany numer</p>
              </div>
              <div className="p-6 max-w-sm my-3 mx-auto bg-red-500 rounded-xl shadow-lg flex items-center gap-x-4">
                <div>
                  <div className="text-3xl font-medium text-black">Uwaga!</div>
                  <p className="text-xl text-slate-800 mt-1">
                    Tego numeru nie ma w twojej skrzynce telefonicznej. To może być oszust
                  </p>
                </div>
              </div>
              <div className="flex-auto flex space-x-4">
                <button
                  className="h-40 px-10 font-semibold rounded-md bg-slate-600 text-white hover:bg-slate-900"
                  type="submit"
                >
                  Odbierz
                </button>
                <button
                  className="h-40 px-10 font-semibold rounded-md border border-red-700 text-red-700 hover:bg-red-900 hover:text-white"
                  type="button"
                >
                  Odrzuć
                </button>
              </div>
            </div>
          </SmartPhone>
          <SmartPhone>
            <div className="flex p-4 flex-col items-center gap-10">
              <div className="m-2 max-w-sm mx-auto rounded-xl shadow-lg flex items-center grid divide-y border border-red-700">
                <div className="p-4 font-medium text-black text-xl">Nowa wiadomość</div>
                <div className="p-4 bg-red-500 flex items-center gap-x-4">
                  <div>
                    <div className="text-2xl font-medium text-black">Uwaga!</div>
                    <p className="text-slate-800">
                      Numer nadawcy jest niezaufany. To może być próba oszustwa
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xl font-medium text-black">213 721 372</div>
                  <p className="text-slate-500">
                    Hej dziadku, tu wnuczek pilnie potrzebuje pieniedzy przekazesz mi 2000zl prosze????!!
                  </p>
                </div>
              </div>
            </div>
          </SmartPhone>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
