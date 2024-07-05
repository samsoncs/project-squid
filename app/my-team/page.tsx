"use client";

import Card from "@/components/Card";
import Header3 from "@/components/Header3";
import LoadingCard from "@/components/LoadingCard";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";
import useSWR, { mutate } from "swr";
import {
  teamTokenFetcher,
  teamTokenFetcherKey,
  Token,
} from "./teamTokenFetcher";
import Button from "@/components/Button";
import Select from "@/components/form/Select";

const supabase = createClient();

const Page = () => {
  const { data, isLoading, error } = useSWR(
    teamTokenFetcherKey,
    teamTokenFetcher,
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
                  className="pb-1 text-zinc-400"
                  htmlFor="gameWeek"
                ></label>

                <div>
                  <Select
                    name="game"
                    options={data!.games.map((g) => ({
                      id: g.game_id.toString(),
                      name: `${g.game_id} - ${g.name}`,
                    }))}
                  />
                </div>
                <Button type="submit" name="Use Token" size="sm" />
              </form>
              {completeError && (
                <div className="rounded-md bg-red-500 p-4">{completeError}</div>
              )}
            </div>
          </Card>
        )}
        {!selectedToken &&
          data?.tokens.tokens_available.map((t) => (
            <div className="rounded-md bg-primary-800 p-2 px-3">
              <div className="flex items-center">
                <div className="grow">
                  {t.token_type === "DOUBLE_TROUBLE" && <>Double trouble</>}
                  {t.token_type === "REVERSE" && <>Reverse</>}
                </div>

                <Button
                  name="Use"
                  onClick={() => setSelectedToken(t)}
                  size="sm"
                />
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
