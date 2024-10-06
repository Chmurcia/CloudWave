type FullNameProps = {
  profile: { firstName: string; lastName: string };
};

const FullName = ({ profile }: FullNameProps) => {
  return (
    <div
      id="first-last-name"
      className="flex flex-wrap gap-2 justify-center text-sm"
    >
      {profile.firstName && profile.lastName && (
        <>
          <p id="first-name" className="text-slate-800 ">
            {profile.firstName}
          </p>
          <p id="last-name" className="text-slate-800 ">
            {profile.lastName}
          </p>
        </>
      )}
    </div>
  );
};

export default FullName;
