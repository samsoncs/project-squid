const Card: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <div className="bg-zinc-800 rounded-md p-2">{children}</div>
);

export default Card;
