"use client";
import Card from "@/components/Card";
import Header3 from "@/components/Header3";
import LoadingCard from "@/components/LoadingCard";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";

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

type TeamScore = {
  teamName: string;
  score: number;
  firstPlaces: number;
  secondPlaces: number;
  thirdPlaces: number;
  usedTokens: number;
};

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

const supabase = createClient();

type LeaderBoardFromDatabase = {
  game_id: number;
  game_name: string;
  is_squid_game: boolean;
  completed: boolean;
  squid_token_used?: string;
  team_name: string;
  place: number;
  points: number | null;
};

const leaderboardFetcher: Fetcher<TeamScore[], string> = async (_: string) => {
  const { data, error } = await supabase.rpc("get_leaderboard");

  if (error) {
    const err = new Error(error.message);
    err.name = error.hint;
    throw error;
  }

  const resultsByTeamName = Object.groupBy(
    data as LeaderBoardFromDatabase[],
    (f) => f.team_name
  );
  const keys = Object.keys(resultsByTeamName).filter((k) => k !== "null");
  const result: TeamScore[] = keys.map((k_1) => ({
    teamName: k_1,
    score: resultsByTeamName[k_1]!.reduce((a, b) => a + (b.points ?? 0), 0),
    firstPlaces: resultsByTeamName[k_1]!.filter(
      (r) => r.place === 1 && r.points !== null
    ).length,
    secondPlaces: resultsByTeamName[k_1]!.filter(
      (r_1) => r_1.place === 2 && r_1.points !== null
    ).length,
    thirdPlaces: resultsByTeamName[k_1]!.filter(
      (r_2) => r_2.place === 3 && r_2.points !== null
    ).length,
    usedTokens: resultsByTeamName[k_1]!.filter((r_3) => r_3.points === null)
      .length,
  }));
  return result;
};

