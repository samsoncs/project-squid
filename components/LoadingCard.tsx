import Card from "./Card";

const LoadingCard = () => (
  <Card>
    <div className="flex flex-col gap-4 p-4 px-2">
      <div className="h-2 w-full rounded-md bg-zinc-600" />
      <div className="h-2 w-1/2 rounded-md bg-zinc-600" />
    </div>
  </Card>
);

export default LoadingCard;
