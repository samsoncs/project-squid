interface Props {
  place: number;
  size?: "sm";
}

const PlaceMarker: React.FC<Props> = ({ place, size }) => (
  <div
    className={`flex ${size === "sm" ? "h-8 w-8 text-xl" : "h-12 w-12 text-3xl"} items-center justify-center rounded-md font-bold text-zinc-400 ${(place === 1 || place === 2 || place === 3) && "text-zinc-800"} ${place === 1 && "bg-gradient-to-t from-primary-500 to-primary-400"} ${place === 2 && "bg-gradient-to-t from-secondary-500 to-secondary-400"} ${place === 3 && "bg-gradient-to-t from-zinc-500 to-zinc-400"}`}
  >
    {place}
  </div>
);

export default PlaceMarker;
