"use client";
import LoadingCard from "@/components/LoadingCard";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";
import useSWR, { Fetcher, mutate } from "swr";

const supabase = createClient();

type Team = {
  team_id: number;
  name: string;
};

type Game = {
  game_id: number;
  completed: boolean;
  is_started: boolean;
};

type TeamsAndGames = {
  teams: Team[];
  games: Game[];
};

const teamsFetcher: Fetcher<TeamsAndGames, string> = async (_: string) => {
  const teams = await supabase.from("team").select("team_id, name");
  const games = await supabase
    .from("game")
    .select("game_id, completed, is_started");

  if (teams.error) {
    const err = new Error(teams.error.message);
    err.name = teams.error.hint;
    throw err;
  }

  if (games.error) {
    const err = new Error(games.error.message);
    err.name = games.error.hint;
    throw err;
  }

  return {
    teams: teams.data as Team[],
    games: (games.data as Game[]).filter((g) => g.is_started),
  };
};

const Admin = () => {
  const [completeError, setCompleteError] = useState<string | undefined>();
  const [haveClickedSubmit, setHaveClickedSubmit] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCompleteError(undefined);
    setHaveClickedSubmit(true);

    const formData = new FormData(event.currentTarget);

    const game = Number.parseInt(formData.get("game") as string);

    if (data?.games.find((g) => g.game_id === game)?.completed) {
      if (!confirm("Game already finished, are you sure?")) {
        return;
      }
    }

    const resultList = data?.teams.map((_, idx) =>
      Number.parseInt(formData.get(`${idx + 1}Place`) as string)
    );

    const { error } = await supabase.rpc("complete_game", {
      game_id: game,
      result_list: resultList,
    });

    if (error) {
      setCompleteError(error.message);
    }

    mutate("fetchTeam");
  }

  const { data, isLoading, error } = useSWR("fetchTeam", teamsFetcher);

  if (isLoading) {
    return (
      <>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </>
    );
  }

  if (error) {
    return "Something went wrong";
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-1">
      <label className="text-zinc-400 pb-1" htmlFor="game">
        Game
      </label>

      <select
        className="bg-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 rounded-md px-4 py-2 mb-6"
        name="game"
      >
        {data?.games
          .filter((g) => !g.completed)
          .sort((a, b) => a.game_id - b.game_id)
          .map((g) => (
            <option value={g.game_id}>{g.game_id}</option>
          ))}
        {data?.games
          .filter((g) => g.completed)
          .sort((a, b) => a.game_id - b.game_id)
          .map((g) => (
            <option value={g.game_id}>{g.game_id} - Completed</option>
          ))}
      </select>

      {data?.teams.map((t, idx) => (
        <>
          <label className="text-zinc-400 pb-1" htmlFor={`${idx + 1}Place`}>
            {idx + 1}. place
          </label>
          <select
            className="bg-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 rounded-md px-4 py-2 mb-6"
            name={`${idx + 1}Place`}
          >
            {data?.teams.map((t) => (
              <option value={t.team_id}>{t.name}</option>
            ))}
          </select>
        </>
      ))}

      <button
        className="p-4 text-zinc-400 text-lg bg-zinc-800 rounded-md"
        type="submit"
      >
        Complete Game
      </button>
      {completeError && (
        <div className="p-4 bg-red-500 rounded-md">{completeError}</div>
      )}
      {haveClickedSubmit && !completeError && (
        <div className="p-4 bg-green-500 rounded-md">
          Game successfully completed
        </div>
      )}
    </form>
  );
};

export default Admin;
