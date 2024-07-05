"use client";
import LoadingCard from "@/components/LoadingCard";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import useSWR, { mutate } from "swr";
import { teamsFetcherKey, teamsFetcher } from "./teamsFetcher";
import Button from "@/components/Button";
import Select from "@/components/form/Select";

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

      <Select
        name="game"
        options={data!.games
          .sort((a, b) => b.game_id - a.game_id)
          .map((g) => ({
            id: g.game_id.toString(),
            name: `${g.game_id} - ${g.name} ${g.completed && "- Completed"}`,
          }))}
      />

      {data?.teams.map((t, idx) => (
        <>
          <label className="text-zinc-400 pb-1" htmlFor={`${idx + 1}Place`}>
            {idx + 1}. place
          </label>

          <Select
            name={`${idx + 1}Place`}
            options={data!.teams.map((t) => ({
              id: t.team_id.toString(),
              name: t.name,
            }))}
          />
        </>
      ))}

      <Button type="submit" name="Complete game" />
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
