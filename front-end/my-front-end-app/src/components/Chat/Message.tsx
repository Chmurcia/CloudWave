import { useEffect, useState } from "react";
import { getUserById } from "../../utils/apiUtils";

type MessageProps = {
  message: string;
  imageUrl: string;
  my: boolean;
  senderId: number;
};

const Message = ({ message, imageUrl, my, senderId }: MessageProps) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserById(Number(senderId));
      console.log(response);
      setName(response.username);
    };
    fetchData();
  }, [senderId]);
  return (
    <div
      className={
        my
          ? "flex justify-end items-start gap-2"
          : "flex justify-start items-start gap-2"
      }
    >
      {my ? (
        <>
          <div className="flex flex-col items-end">
            <p className="text-xs font-semibold w-40 break-words text-end">
              {name}
            </p>
            <div className="bg-slate-50 w-40 rounded-md px-1">
              <p className="text-sm break-words">{message}</p>
            </div>
          </div>
          <div className="bg-slate-900 h-10 rounded-full aspect-square">
            {imageUrl}
          </div>
        </>
      ) : (
        <>
          <div className="bg-slate-900 h-10 rounded-full aspect-square">
            {imageUrl}
          </div>
          <div>
            <p className="text-xs font-semibold w-40 break-words text-start">
              {name}
            </p>
            <div className="bg-slate-50 w-40 rounded-md px-1">
              <p className="text-sm break-words">{message}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Message;
