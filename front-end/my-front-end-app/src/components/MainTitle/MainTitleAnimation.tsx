import { motion } from "framer-motion";

const text: string[] = "C l o u d W a v e".split(" ");

const MainTitleAnimation = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      {text.map((el, i) => {
        return (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: i / 10,
            }}
            key={i}
          >
            {el}
          </motion.span>
        );
      })}
    </div>
  );
};

export default MainTitleAnimation;
