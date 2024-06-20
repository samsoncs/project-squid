"use client";
import LoadingCard from "@/components/LoadingCard";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import useSWR, { Fetcher } from "swr";

const supabase = createClient();

type Team = {
  team_id: number;
  name: string;
};

type TeamsAndGames = {
  teams: Team[];
  games: number[];
};

const teamsFetcher: Fetcher<TeamsAndGames, string> = async (_: string) => {
  const teams = await supabase.from("team").select("team_id, name");
  const games = await supabase.from("game").select("game_id");

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
    games: games.data.map((d) => d.game_id) as number[],
  };
};

const gamesFetcher: Fetcher<number[], string> = async (_: string) => {
  const { data, error } = await supabase.from("game").select("game_id");

  if (error) {
    const err = new Error(error.message);
    err.name = error.hint;
    throw error;
  }

  return data?.map((d) => d.game_id) as number[];
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
    const firstPlace = Number.parseInt(formData.get("firstPlace") as string);
    const secondPlace = Number.parseInt(formData.get("secondPlace") as string);
    const thridPlace = Number.parseInt(formData.get("thirdPlace") as string);
    const fourthPlace = Number.parseInt(formData.get("fourthPlace") as string);

    const { error } = await supabase.rpc("complete_game", {
      game_id: game,
      first_place: firstPlace,
      second_place: secondPlace,
      third_place: thridPlace,
      fourth_place: fourthPlace,
    });

    if (error) {
      setCompleteError(error.message);
    }
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
      {data?.games.map((g) => (
        <div>{g}</div>
      ))}

      <label className="text-zinc-400 pb-1" htmlFor="game">
        Game
      </label>
      <input
        type=""
        className="bg-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 rounded-md px-4 py-2 mb-6"
        name="game"
        required
      />

      <label className="text-zinc-400 pb-1" htmlFor="firstPlace">
        1. place
      </label>
      <select
        className="bg-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 rounded-md px-4 py-2 mb-6"
        name="firstPlace"
      >
        {data?.teams.map((t) => (
          <option value={t.team_id}>{t.name}</option>
        ))}
      </select>

      <label className="text-zinc-400 pb-1" htmlFor="secondPlace">
        2. place
      </label>
      <select
        className="bg-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 rounded-md px-4 py-2 mb-6"
        name="secondPlace"
      >
        {data?.teams.map((t) => (
          <option value={t.team_id}>{t.name}</option>
        ))}
      </select>

      <label className="text-zinc-400 pb-1" htmlFor="thirdPlace">
        3. place
      </label>
      <select
        className="bg-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 rounded-md px-4 py-2 mb-6"
        name="thirdPlace"
      >
        {data?.teams.map((t) => (
          <option value={t.team_id}>{t.name}</option>
        ))}
      </select>

      <label className="text-zinc-400 pb-1" htmlFor="fourthPlace">
        4. place
      </label>
      <select
        className="bg-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 rounded-md px-4 py-2 mb-6"
        name="fourthPlace"
      >
        {data?.teams.map((t) => (
          <option value={t.team_id}>{t.name}</option>
        ))}
      </select>

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
