"use client";
import LoadingCard from "@/components/LoadingCard";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import useSWR, { mutate } from "swr";
import {
  nextUnstartedGameFetcher,
  nextUnstartedGameFetcherKey,
} from "./nextUnstartedGameFetcher";

const supabase = createClient();

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
    nextUnstartedGameFetcherKey,
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
