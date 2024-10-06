const Username = ({ username }: { username: string }) => {
  return (
    <p id="username" className=" font-bold text-md break-words">
      {username}
    </p>
  );
};

export default Username;
