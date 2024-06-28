"use client";
import LoadingCard from "@/components/LoadingCard";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import useSWR, { Fetcher, mutate } from "swr";

const supabase = createClient();

type Game = {
  game_id: number;
  is_started: boolean;
  name: string;
};

const nextUnstartedGameFetcher: Fetcher<Game | undefined, string> = async (
  _: string
) => {
  const games = await supabase.from("game").select("game_id, is_started, name");

  if (games.error) {
    const err = new Error(games.error.message);
    err.name = games.error.hint;
    throw err;
  }

  return (games.data as Game[])
    .sort((a, b) => a.game_id - b.game_id)
    .find((g) => !g.is_started);
};

const Admin = () => {
  const [completeError, setCompleteError] = useState<string | undefined>();
  const [haveClickedSubmit, setHaveClickedSubmit] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCompleteError(undefined);
    setHaveClickedSubmit(true);

    const { error } = await supabase.rpc("start_game", {
      game_id: data?.game_id,
    });

    if (error) {
      setCompleteError(error.message);
    } else {
      mutate("fetchTeam");
      mutate("fetchGamesStartState");
      router.push("/admin/complete-game");
    }
  }

  const { data, isLoading, error } = useSWR(
    "fetchGamesStartState",
    nextUnstartedGameFetcher
  );

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
    <>
      {data && (
        <form onSubmit={onSubmit} className="flex flex-col gap-1">
          <label className="text-zinc-400 pb-1" htmlFor="game">
            Game {data.game_id} - {data.name}
          </label>

          <button
            className="p-4 text-zinc-400 text-lg bg-zinc-800 rounded-md"
            type="submit"
          >
            Start Game
          </button>
          {completeError && (
            <div className="p-4 bg-red-500 rounded-md">{completeError}</div>
          )}
          {haveClickedSubmit && !completeError && (
            <div className="p-4 bg-green-500 rounded-md">
              Game successfully started
            </div>
          )}
        </form>
      )}
      {!data && "All games have started"}
    </>
  );
};

export default Admin;
