import { MouseEventHandler } from "react";

interface Props {
  type?: "button" | "submit" | "reset";
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: "sm" | "md";
}

const Button: React.FC<Props> = ({ type, name, onClick, size = "md" }) => (
  <button
    className={`${size === "sm" && "p-2"} ${size === "md" && "p-4"} text-lg bg-primary-600 rounded-md`}
    type={type}
    onClick={onClick}
  >
    {name}
  </button>
);

export default Button;
