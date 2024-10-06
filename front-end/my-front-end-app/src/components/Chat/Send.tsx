import React, { SetStateAction } from "react";
import { IoMdSend } from "react-icons/io";

type SendProps = {
  message: string;
  setMessage: React.Dispatch<SetStateAction<string>>;
  onSend: () => void;
};

const Send = ({ message, setMessage, onSend }: SendProps) => {
  return (
    <div className="flex mb-20 gap-4 ">
      <input
        className="flex-1 rounded-xl h-10 px-2 "
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={onSend} className="flex justify-center items-center ">
        <IoMdSend size={30} />
      </button>
    </div>
  );
};

export default Send;
