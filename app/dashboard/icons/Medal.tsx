const Medal: React.FC<{ color: string; textColor: string; pos: number }> = ({
  color,
  pos,
  textColor,
}) => (
  <div
    className={`rounded-full pr-[1px] border-2 text-sm ${textColor} w-5 h-5 font-bold flex justify-center items-center ${color}`}
  >
    {pos}
  </div>
);

export default Medal;
