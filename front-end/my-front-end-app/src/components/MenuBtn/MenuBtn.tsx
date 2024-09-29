import { MdMenu } from "react-icons/md";
import { motion } from "framer-motion";

const MenuBtn = () => {
  return (
    <motion.div className="absolute right-2 top-0">
      <MdMenu
        size={50}
        className="text-slate-50 active:scale-125 hover:cursor-pointer transition-all"
      />
    </motion.div>
  );
};

export default MenuBtn;
