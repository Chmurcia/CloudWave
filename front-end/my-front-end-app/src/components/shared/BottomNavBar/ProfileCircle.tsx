type ProfileCircleProps = {
  src: string | null;
  onClick: () => void;
};

const ProfileCircle = ({ src, onClick }: ProfileCircleProps) => {
  return (
    <button
      onClick={onClick}
      className="h-full w-auto aspect-square rounded-full"
    >
      {src ? (
        <img src="../../assets/blank.jpg" alt="User Image" />
      ) : (
        <img src="./blank.jpg" alt="User Image" />
      )}
    </button>
  );
};

export default ProfileCircle;
