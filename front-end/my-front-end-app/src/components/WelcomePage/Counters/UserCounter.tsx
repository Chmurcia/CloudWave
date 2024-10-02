import { useEffect, useState } from "react";
import { countUsers } from "../../../utils/counterUtils";
import { useSpring } from "framer-motion";

const UserCounter = ({ className }: { className: string }) => {
  const [users, setUsers] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await countUsers();
      setUsers(fetchedUsers + 5000 || 0);
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
    valueCount.set(users);
  }, [users, valueCount]);

  return (
    <p style={{ textShadow: "0px 0px 10px #000000" }} className={className}>
      {displayValue}
    </p>
  );
};

export default UserCounter;
