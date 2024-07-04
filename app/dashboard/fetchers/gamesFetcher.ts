import { createClient } from "@/utils/supabase/client";
import { Fetcher } from "swr";
import { LeaderBoardFromDatabase } from "../types/LeaderBoardFromDatabase";

const supabase = createClient();

type Game = {
  gameName: string;
  order: number;
  isSquidGame: boolean;
  firstPlace?: string;
  firstPlacePoints?: number | null;
  secondPlace?: string;
  secondPlacePoints?: number | null;
  thirdPlace?: string;
  thirdPlacePoints?: number | null;
  squidTokenUsed?: string;
};

type Games = {
  upcoming: Game[];
  completed: Game[];
};

export const gamesFetcherKey = "fetchGames";

export const gamesFetcher: Fetcher<Games, string> = async (_: string) => {
  const { data, error } = await supabase.rpc("get_leaderboard");

  if (error) {
    const err = new Error(error.message);
    err.name = error.hint;
    throw error;
  }

  const resultsByGame = Object.groupBy(
    data as LeaderBoardFromDatabase[],
    (f) => f.game_name
  );
  const keys = Object.keys(resultsByGame).filter((k) => k !== "null");
  const result: Games = {
    completed: keys
      .filter((k) => resultsByGame[k]![0].completed)
      .map((k) => ({
        gameName: k,
        order: resultsByGame[k]![0].game_id,
        isSquidGame: resultsByGame[k]![0].is_squid_game,
        firstPlace: !resultsByGame[k]![0].squid_token_used
          ? resultsByGame[k]!.find((g) => g.place === 1)?.team_name
          : undefined,
        firstPlacePoints: resultsByGame[k]!.find((g) => g.place === 1)?.points,
        secondPlace: !resultsByGame[k]![0].squid_token_used
          ? resultsByGame[k]!.find((g) => g.place === 2)?.team_name
          : undefined,
        secondPlacePoints: resultsByGame[k]!.find((g) => g.place === 2)?.points,
        thirdPlace: !resultsByGame[k]![0].squid_token_used
          ? resultsByGame[k]!.find((g) => g.place === 3)?.team_name
          : undefined,
        thirdPlacePoints: resultsByGame[k]!.find((g) => g.place === 3)?.points,
        squidTokenUsed: resultsByGame[k]![0].squid_token_used,
      })),
    upcoming: keys
      .filter((k) => !resultsByGame[k]![0].completed)
      .map((k) => ({
        gameName: k,
        order: resultsByGame[k]![0].game_id,
        isSquidGame: resultsByGame[k]![0].is_squid_game,
      })),
  };

  return result;
};