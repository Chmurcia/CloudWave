type LogoSize = "sm" | "md" | "lg";

const Logo = ({ size }: { size: LogoSize }) => {
  return (
    <div>
      <svg
        width={size === "sm" ? 50 : size === "md" ? 100 : 150}
        height="200"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" fill="#D9D9D9" />
      </svg>
    </div>
  );
};

export default Logo;
