import Menu from "../components/Chats/Menu";
import BottomNavBar from "../components/shared/BottomNavBar/BottomNavBar";
import Chat from "../components/Chats/Chat";
import { useEffect, useState } from "react";
import ChatForm from "../components/Chats/ChatForm";
import { getChats } from "../utils/apiUtils";
import { ChatCategory } from "../utils/typeUtils";

type Chat = {
  id: number;
  owner_id: number;
  image_url: "";
  created_at: "";
};

const Chats = () => {
  const [chatCat, setChatCat] = useState<ChatCategory>("Public");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [chats, setChats] = useState<[] | Chat[]>([]);
  const addChatOnClick = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getChats();
      console.log(response.data.resources);
      setChats(response.data.resources);
    };

    fetchData();
  }, []);

  return (
    <>
      {showForm && <ChatForm addChatOnClick={addChatOnClick} />}
      <div className="bg-slate-200 h-full w-full">
        <Menu addChatOnClick={addChatOnClick} setChatCat={setChatCat} />

        {/* MENU - Public / Private / Hidden / Muted */}
        <div className="flex justify-center w-full py-4 text-lg font-semibold">
          <p>{chatCat} chats</p>
        </div>
        <div className="flex flex-col gap-4">
          {chats.map((chat) => {
            return (
              <Chat key={chat.id} chatImg={chat.image_url} chatId={chat.id} />
            );
          })}
        </div>
        <div className="h-20"></div>

        <BottomNavBar />
      </div>
    </>
  );
};
export default Chats;
