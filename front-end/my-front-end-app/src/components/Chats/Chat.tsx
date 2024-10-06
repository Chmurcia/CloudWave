import { useEffect, useState } from "react";
import {
  FaQuestion,
  FaUser,
  FaUserFriends,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import {
  getChatSettingsById,
  getChatUserSettings,
  getIdFromToken,
} from "../../utils/apiUtils";
import { User } from "../../utils/typeUtils";
import { useNavigate } from "react-router-dom";

type ChatProps = {
  chatImg: string;
  chatId: number;
};

const Chat = ({ chatImg, chatId }: ChatProps) => {
  const [chatName, setChatName] = useState<string>("");
  const [role, setRole] = useState<User>("user");
  const maxLength = 30;
  let chatLastMessage = "";
  const amountOfParticipants = 0;

  const navigate = useNavigate();

  const navigateToChat = (chatId: number) => {
    navigate(`${chatId}`);
  };

  if (chatLastMessage.length > maxLength) {
    chatLastMessage = chatLastMessage.substring(0, maxLength - 3) + "...";
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getChatSettingsById(Number(chatId));
      setChatName(response.data.resources.chat_name);
      console.log(response.data.resources);

      const userId = await getIdFromToken();
      const responseCUS = await getChatUserSettings(
        Number(userId),
        Number(chatId)
      );
      setRole(responseCUS.data.resources.role);
    };

    fetchData();
  }, [chatId]);

  return (
    <div
      onClick={() => navigateToChat(chatId)}
      className="flex flex-col items-center gap-4 w-full bg-slate-300 px-4 hover:cursor-pointer"
    >
      <div className="flex w-full justify-end">
        <div>
          <p>...</p>
        </div>
      </div>
      <div className="flex w-full justify-start items-center gap-8">
        <div className="flex justify-center items-center bg-slate-500 h-20 rounded-full aspect-square">
          <p>{chatImg}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-md font-semibold">{chatName}</p>
          <p className="text-xs text-slate-500">{chatLastMessage} </p>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex gap-2 items-center">
          <FaUserFriends size={15} />
          <p className="text-slate-70">{amountOfParticipants}</p>
        </div>
        <div>
          {role === "user" ? (
            <FaUser size={20} />
          ) : role === "moderator" ? (
            <FaUserShield size={20} />
          ) : role === "owner" ? (
            <FaUserTie size={20} />
          ) : (
            <FaQuestion size={20} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
