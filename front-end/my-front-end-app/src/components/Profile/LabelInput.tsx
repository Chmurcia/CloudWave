type LabelInputProps = {
  title: string;
  id: string;
  maxLength: number;
};

const LabelInput = ({ title, id, maxLength }: LabelInputProps) => {
  return (
    <div className="flex-1">
      <input
        type="text"
        id={id}
        name={id}
        placeholder={title}
        maxLength={maxLength}
        className="w-full"
      />
    </div>
  );
};

export default LabelInput;
