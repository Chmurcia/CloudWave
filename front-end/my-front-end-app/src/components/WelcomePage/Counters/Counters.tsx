import { motion } from "framer-motion";
import ChatCounter from "./ChatCounter";
import PostCounter from "./PostsCounter";
import UserCounter from "./UserCounter";

type CountersProps = {
  height: number;
  minHeight: number;
};

const Counters = ({ height, minHeight }: CountersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className={
        height > minHeight
          ? "flex flex-col gap-5  border-slate-50 rounded-full mt-10"
          : "flex flex-col gap-5  border-slate-50 rounded-full my-4 mb-12"
      }
    >
      <div className="flex flex-col items-center">
        <div
          style={{ textShadow: "0px 0px 10px #000000" }}
          className={
            height > minHeight
              ? "text-slate-200 text-2xl font-bold"
              : "text-slate-200 text-1xl font-bold"
          }
        >
          Signed Users
        </div>
        <UserCounter
          className={
            height > minHeight
              ? "text-slate-200 text-3xl font-normal"
              : "text-slate-200 text-2xl font-normal"
          }
        />
      </div>
      <div className="flex flex-col items-center">
        <div
          style={{ textShadow: "0px 0px 10px #000000" }}
          className={
            height > minHeight
              ? "text-slate-200 text-2xl font-bold"
              : "text-slate-200 text-1xl font-bold"
          }
        >
          Posted Posts
        </div>
        <PostCounter
          className={
            height > minHeight
              ? "text-slate-200 text-3xl font-normal"
              : "text-slate-200 text-2xl font-normal"
          }
        />
      </div>
      <div className="flex flex-col items-center">
        <div
          style={{ textShadow: "0px 0px 10px #000000" }}
          className={
            height > minHeight
              ? "text-slate-200 text-2xl font-bold"
              : "text-slate-200 text-1xl font-bold"
          }
        >
          Created Chats
        </div>
        <ChatCounter
          className={
            height > minHeight
              ? "text-slate-200 text-3xl font-normal"
              : "text-slate-200 text-2xl font-normal"
          }
        />
      </div>
    </motion.div>
  );
};

export default Counters;
