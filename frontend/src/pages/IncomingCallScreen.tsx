// components/IncomingCallScreen.tsx

type IncomingCallScreenProps = {
  onAnswerCall: () => void; // Callback for answering the call
  onDenyCall: () => void; // Callback for denying the call
  phoneNumber: number; // Phone number of the incoming call
};

const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({ onAnswerCall, onDenyCall, phoneNumber }) => {
  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-5xl font-bold">
          {phoneNumber}
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
      <div className="flex space-x-4 text-3xl font-bold">
        <button onClick={onAnswerCall} className="h-40 p-4 font-bold border border-black rounded-md shadow-lg hover:bg-gray-300" type="submit">
          Odbierz
        </button>
        <button onClick={onDenyCall} className="font-semibold p-4 rounded-md border border-black shadow-lg hover:bg-gray-300" type="button">
          Odrzuć
        </button>
      </div>
    </div>
  );
};

export default IncomingCallScreen;
