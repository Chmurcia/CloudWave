import { motion } from "framer-motion";

const TextAnimIn = ({
  string,
  className,
  delay,
}: {
  string: string;
  className: string;
  delay: number;
}) => {
  const text: string[] = string.split(".");
  return (
    <div className={className}>
      {text.map((el, i) => {
        el = el.replace(/-/g, " ");
        return (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: i / delay,
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

export default TextAnimIn;
