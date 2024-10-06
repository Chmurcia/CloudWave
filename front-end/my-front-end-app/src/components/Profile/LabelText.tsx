type LabelTextProps = {
  text: string;
  value: string;
  isBio: boolean;
};

const LabelText = ({ text, value, isBio }: LabelTextProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm font-bold">{text}</p>
      <p className={isBio ? "text-xs break-words" : "text-sm break-words"}>
        {value}
      </p>
    </div>
  );
};

export default LabelText;
