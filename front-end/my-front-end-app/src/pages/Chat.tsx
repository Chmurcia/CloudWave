import { useParams } from "react-router-dom";
import BottomNavBar from "../components/shared/BottomNavBar/BottomNavBar";
import Send from "../components/Chat/Send";
import { useEffect, useState } from "react";
import Message from "../components/Chat/Message";
import {
  createMessage,
  getIdFromToken,
  getMessagesById,
} from "../utils/apiUtils";
import { Message as MessageType } from "../utils/typeUtils";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[] | []>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { chatId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getIdFromToken();
      setUserId(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const messages = await getMessagesById(Number(chatId));
      setMessages(messages.data.resources);
    };
    fetchData();
  }, [chatId]);

  const onSend = async () => {
    await createMessage(Number(userId), Number(chatId), message);
    setMessage("");
  };
  console.log(chatId + " " + userId);
  return (
    <div className=" bg-slate-300 w-full h-full">
      <div className="flex flex-col justify-end gap-4 px-4 w-full h-full">
        <div id="messages" className="flex flex-col gap-8">
          {messages.map((message) => {
            console.log(message.sender_id + " " + Number(userId));
            return (
              <Message
                my={message.sender_id === Number(userId)}
                senderId={message.sender_id}
                message={message.content}
                imageUrl=""
              />
            );
          })}
        </div>
        <Send setMessage={setMessage} message={message} onSend={onSend} />
      </div>
      <BottomNavBar />
    </div>
  );
};
export default Chat;
