"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const Check = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-8 w-8 text-green-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const games = [{}, {}, {}];

const completed = [{}, {}, {}];

const Card: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <div className="bg-neutral-600 rounded-md p-2">{children}</div>
);

const Header3: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-2xl py-4">{title}</h3>
);

type TeamScore = {
  team: string;
  score: number;
  rank: number;
  firstPlaces: number[];
  secondPlaces: number[];
  thirdPlaces: number[];
};

const leaderBoard: TeamScore[] = [
  {
    team: "Team Gangbu",
    score: 12,
    rank: 2,
    firstPlaces: [],
    secondPlaces: [],
    thirdPlaces: [],
  },
  {
    team: "Team Chang",
    score: 16,
    rank: 1,
    firstPlaces: [],
    secondPlaces: [],
    thirdPlaces: [],
  },
  {
    team: "Team Badass",
    score: 11,
    rank: 3,
    firstPlaces: [],
    secondPlaces: [],
    thirdPlaces: [],
  },
];

const Leaderboard = () => (
  <div>
    <Header3 title="Leaderboards" />

    <div className="flex flex-col gap-2">
      {leaderBoard.map((l) => (
        <Card>
          <div className="flex justify-between gap-6">
            <div> {l.rank}</div>
            <div className="grow">{l.team}</div>
            <div> {l.score}</div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const Games = () => (
  <div>
    <Header3 title="Upcoming" />

    <div className="flex flex-col gap-2 mb-6">
      {games.map((g) => (
        <Card>
          <div className="flex">
            <div className="p-4 text-4xl">1</div>
            <div className="p-4 grow">The Cookie Cutter</div>
            {/* <div className="p-4">
              <Check />
            </div> */}
          </div>
        </Card>
      ))}
    </div>

    <Header3 title="Completed" />

    <div className="flex flex-col gap-2 mb-4">
      {completed.map((g) => (
        <Card>
          <div className="flex items-center gap-2 p-4 px-1">
            <div className="">
              <Check />
            </div>
            <div className="text-4xl">1</div>
            <div className="grow">The Cookie Cutter</div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const Index = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<"games" | "leaderboard">(
    "games"
  );
  return (
    <div>
      <div className="flex justify-center">
        <div className="p-1.5 rounded-lg bg-neutral-700">
          <button
            className={`min-w-24 p-2 rounded-lg ${
              currentTab === "games" ? "bg-neutral-600" : ""
            }`}
            onClick={() => setCurrentTab("games")}
          >
            Games
          </button>
          <button
            className={`min-w-24 p-2 rounded-lg ${
              currentTab === "leaderboard" ? "bg-neutral-600" : ""
            }`}
            onClick={() => setCurrentTab("leaderboard")}
          >
            Leaderboard
          </button>
        </div>
      </div>

      <div>{currentTab === "games" && <Games />}</div>
      <div>{currentTab === "leaderboard" && <Leaderboard />}</div>
    </div>
  );
};

export default Index;
