const Person = ({
  color,
  className,
}: {
  color: string;
  className?: string;
}) => {
  return (
    <div>
      <svg
        className={className}
        width="200"
        height="200"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={color}>
          <path d="M 10 11 C 4.08 11 2 14 2 16 L 2 19 L 18 19 L 18 16 C 18 14 15.92 11 10 11 Z" />
          <circle cx="10" cy="5.5" r="4.5" />
        </g>
      </svg>
    </div>
  );
};

export default Person;
