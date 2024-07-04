interface Props {
  type: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<Props> = ({ type }) => (
  <button
    className="p-4 text-zinc-400 text-lg bg-zinc-800 rounded-md"
    type={type}
  >
    Complete Game
  </button>
);

export default Button;
