import { MouseEventHandler } from "react";

interface Props {
  type?: "button" | "submit" | "reset";
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: "sm" | "md";
}

const Button: React.FC<Props> = ({ type, name, onClick, size = "md" }) => (
  <button
    className={`${size === "sm" && "text-md px-2 py-1"} ${size === "md" && "p-4"} rounded-md bg-primary-600 text-lg`}
    type={type}
    onClick={onClick}
  >
    {name}
  </button>
);

export default Button;
