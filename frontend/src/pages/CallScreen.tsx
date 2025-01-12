import { useState } from 'react';

type CallData = {
  phonenum: number;
  onHangUp?: () => void;
  scamCheckResult?: {
    is_scam: boolean;
  };
};

const CallScreen: React.FC<CallData> = ({phonenum, onHangUp, scamCheckResult}) => {
  let body;
  const [ignoreScam, setIgnoreScam] = useState(false);

  if (scamCheckResult?.is_scam && !ignoreScam) {
    body = (<div className="flex flex-col gap-6">
      <div className="p-6 mt-4 max-w-sm mx-auto bg-red-300 border-4 border-red-600 rounded-xl shadow-lg flex items-center">
        <div>
          <div className="text-3xl font-medium text-black">Uwaga!</div>
          <p className="text-xl text-slate-800 mt-1">Niezaufany rozmówca używa podejrzanych słów.
            To może być próba oszustwa. Wyciszono mikrofon</p>
        </div>
      </div>
      <div className="text-xl text-black text-center">Czy chcesz kontynuować rozmowę?</div>
      <div className="flex-auto flex space-x-4 font-semibold mx-auto">
        <button onClick={() => setIgnoreScam(true)} className="h-40 px-4 rounded-md border border-red-700 text-red-700 hover:bg-red-900 hover:text-white shadow-lg" type="button">
          TAK. Kontynuuj
        </button>
        <button onClick={() => {if (onHangUp)onHangUp(); setIgnoreScam(false)}} className="h-40 px-4 rounded-md border border-green-700 text-green-700 hover:bg-green-900 hover:text-white shadow-lg" type="button">
          NIE. Rozłącz się
        </button>
      </div>
    </div>)
  } else {
    body = (
      <div className="flex flex-col gap-6 justify-start">
        <div className="p-6 mt-4 max-w-sm mx-auto bg-yellow-300 border-4 border-yellow-600 rounded-xl shadow-lg flex items-center">
          <div>
            <div className="text-3xl font-medium text-black">Ostrzeżenie!</div>
            <p className="text-xl text-slate-800 mt-1">Tego numeru nie ma w twojej skrzynce telefonicznej. To może być oszust. Zachowaj czujność.</p>
          </div>
        </div>
        <div className="flex-auto flex space-x-4 font-semibold mx-auto mt-4">
          <button className="h-40 px-4 rounded-md border border-slate-600 text-black hover:bg-slate-900 hover:text-white shadow-lg" type="submit">
            Dołącz kontakt: Syn
          </button>
          <button onClick={onHangUp} className="h-40 px-4 rounded-md border border-red-700 text-red-700 hover:bg-red-900 hover:text-white shadow-lg" type="button">
            Rozłącz się
          </button>
          <button onClick={onHangUp} className="h-40 px-4 rounded-md border border-slate-600 text-black hover:bg-slate-900 hover:text-white shadow-lg" type="submit">
            Zgłoś numer i zablokuj
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-4 mt-3">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-3xl">
          00:20
        </p>
        <p className="text-5xl font-bold">
          {phonenum}
        </p>
        <p className="text-3xl">
          Niezaufany numer
        </p>
      </div>
      {body}
    </div>
  );
};

export default CallScreen;
export type { CallData };
