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
    className="h-8 w-8 text-cyan-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const Card: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <div className="bg-zinc-800 rounded-md p-2">{children}</div>
);

const Header3: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-xl py-4 font-bold">{title}</h3>
);

type TeamScore = {
  team: string;
  score: number;
  rank: number;
  firstPlaces: number;
  secondPlaces: number;
  thirdPlaces: number;
  usedTokens: number;
};

const leaderBoard: TeamScore[] = [
  {
    team: "Team Gangbu",
    score: 16,
    rank: 1,
    firstPlaces: 5,
    secondPlaces: 2,
    thirdPlaces: 3,
    usedTokens: 2,
  },
  {
    team: "Team Chang",
    score: 12,
    rank: 2,
    firstPlaces: 2,
    secondPlaces: 3,
    thirdPlaces: 2,
    usedTokens: 0,
  },
  {
    team: "Team Badass",
    score: 11,
    rank: 3,
    firstPlaces: 0,
    secondPlaces: 3,
    thirdPlaces: 5,
    usedTokens: 1,
  },
];

const Medal: React.FC<{ color: string; textColor: string; pos: number }> = ({
  color,
  pos,
  textColor,
}) => (
  <div
    className={`rounded-full border-2 text-sm ${textColor} w-5 h-5 font-bold flex justify-center items-center ${color}`}
  >
    {pos}
  </div>
);

const Token: React.FC<{ color: string; textColor: string }> = ({
  color,
  textColor,
}) => (
  <div
    className={`rounded-full border-2 text-sm ${textColor} w-5 h-5 font-bold flex justify-center items-center ${color}`}
  >
    ?
  </div>
);

