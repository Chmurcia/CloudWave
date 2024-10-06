import CountrySelector from "./CountrySelector";
import DateSelector from "./DataSelector";
import LabelInput from "./LabelInput";
import LabelTextArea from "./LabelTextArea";

const Edit = () => {
  return (
    <form className="flex flex-col gap-4 mx-4">
      <LabelInput title="Username" id="username" maxLength={32} />
      <div className="flex gap-4">
        <LabelInput title="First name" id="firstName" maxLength={20} />
        <LabelInput title="Last name" id="lastName" maxLength={20} />
      </div>
      <LabelTextArea title="Bio" id="bio" maxLength={150} />
      <div className="flex">
        <CountrySelector />
        <DateSelector />
      </div>
    </form>
  );
};

export default Edit;
