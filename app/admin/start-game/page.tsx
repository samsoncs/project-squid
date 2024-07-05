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
import Button from "@/components/Button";

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
    nextUnstartedGameFetcher,
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
          <label className="pb-1 text-zinc-400" htmlFor="game">
            Game {data.game_id} - {data.name}
          </label>

          <Button type="submit" name="Start Game" />
          {completeError && (
            <div className="rounded-md bg-red-500 p-4">{completeError}</div>
          )}
          {haveClickedSubmit && !completeError && (
            <div className="rounded-md bg-green-500 p-4">
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
