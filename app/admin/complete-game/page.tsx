"use client";
import LoadingCard from "@/components/LoadingCard";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import useSWR, { mutate } from "swr";
import { teamsFetcherKey, teamsFetcher } from "./teamsFetcher";

const supabase = createClient();

const Admin = () => {
  const [completeError, setCompleteError] = useState<string | undefined>();
  const [haveClickedSubmit, setHaveClickedSubmit] = useState<boolean>(false);
  const router = useRouter();

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
    } else {
      mutate("fetchGamesStartState");
      mutate("fetchTeam");
      router.push("/admin/start-game");
    }
  }

  const { data, isLoading, error } = useSWR(teamsFetcherKey, teamsFetcher);

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
          .sort((a, b) => b.game_id - a.game_id)
          .map((g) => (
            <option value={g.game_id}>
              {g.game_id} - {g.name} {g.completed && "- Completed"}
            </option>
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
