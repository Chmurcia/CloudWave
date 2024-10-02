import { motion } from "framer-motion";

type SignButtonsProps = {
  height: number;
  minHeight: number;
  handlePageSignUp: () => void;
  handlePageSignIn: () => void;
};

const SignButtons = ({
  height,
  minHeight,
  handlePageSignUp,
  handlePageSignIn,
}: SignButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.5 }}
      className={
        height > minHeight
          ? "flex flex-col-reverse items-center gap-6 justify-center my-10 font-extralight bottom-0"
          : "flex flex-col-reverse items-center gap-6 justify-center my-4 font-extralight bottom-0"
      }
    >
      <button
        onClick={handlePageSignUp}
        className={
          height > minHeight
            ? "bg-slate-200 py-1 px-20 text-xl rounded-2xl active:scale-110 transition-all"
            : "bg-slate-200 py-2 px-16 text-xl rounded-2xl active:scale-110 transition-all"
        }
      >
        Sign Up
      </button>
      <button
        onClick={handlePageSignIn}
        className={
          height > minHeight
            ? "bg-transparent border-slate-200 border-2 py-1 px-20 text-xl rounded-2xl text-slate-200 active:scale-110 transition-all"
            : "bg-transparent border-slate-200 border-2 py-2 px-16 text-xl rounded-2xl text-slate-200 active:scale-110 transition-all"
        }
      >
        Sign In
      </button>
    </motion.div>
  );
};

export default SignButtons;
