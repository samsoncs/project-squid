"use client";

import Card from "@/components/Card";
import Header3 from "@/components/Header3";
import LoadingCard from "@/components/LoadingCard";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";
import useSWR, { Fetcher, mutate } from "swr";
import {
  teamTokenFetcher,
  teamTokenFetcherKey,
  Token,
} from "./teamTokenFetcher";

const supabase = createClient();

const Page = () => {
  const { data, isLoading, error } = useSWR(
    teamTokenFetcherKey,
    teamTokenFetcher
  );
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
    mutate("tokensAvailable");
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
                <div>
                  Token selected:{" "}
                  {selectedToken.token_type === "DOUBLE_TROUBLE" && (
                    <>Double trouble</>
                  )}
                  {selectedToken.token_type === "REVERSE" && <>Reverse</>}
                </div>
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
                      <option value={g.game_id}>
                        {g.game_id} - {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="bg-primary-600 rounded-md p-2">
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
            <div className="bg-primary-800 rounded-md p-2 px-3">
              <div className="flex items-center">
                <div className="grow">
                  {t.token_type === "DOUBLE_TROUBLE" && <>Double trouble</>}
                  {t.token_type === "REVERSE" && <>Reverse</>}
                </div>
                <button
                  onClick={() => setSelectedToken(t)}
                  className="flex items-center justify-center px-2 py-1 rounded-md bg-primary-600"
                >
                  Use
                </button>
              </div>
            </div>
          ))}

        {!selectedToken && data?.tokens.tokens_available.length === 0 && (
          <div className="text-zinc-400">No tokens available</div>
        )}
      </div>
    </div>
  );
};

export default Page;
