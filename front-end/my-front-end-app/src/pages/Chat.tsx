import { useParams } from "react-router-dom";
import BottomNavBar from "../components/Homepage/BottomNavBar/BottomNavBar";

const Chat = () => {
  const { chatId } = useParams();
  return (
    <>
      <h1>Chat {chatId}</h1>
      <BottomNavBar />
    </>
  );
};
export default Chat;
