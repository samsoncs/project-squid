import { createClient } from "@/utils/supabase/client";
import { Fetcher } from "swr";

export type Token = {
    token_type: "DOUBLE_TROUBLE" | "REVERSE";
    tokens_available_id: number;
};
  
type TeamToken = {
    team_id: number;
    name: string;
    tokens_available: Token[];
};

type Game = {
    game_id: number;
    name: string;
};

type TeamTokenAndGames = {
    tokens: TeamToken;
    games: Game[];
};

export const teamTokenFetcherKey = "teamTokens";

  const supabase = createClient();
  
  export const teamTokenFetcher: Fetcher<TeamTokenAndGames, string> = async (
    _: string
  ) => {
    const team_id = (await supabase.auth.getSession()).data.session?.user
      .app_metadata.team as number;
  
    const { data, error } = await supabase
      .from("team")
      .select("team_id, name, tokens_available(tokens_available_id, token_type)");
  
    if (error) {
      const err = new Error(error.message);
      err.name = error.hint;
      throw err;
    }
  
    const games = await supabase
      .from("game")
      .select("game_id, name")
      .eq("is_started", false);
  
    if (games.error) {
      const err = new Error(games.error.message);
      err.name = games.error.hint;
      throw err;
    }
  
    return {
      tokens: data.find((d) => (d.team_id = team_id)) as TeamToken,
      games: games.data as Game[],
    };
};