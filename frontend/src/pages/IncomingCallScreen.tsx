// components/IncomingCallScreen.tsx

type IncomingCallScreenProps = {
  onAnswerCall: () => void; // Callback for answering the call
  onDenyCall: () => void; // Callback for denying the call
};

const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({ onAnswerCall, onDenyCall }) => {
  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-5xl font-bold">
          213 721 372
        </p>
        <p className="text-3xl">
          Niezaufany numer dzwoni do ciebie
        </p>
      </div>
      <div className="p-6 max-w-sm mx-auto bg-yellow-300 border-4 border-yellow-600 rounded-xl shadow-lg flex items-center">
        <div>
          <div className="text-3xl font-medium text-black">Ostrzeżenie!</div>
          <p className="text-xl text-slate-800 mt-1">Tego numeru nie ma w twojej skrzynce telefonicznej. To może być oszust. Zachowaj czujność.</p>
        </div>
      </div>
      <div className="flex-auto flex space-x-4">
        <button onClick={onAnswerCall} className="h-40 px-10 font-semibold rounded-md bg-slate-600 text-white hover:bg-slate-900 shadow-lg" type="submit">
          Odbierz
        </button>
        <button onClick={onDenyCall} className="h-40 px-10 font-semibold rounded-md border border-red-700 text-red-700 hover:bg-red-900 hover:text-white shadow-lg" type="button">
          Odrzuć
        </button>
      </div>
    </div>
  );
};

export default IncomingCallScreen;
