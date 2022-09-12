export default function ArrowRightIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ strokeWidth: "1.5", stroke: "currentColor" }}
      className="w-6 h-6"
      width={props.width}
    >
      <path
        style={{ strokeLinecap: "round", strokelinejoin: "round" }}
        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
      />
    </svg>
  );
}
