// components/IncomingCallScreen.tsx

const IncomingCallScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="items-center gap-10">
        <p className="text-5xl font-bold text-center mt-4">
          213 721 372
        </p>
        <p className="text-3xl text-center mt-4">
          Niezaufany numer
        </p>
      </div>
      <div className="p-6 max-w-sm my-3 mx-auto bg-red-500 rounded-xl shadow-lg flex items-center gap-x-4">
        <div>
          <div className="text-3xl font-medium text-black">Uwaga!</div>
          <p className="text-xl text-slate-800 mt-1">Tego numeru nie ma w twojej skrzynce telefonicznej. To może być oszust</p>
        </div>
      </div>
      <div className="flex-auto flex space-x-4">
        <button className="h-40 px-10 font-semibold rounded-md bg-slate-600 text-white hover:bg-slate-900" type="submit">
          Odbierz
        </button>
        <button className="h-40 px-10 font-semibold rounded-md border border-red-700 text-red-700 hover:bg-red-900 hover:text-white" type="button">
          Odrzuć
        </button>
      </div>
    </div>
  );
};

export default IncomingCallScreen;