const Leaderboard = () => (
  <div>
    <div className="px-2">
      <Header3 title="Leaderboard" />
    </div>
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-12 px-2 text-sm font-bold">
        <div className="col-span-2">Rank</div>
        <div className="col-span-8">Team</div>
        <div className="col-span-2 flex justify-end">Points</div>
      </div>

      {leaderBoard.map((l) => (
        <Card>
          <div className="grid grid-cols-12 px-4">
            <div className="col-span-2 text-3xl font-bold flex items-center justify-start">
              <div>{l.rank}</div>
            </div>
            <div className="col-span-8 flex flex-col gap-2">
              <div className="text-md font-bold">{l.team}</div>
              <div className="flex gap-1 flex-wrap">
                {[...Array(l.firstPlaces)].map((_) => (
                  <Medal
                    pos={1}
                    textColor="text-cyan-500"
                    color="border-cyan-500"
                  />
                ))}
                {[...Array(l.secondPlaces)].map((_) => (
                  <Medal
                    pos={2}
                    textColor="text-pink-500"
                    color="border-pink-500"
                  />
                ))}
                {[...Array(l.thirdPlaces)].map((_) => (
                  <Medal
                    pos={3}
                    textColor="text-zinc-400"
                    color="border-zinc-400"
                  />
                ))}
                {[...Array(l.usedTokens)].map((_) => (
                  <Token textColor="text-zinc-100" color="border-zinc-800" />
                ))}
              </div>
            </div>
            <div className="col-span-2 font-bold flex justify-end items-center">
              <div> {l.score}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const Triangle = () => (
  <svg
    className="w-8 h-8 stroke-cyan-500"
    width="52"
    height="46"
    viewBox="0 0 52 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.1651 3.75L48.9497 39.75C49.9119 41.4167 48.7091 43.5 46.7846 43.5H5.21538C3.29089 43.5 2.08807 41.4167 3.05033 39.75L23.8349 3.74999C24.7972 2.08333 27.2028 2.08333 28.1651 3.75Z"
      stroke-width="5"
    />
  </svg>
);

const Square = () => (
  <svg
    className="w-8 h-8 stroke-pink-500"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2.5" y="2.5" width="45" height="45" rx="2.5" stroke-width="5" />
  </svg>
);

const Circle = () => (
  <svg
    className="w-8 h-8 stroke-cyan-500"
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="26" cy="26" r="23.5" stroke="black" stroke-width="5" />
  </svg>
);

type Game = {
  title: string;
  token?: "triangle" | "square" | "circle";
  order: number;
};

const upcoming: Game[] = [
  {
    title: "The Cookie Cutter",
    order: 5,
  },
  {
    title: "The Cookie Cutter",
    token: "triangle",
    order: 6,
  },
  {
    title: "The Cookie Cutter",
    order: 7,
  },
  {
    title: "The Cookie Cutter",
    order: 8,
  },
  {
    title: "The Cookie Cutter",
    token: "square",
    order: 9,
  },
];

type CompletedGame = {
  title: string;
  tokenUsed?: "triangle" | "square" | "circle";
  order: number;
  winner: string;
  second: string;
  third: string;
};

const completed: CompletedGame[] = [
  {
    title: "The Cookie Cutter",
    order: 4,
    winner: "Team Gangbu",
    second: "Team Cookie",
    third: "Team Awesome",
  },
  {
    title: "The Cookie Cutter",
    tokenUsed: "triangle",
    order: 3,
    winner: "Team Gangbu",
    second: "Team Cookie",
    third: "Team Awesome",
  },
  {
    title: "The Cookie Cutter",
    order: 2,
    winner: "Team Gangbu",
    second: "Team Cookie",
    third: "Team Awesome",
  },
  {
    title: "The Cookie Cutter",
    order: 1,
    winner: "Team Gangbu",
    second: "Team Cookie",
    third: "Team Awesome",
  },
];

const Games = () => (
  <div>
    <div className="px-2">
      <Header3 title="Upcoming" />
    </div>

    <div className="flex flex-col gap-2 mb-6">
      {upcoming.map((u) => (
        <Card>
          <div className="grid grid-cols-12 px-4">
            <div className="col-span-2 text-3xl font-bold flex items-center justify-start">
              <div>{u.order}</div>
            </div>
            <div className="col-span-7 flex items-center text-md font-bold">
              {u.title}
            </div>
            <div className="col-span-3 flex justify-end">
              {u.token === "circle" && <Circle />}
              {u.token === "square" && <Square />}
              {u.token === "triangle" && <Triangle />}
            </div>
          </div>
        </Card>
      ))}
    </div>

    <div className="px-2">
      <Header3 title="Completed" />
    </div>

    <div className="flex flex-col gap-2 mb-4">
      {completed.map((g) => (
        <Card>
          <div className="grid grid-cols-12 px-4">
            <div className="col-span-2 text-3xl font-bold flex items-center justify-start">
              <div>{g.order}</div>
            </div>
            <div className="col-span-7 flex flex-col">
              <div className="mb-1 text-md font-bold">{g.title}</div>
              <div className="text-sm flex flex-col justify-center gap-.5 text-zinc-400">
                {g.tokenUsed && (
                  <Token textColor="text-zinc-100" color="border-zinc-800" />
                )}
                {!g.tokenUsed && (
                  <>
                    <div>1. {g.winner}</div>
                    <div>2. {g.second}</div>
                    <div>3. {g.third}</div>
                  </>
                )}
              </div>
            </div>
            <div className="col-span-3 flex items-center justify-end">
              <Check />
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const Index = () => {
  const [currentTab, setCurrentTab] = useState<"games" | "leaderboard">(
    "games"
  );
  return (
    <div>
      <div className="flex justify-center">
        <div className="p-1.5 rounded-lg bg-zinc-800">
          <button
            className={`min-w-24 p-2 rounded-lg ${
              currentTab === "games" ? "bg-zinc-700" : ""
            }`}
            onClick={() => setCurrentTab("games")}
          >
            Games
          </button>
          <button
            className={`min-w-24 p-2 rounded-lg ${
              currentTab === "leaderboard" ? "bg-zinc-700" : ""
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
