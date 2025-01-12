// components/CallScreen.tsx

type CallData = {
  phonenum: number;
};

const CallScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="items-center gap-10">
        <p className="text-5xl font-bold text-center mt-4">
          213 721 372
        </p>
      </div>
    </div>
  );
};

export default CallScreen;
export type { CallData };
