import LabelText from "./LabelText";

const Info = () => {
  return (
    <div id="more" className="flex w-dvw px-4">
      <div
        id="info"
        className="flex-1 flex flex-col justify-start overflow-x-hidden gap-2"
      >
        <LabelText
          isBio={true}
          text="Bio"
          value="Passionate full-stack developer specializing in JavaScript and AI.  Enthusiastic about creating innovative web solutions and improving user experiences."
        />
        <LabelText isBio={false} text="Country" value="Poland" />
        <LabelText
          isBio={false}
          text="Date of Birth"
          value="30 September 2006"
        />
      </div>
    </div>
  );
};

export default Info;

// BIO
// COUNTRY
// DATE
