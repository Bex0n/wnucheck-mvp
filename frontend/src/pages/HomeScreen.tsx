// components/HomeScreen.tsx

const HomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      <div className="text-6xl items-center gap-10">
        22:12
      </div>
      <div className="text-6xl items-center grid grid-cols-1 divide-y">
        {Array.from(
          ["Podlej kwiaty",
            "Zapłać rachunki",
            "Odwiedź wnuki",
          ], (v) => (
            <div className="text-3xl p-4" key={v}>
              {v}
            </div>
          ))}
      </div>
      <div className="flex-auto flex text-3xl font-semibold mx-auto mt-4 grid grid-cols-2 gap-4">
        {Array.from(
          ["Telefon", "SMS", "Radio", "Budzik"], (v) => (
            <button className="h-20 px-4 rounded-md border border-slate-600 text-black hover:bg-slate-900 hover:text-white shadow-lg" type="submit" key={v}>
              {v}
            </button>
          ))}
      </div>
    </div >
  );
};

export default HomeScreen;
