"use client";

const Check = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-8 w-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const games = [{}, {}, {}];

const Standings = () => (
  <div>
    <h3 className="text-4xl py-4">Standings</h3>

    {games.map((g) => (
      <div className="bg-slate-500 rounded-md p-4 my-4">
        <div className="flex">
          <div className="p-4 text-4xl">1</div>
          <div className="p-4 grow">The Cookie Cutter</div>
          <div className="p-4">
            <Check />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Standings;
