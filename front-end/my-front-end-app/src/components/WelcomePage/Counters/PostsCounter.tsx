import { useEffect, useState } from "react";
import { countPosts } from "../../../utils/counterUtils";
import { useSpring } from "framer-motion";

const PostCounter = ({ className }: { className: string }) => {
  const [posts, setPosts] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await countPosts();
      setPosts(fetchedPosts + 560412 || 0);
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
    valueCount.set(posts);
  }, [posts, valueCount]);

  return (
    <p style={{ textShadow: "0px 0px 10px #000000" }} className={className}>
      {displayValue}
    </p>
  );
};

export default PostCounter;
