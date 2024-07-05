const Medal: React.FC<{ color: string; textColor: string; pos: number }> = ({
  color,
  pos,
  textColor,
}) => (
  <div
    className={`rounded-full border-2 pr-[1px] text-sm ${textColor} flex h-5 w-5 items-center justify-center font-bold ${color}`}
  >
    {pos}
  </div>
);

export default Medal;
