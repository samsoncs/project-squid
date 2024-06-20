import Card from "./Card";

const LoadingCard = () => (
  <Card>
    <div className="p-4 px-2 flex flex-col gap-4">
      <div className="bg-zinc-600 w-full h-2 rounded-md" />
      <div className="bg-zinc-600 w-1/2 h-2 rounded-md" />
    </div>
  </Card>
);

export default LoadingCard;
