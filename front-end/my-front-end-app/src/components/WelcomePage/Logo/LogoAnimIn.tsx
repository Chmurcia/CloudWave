import { motion } from "framer-motion";

type LogoSize = "sm" | "md" | "lg";

const LogoAnimIn = ({ size }: { size: LogoSize }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <svg
        width={size === "sm" ? 50 : size === "md" ? 100 : 170}
        height="200"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" fill="#D9D9D9" />
      </svg>
    </motion.div>
  );
};

export default LogoAnimIn;
