"use client";

import Card from "@/components/Card";
import Header3 from "@/components/Header3";
import LoadingCard from "@/components/LoadingCard";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";
import useSWR, { Fetcher, mutate } from "swr";

type Token = { token_type: string; tokens_available_id: number };

type TeamToken = {
  team_id: number;
  name: string;
  tokens_available: Token[];
};

type TeamTokenAndGames = {
  tokens: TeamToken;
  games: number[];
};

const supabase = createClient();

const teamTokenFetcher: Fetcher<TeamTokenAndGames, string> = async (
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
    .select("game_id")
    .eq("is_started", false);

  if (games.error) {
    const err = new Error(games.error.message);
    err.name = games.error.hint;
    throw err;
  }

  return {
    tokens: data.find((d) => (d.team_id = team_id)) as TeamToken,
    games: games.data.map((g) => g.game_id),
  };
};

const Page = () => {
  const { data, isLoading, error } = useSWR("teamTokens", teamTokenFetcher);
  const [selectedToken, setSelectedToken] = useState<Token | undefined>();
  const [completeError, setCompleteError] = useState<string | undefined>();

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  if (error) {
    return "Something went wrong";
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const game = Number.parseInt(formData.get("game") as string);

    const { error } = await supabase.rpc("use_token", {
      token_id: selectedToken?.tokens_available_id,
      game_id: game,
    });

    if (error) {
      setCompleteError(error.message);
      return;
    }

    mutate("teamTokens");
    setSelectedToken(undefined);
  }

  return (
    <div>
      <Header3 title={`${data?.tokens.name}`} />
      <div className="flex flex-col gap-2">
        {selectedToken && (
          <Card>
            <div className="flex flex-col gap-2">
              <form onSubmit={onSubmit} className="flex flex-col">
                <div>Token selected: {selectedToken.token_type}</div>
                <label
                  className="text-zinc-400 pb-1"
                  htmlFor="gameWeek"
                ></label>
                <div>
                  <select
                    className="bg-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 rounded-md px-4 py-2 mb-6"
                    name="game"
                  >
                    {data?.games.map((g) => (
                      <option value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="bg-pink-500 rounded-md p-2">
                  Use token
                </button>
              </form>
              {completeError && (
                <div className="p-4 bg-red-500 rounded-md">{completeError}</div>
              )}
            </div>
          </Card>
        )}
        {!selectedToken &&
          data?.tokens.tokens_available.map((t) => (
            <Card key={t.tokens_available_id}>
              <div className="flex items-center">
                <div className="grow">{t.token_type}</div>
                <button
                  onClick={() => setSelectedToken(t)}
                  className="bg-pink-500 rounded-md p-2"
                >
                  Use token
                </button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Page;
