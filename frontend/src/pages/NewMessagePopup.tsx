// components/NewMessagePopup.tsx

type PopupData = {
  title: string;
  warningTitle: string;
  warningContent: string;
  messageTitle: string;
  messageContent: string;
};



type PopupProps = {
  dismiss: () => void;
  data?: PopupData;
};


const NewMessagePopup: React.FC<PopupProps> = ({data, dismiss}) => {
  return (
    <div onClick={dismiss} className="flex p-4 flex-col items-center">
      <div className="m-2 mx-auto rounded-xl shadow-lg flex items-center grid divide-y border border-red-700 bg-white">
        <div className="p-4 font-medium text-black text-xl">{data?.title}</div>
        <div className="p-4 bg-red-500 flex items-center gap-x-4">
          <div>
            <div className="text-2xl font-medium text-black">{data?.warningTitle}</div>
            <p className="text-slate-800">{data?.warningContent}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="text-xl font-medium text-black">{data?.messageTitle}</div>
          <p className="text-slate-500 text-wrap">{data?.messageContent}</p>
        </div>
      </div>
    </div>
  );
};

export default NewMessagePopup;
export type { PopupData };
