const Token: React.FC<{ color: string; textColor: string }> = ({
  color,
  textColor,
}) => (
  <div
    className={`rounded-full border-2 text-md ${textColor} w-5 h-5 font-bold flex justify-center items-center ${color}`}
  >
    ?
  </div>
);

export default Token;
