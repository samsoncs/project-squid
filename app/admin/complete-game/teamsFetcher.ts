import { createClient } from "@/utils/supabase/client";
import { Fetcher } from "swr";

const supabase = createClient();

export const teamsFetcherKey = "fetchTeam";

type Team = {
  team_id: number;
  name: string;
};

type Game = {
  game_id: number;
  name: string;
  completed: boolean;
  is_started: boolean;
};

type TeamsAndGames = {
  teams: Team[];
  games: Game[];
};

export const teamsFetcher: Fetcher<TeamsAndGames, string> = async (
  _: string,
) => {
  const teams = await supabase.from("team").select("team_id, name");
  const games = await supabase
    .from("game")
    .select("game_id, name, completed, is_started");

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
