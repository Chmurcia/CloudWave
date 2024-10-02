import { useEffect, useState } from "react";
import { countChats } from "../../../utils/counterUtils";
import { useSpring } from "framer-motion";

const ChatCounter = ({ className }: { className: string }) => {
  const [chats, setChats] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedChats = await countChats();
      setChats(fetchedChats + 15621 || 0);
    };
    fetchData();
  }, []);

  const valueCount = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: 1000,
  });

  valueCount.on("change", (value) => {
    setDisplayValue(Math.round(value));
  });

  useEffect(() => {
    valueCount.set(chats);
  }, [chats, valueCount]);

  return (
    <p style={{ textShadow: "0px 0px 10px #000000" }} className={className}>
      {displayValue}
    </p>
  );
};

export default ChatCounter;
