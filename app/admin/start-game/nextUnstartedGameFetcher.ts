import { createClient } from "@/utils/supabase/client";
import { Fetcher } from "swr";

const supabase = createClient();

export const nextUnstartedGameFetcherKey = "fetchGamesStartState";

type Game = {
  game_id: number;
  is_started: boolean;
  name: string;
};

export const nextUnstartedGameFetcher: Fetcher<Game | undefined, string> = async (
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
