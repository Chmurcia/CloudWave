type FormButtonsProps = {
  addChatOnClick: () => void;
};

const FormButtons = ({ addChatOnClick }: FormButtonsProps) => {
  return (
    <div className="flex gap-10 w-full">
      <button className="bg-slate-300 p-2 flex-1 rounded-t-lg" type="submit">
        Submit
      </button>
      <button
        className="bg-slate-300 p-2 flex-1 rounded-t-lg"
        type="button"
        onClick={addChatOnClick}
      >
        Cancel
      </button>
    </div>
  );
};

export default FormButtons;
