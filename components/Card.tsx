const Card: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <div className="rounded-md bg-zinc-800 p-2">{children}</div>
);

export default Card;
