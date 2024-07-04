import { createClient } from "@/utils/supabase/client";
import { Fetcher } from "swr";

const supabase = createClient();

export const hasTeamTokenFetcherKey = "tokensAvailable";

type TeamTokens = {
    teamTokens: number;
  };
  
 export const hasTeamTokenFetcher: Fetcher<TeamTokens, string> = async (_: string) => {
    const team_id = (await supabase.auth.getSession()).data.session?.user
      .app_metadata.team as number;
  
    const { data, error } = await supabase
      .from("tokens_available")
      .select("team_id");
  
    if (error) {
      const err = new Error(error.message);
      err.name = error.hint;
      throw err;
    }
  
    return {
      teamTokens: data.filter((d) => (d.team_id = team_id)).length,
    };
  };

