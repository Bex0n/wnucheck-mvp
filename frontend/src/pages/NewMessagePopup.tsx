// components/NewMessagePopup.tsx

const NewMessagePopup: React.FC = () => {
  return (
    <div className="flex p-4 flex-col items-center gap-10">
      <div className="m-2 max-w-sm mx-auto rounded-xl shadow-lg flex items-center grid divide-y border border-red-700">
        <div className="p-4 font-medium text-black text-xl"> Nowa wiadomość</div>
        <div className="p-4 bg-red-500 flex items-center gap-x-4">
          <div>
            <div className="text-2xl font-medium text-black">Uwaga!</div>
            <p className="text-slate-800">Numer nadawcy jest niezaufany. To może być próba oszustwa</p>
          </div>
        </div>
        <div className="p-4">
          <div className="text-xl font-medium text-black">213 721 372</div>
          <p className="text-slate-500">Hej dziadku, tu wnuczek pilnie potrzebuje pieniedzy przekazesz mi 2000zl prosze????!!</p>
        </div>
      </div>
    </div>
  );
};

export default NewMessagePopup;
