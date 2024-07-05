import Card from "@/components/Card";
import Header3 from "@/components/Header3";
import LoadingCard from "@/components/LoadingCard";
import useSWR from "swr";
import Square from "./icons/Square";
import Check from "./icons/Check";
import { gamesFetcher, gamesFetcherKey } from "./fetchers/gamesFetcher";
import Triangle from "./icons/Triangle";
import Circle from "./icons/Circle";

const Games = () => {
  const { data, isLoading, error } = useSWR(gamesFetcherKey, gamesFetcher);

  return (
    <div>
      {!data ||
        (data.upcoming.length !== 0 && (
          <>
            <div className="px-2">
              <Header3 title="Upcoming" />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <div className="grid grid-cols-12 px-2 text-sm font-bold lg:px-7">
                <div className="col-span-2 lg:col-span-1 text-zinc-400">
                  Order
                </div>
                <div className="col-span-8 text-zinc-400">Game</div>
                <div className="col-span-2 lg:col-span-3 flex justify-end text-zinc-400">
                  Squid
                </div>
              </div>

              {isLoading && (
                <div className="flex flex-col gap-2">
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                </div>
              )}
              {error && <>Something went wrong</>}

              {!isLoading &&
                !error &&
                data!.upcoming?.map((u, idx) => (
                  <Card key={u.gameName}>
                    <div className="grid grid-cols-12 px-4 lg:px-5">
                      <div className="col-span-2 lg:col-span-1 text-3xl font-bold flex items-center justify-start">
                        <div>{u.order}</div>
                      </div>
                      <div className="col-span-8 flex items-center text-md font-bold">
                        {u.gameName}
                      </div>
                      <div className="col-span-2 lg:col-span-3 flex justify-end">
                        {u.isSquidGame && (
                          <>
                            {idx % 3 === 0 && <Square />}
                            {(idx + 2) % 3 === 0 && <Circle />}
                            {(idx + 1) % 3 === 0 && <Triangle />}
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </>
        ))}

      <div className="px-2">
        <Header3 title="Completed" />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <div className="grid grid-cols-12 px-2 text-sm font-bold lg:px-7">
          <div className="col-span-2 lg:col-span-1 text-zinc-400">Order</div>
          <div className="col-span-8 text-zinc-400">Game</div>
          <div className="col-span-2 lg:col-span-3 flex justify-end text-zinc-400">
            Completed
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-2">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        )}
        {error && <>Something went wrong</>}
        {!isLoading &&
          !error &&
          data!.completed?.map((g) => (
            <Card key={g.gameName}>
              <div className="grid grid-cols-12 px-4 lg:px-5">
                <div className="col-span-2 lg:col-span-1 text-3xl font-bold flex items-center justify-start">
                  <div>{g.order}</div>
                </div>
                <div className="col-span-7 flex flex-col">
                  <div className="mb-1 text-md font-bold">{g.gameName}</div>
                  <div className="text-sm flex flex-col justify-center gap-.5 text-zinc-400 max-w-52">
                    <div className="flex gap-2">
                      <div>1.</div>
                      <div className="grow">{g.firstPlace}</div>
                      <div>{g.firstPlacePoints ?? "?"} pts</div>
                    </div>
                    <div className="flex gap-2">
                      <div>2.</div>
                      <div className="grow">{g.secondPlace}</div>
                      <div>{g.secondPlacePoints ?? "?"} pts</div>
                    </div>
                    <div className="flex gap-2">
                      <div>3.</div>
                      <div className="grow">{g.thirdPlace}</div>
                      <div>{g.thirdPlacePoints ?? "?"} pts</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 lg:col-span-4 flex items-center justify-end">
                  <Check />
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Games;
