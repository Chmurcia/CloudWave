type LabelTextAreaProps = {
  title: string;
  id: string;
  maxLength: number;
};

const LabelTextArea = ({ title, id, maxLength }: LabelTextAreaProps) => {
  return (
    <>
      <textarea
        id={id}
        name={id}
        placeholder={title}
        maxLength={maxLength}
        className="h-24"
      />
    </>
  );
};

export default LabelTextArea;
