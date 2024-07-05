import { createClient } from "@/utils/supabase/client";
import { Fetcher } from "swr";
import { LeaderBoardFromDatabase } from "../types/LeaderBoardFromDatabase";

export const leaderboardKey = "fetchLeaderboard";

type TeamScore = {
  teamName: string;
  score: number;
  firstPlaces: number;
  secondPlaces: number;
  thirdPlaces: number;
  totalUsedTokens: number;
  usedTokens: number;
};

const supabase = createClient();

export const leaderboardFetcher: Fetcher<TeamScore[], string> = async (
  _: string,
) => {
  const { data, error } = await supabase.rpc("get_leaderboard");

  if (error) {
    const err = new Error(error.message);
    err.name = error.hint;
    throw error;
  }

  const resultsByTeamName = Object.groupBy(
    data as LeaderBoardFromDatabase[],
    (f) => f.team_name,
  );
  const keys = Object.keys(resultsByTeamName).filter((k) => k !== "null");
  const result: TeamScore[] = keys.map((k_1) => ({
    teamName: k_1,
    score: resultsByTeamName[k_1]!.reduce((a, b) => a + (b.points ?? 0), 0),
    firstPlaces: resultsByTeamName[k_1]!.filter(
      (r) => r.place === 1 && r.points !== null,
    ).length,
    secondPlaces: resultsByTeamName[k_1]!.filter(
      (r_1) => r_1.place === 2 && r_1.points !== null,
    ).length,
    thirdPlaces: resultsByTeamName[k_1]!.filter(
      (r_2) => r_2.place === 3 && r_2.points !== null,
    ).length,
    usedTokens: resultsByTeamName[k_1]!.filter(
      (r_3) => k_1 === r_3.squid_token_used_by && r_3.points === null,
    ).length,
    totalUsedTokens: resultsByTeamName[k_1]!.filter(
      (r_3) => r_3.points === null,
    ).length,
  }));
  return result;
};
