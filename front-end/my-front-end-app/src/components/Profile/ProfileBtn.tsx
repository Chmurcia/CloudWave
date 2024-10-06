import React from "react";

type ProfileBtnProps = {
  children: JSX.Element;
  onClick: () => void | React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  disabled?: boolean;
};

const ProfileBtn = ({ children, onClick, text, disabled }: ProfileBtnProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        disabled
          ? "flex gap-2 bg-slate-100/40 text-slate-950/30 p-1 rounded-md shadow-lg"
          : "flex gap-2 bg-slate-100/40 p-1 rounded-md shadow-lg"
      }
    >
      <p className="font-light">{text}</p>
      <div>{children}</div>
    </button>
  );
};

export default ProfileBtn;
