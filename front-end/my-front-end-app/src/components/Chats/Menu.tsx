import React from "react";
import { FaEyeSlash, FaGlobe, FaShieldAlt, FaVolumeMute } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { ChatCategory } from "../../utils/typeUtils";

type MenuProps = {
  addChatOnClick: () => void;
  setChatCat: React.Dispatch<React.SetStateAction<ChatCategory>>;
};

const Menu = ({ addChatOnClick, setChatCat }: MenuProps) => {
  return (
    <div className="flex justify-around pt-2 mb-2">
      <div className="flex gap-4">
        <FaGlobe size={30} onClick={() => setChatCat("Public")} />
        <FaShieldAlt size={30} onClick={() => setChatCat("Private")} />
        <FaEyeSlash size={30} onClick={() => setChatCat("Hidden")} />
        <FaVolumeMute size={30} onClick={() => setChatCat("Muted")} />
      </div>
      <div>
        <IoAddCircle size={30} onClick={addChatOnClick} />
      </div>
    </div>
  );
};

export default Menu;
