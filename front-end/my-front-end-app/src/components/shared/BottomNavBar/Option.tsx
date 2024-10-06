import classNames from "classnames";
import { useLocation } from "react-router-dom";

type OptionProps = {
  children: JSX.Element;
  onClick: () => void;
  path: string;
};

const Option = ({ children, onClick, path }: OptionProps) => {
  const location = useLocation();
  const optionClass = classNames("flex justify-center items-center flex-1", {
    "bg-slate-400": location.pathname.startsWith(path),
    "bg-slate-300": !location.pathname.startsWith(path),
  });

  return (
    <button onClick={onClick} className={optionClass}>
      <div>{children}</div>
    </button>
  );
};

export default Option;