const Leaderboard = () => {
  const { data, isLoading, error } = useSWR(
    "fetchLeaderboard",
    leaderboardFetcher
  );

  return (
    <div>
      <div className="px-2">
        <Header3 title="Leaderboard" />
      </div>
      <div className="flex flex-col gap-2">
        {isLoading && (
          <div className="flex flex-col gap-2">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        )}
        {error && <>Someting went wrong</>}
        {!isLoading &&
          !error &&
          data!
            .sort((a, b) => b.score - a.score)
            .map((r, idx) => (
              <Card key={`list-${r.teamName}${idx}`}>
                <div className="grid grid-cols-12 px-4">
                  <div className="col-span-2 text-3xl font-bold flex items-center justify-start">
                    <div>{idx + 1}</div>
                  </div>
                  <div className="col-span-8 flex flex-col gap-2">
                    <div className="text-md font-bold">{r.teamName}</div>
                    <div className="flex gap-1 flex-wrap">
                      {[...Array(r.firstPlaces)].map((_, idx) => (
                        <Medal
                          key={idx}
                          pos={1}
                          textColor="text-cyan-500"
                          color="border-cyan-500"
                        />
                      ))}
                      {[...Array(r.secondPlaces)].map((_, idx) => (
                        <Medal
                          key={idx}
                          pos={2}
                          textColor="text-pink-500"
                          color="border-pink-500"
                        />
                      ))}
                      {[...Array(r.thirdPlaces)].map((_, idx) => (
                        <Medal
                          key={idx}
                          pos={3}
                          textColor="text-zinc-400"
                          color="border-zinc-400"
                        />
                      ))}
                      {[...Array(r.usedTokens)].map((_, idx) => (
                        <Token
                          key={idx}
                          textColor="text-zinc-100"
                          color="border-zinc-800"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2 font-bold flex justify-end items-center">
                    <div>{r.score}</div>
                  </div>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
};

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
      strokeWidth="5"
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
    <rect x="2.5" y="2.5" width="45" height="45" rx="2.5" strokeWidth="5" />
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
    <circle cx="26" cy="26" r="23.5" stroke="black" strokeWidth="5" />
  </svg>
);

type Game = {
  gameName: string;
  order: number;
  isSquidGame: boolean;
  firstPlace?: string;
  secondPlace?: string;
  thirdPlace?: string;
  squidTokenUsed?: string;
};

type Games = {
  upcoming: Game[];
  completed: Game[];
};

const gamesFetcher: Fetcher<Games, string> = async (_: string) => {
  const { data, error } = await supabase.rpc("get_leaderboard");

  if (error) {
    const err = new Error(error.message);
    err.name = error.hint;
    throw error;
  }

  const resultsByGame = Object.groupBy(
    data as LeaderBoardFromDatabase[],
    (f) => f.game_name
  );
  const keys = Object.keys(resultsByGame).filter((k) => k !== "null");
  const result: Games = {
    completed: keys
      .filter((k) => resultsByGame[k]![0].completed)
      .map((k) => ({
        gameName: k,
        order: resultsByGame[k]![0].game_id,
        isSquidGame: resultsByGame[k]![0].is_squid_game,
        firstPlace: !resultsByGame[k]![0].squid_token_used
          ? resultsByGame[k]!.find((g) => g.place === 1)?.team_name
          : undefined,
        secondPlace: !resultsByGame[k]![0].squid_token_used
          ? resultsByGame[k]!.find((g) => g.place === 2)?.team_name
          : undefined,
        thirdPlace: !resultsByGame[k]![0].squid_token_used
          ? resultsByGame[k]!.find((g) => g.place === 3)?.team_name
          : undefined,
        squidTokenUsed: resultsByGame[k]![0].squid_token_used,
      })),
    upcoming: keys
      .filter((k) => !resultsByGame[k]![0].completed)
      .map((k) => ({
        gameName: k,
        order: resultsByGame[k]![0].game_id,
        isSquidGame: resultsByGame[k]![0].is_squid_game,
      })),
  };

  return result;
};

const Games = () => {
  const { data, isLoading, error } = useSWR("fetchGames", gamesFetcher);

  return (
    <div>
      {!data ||
        (data.upcoming.length !== 0 && (
          <>
            <div className="px-2">
              <Header3 title="Upcoming" />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <div className="grid grid-cols-12 px-2 text-sm font-bold">
                <div className="col-span-2 text-zinc-400">Order</div>
                <div className="col-span-8 text-zinc-400">Game</div>
                <div className="col-span-2 flex justify-end text-zinc-400">
                  Squid
                </div>
              </div>

              {isLoading && (
                <div className="flex flex-col gap-2">
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                </div>
              )}
              {error && <>Something went wrong</>}

              {!isLoading &&
                !error &&
                data!.upcoming?.map((u) => (
                  <Card key={u.gameName}>
                    <div className="grid grid-cols-12 px-4">
                      <div className="col-span-2 text-3xl font-bold flex items-center justify-start">
                        <div>{u.order}</div>
                      </div>
                      <div className="col-span-7 flex items-center text-md font-bold">
                        {u.gameName}
                      </div>
                      <div className="col-span-3 flex justify-end">
                        {u.isSquidGame && <Square />}
                        {/* {u.token === "circle" && <Circle />}
                {u.token === "square" && <Square />}
                {u.token === "triangle" && <Triangle />} */}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </>
        ))}

      <div className="px-2">
        <Header3 title="Completed" />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <div className="grid grid-cols-12 px-2 text-sm font-bold">
          <div className="col-span-2 text-zinc-400">Order</div>
          <div className="col-span-8 text-zinc-400">Game</div>
          <div className="col-span-2 flex justify-end text-zinc-400">
            Completed
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-2">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        )}
        {error && <>Something went wrong</>}
        {!isLoading &&
          !error &&
          data!.completed?.map((g) => (
            <Card key={g.gameName}>
              <div className="grid grid-cols-12 px-4">
                <div className="col-span-2 text-3xl font-bold flex items-center justify-start">
                  <div>{g.order}</div>
                </div>
                <div className="col-span-7 flex flex-col">
                  <div className="mb-1 text-md font-bold">{g.gameName}</div>
                  <div className="text-sm flex flex-col justify-center gap-.5 text-zinc-400">
                    {g.squidTokenUsed && (
                      <div className="flex">Squid token used</div>
                    )}
                    {!g.squidTokenUsed && (
                      <>
                        <div>1. {g.firstPlace}</div>
                        <div>2. {g.secondPlace}</div>
                        <div>3. {g.thirdPlace}</div>
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
};

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<"games" | "leaderboard">(
    "leaderboard"
  );
  return (
    <div>
      <div className="flex justify-center">
        <div className="p-1.5 rounded-lg bg-zinc-800">
          <button
            className={`min-w-24 p-2 rounded-lg ${
              currentTab === "leaderboard" ? "bg-zinc-700" : ""
            }`}
            onClick={() => setCurrentTab("leaderboard")}
          >
            Leaderboard
          </button>
          <button
            className={`min-w-24 p-2 rounded-lg ${
              currentTab === "games" ? "bg-zinc-700" : ""
            }`}
            onClick={() => setCurrentTab("games")}
          >
            Games
          </button>
        </div>
      </div>
      <div>{currentTab === "leaderboard" && <Leaderboard />}</div>
      <div>{currentTab === "games" && <Games />}</div>
    </div>
  );
};

export default Dashboard;
