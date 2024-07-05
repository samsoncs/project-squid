const Token: React.FC<{ color: string; textColor: string }> = ({
  color,
  textColor,
}) => (
  <div
    className={`text-md rounded-full border-2 ${textColor} flex h-5 w-5 items-center justify-center font-bold ${color}`}
  >
    ?
  </div>
);

export default Token;
