const DialKeypad: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md">
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }, (_, i) => (
                <button
                  key={i + 1}
                  className="w-16 h-16 bg-white rounded-full text-xl font-bold shadow hover:bg-gray-300"
                >
                  {i + 1}
                </button>
              ))}
              <div className="w-16 h-16"></div>
              <button className="w-16 h-16 bg-white rounded-full text-xl font-bold shadow hover:bg-gray-300">
                0
              </button>
              <div className="w-16 h-16"></div>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-800">
              Call
            </button>
          </div>
  );
};

export default DialKeypad;
