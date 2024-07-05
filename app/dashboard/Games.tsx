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
                      <div className="col-span-2 lg:col-span-1 text-3xl font-bold flex items-center justify-start text-zinc-400">
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
          <div className="col-span-10 lg:col-span-11 text-zinc-400">Game</div>
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
              <div className="grid grid-cols-12 px-4 lg:px-5 py-1">
                <div className="col-span-2 lg:col-span-1 text-3xl font-bold flex items-center justify-start">
                  <div className="text-zinc-400">{g.order}</div>
                </div>
                <div className="col-span-10 lg:col-span-11 flex flex-col">
                  <div className="mb-1 text-md font-bold">{g.gameName}</div>
                  <div className="text-sm flex flex-col pt-2 gap-2 text-zinc-100">
                    {g.firstPlacePoints && (
                      <>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-primary-500 font-bold w-10">
                              1st
                            </div>
                            <div className="w-32 h-3 rounded-md bg-primary-500" />
                          </div>
                          <div className="flex gap-2">
                            <div className="text-zinc-400 w-10">
                              {g.firstPlacePoints} pts
                            </div>
                            <div>{g.firstPlace}</div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-secondary-500 font-bold w-10">
                              2nd
                            </div>
                            <div className="w-20 h-3 rounded-md bg-secondary-500" />
                          </div>
                          <div className="flex gap-2">
                            <div className="text-zinc-400 w-10">
                              {g.secondPlacePoints} pts
                            </div>
                            <div>{g.secondPlace}</div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-zinc-400 font-bold w-10">
                              3rd
                            </div>
                            <div className="w-5 h-3 rounded-md bg-zinc-400" />
                          </div>
                          <div className="flex gap-2">
                            <div className="text-zinc-400 w-10">
                              {g.thirdPlacePoints} pts
                            </div>
                            <div>{g.thirdPlace}</div>
                          </div>
                        </div>
                      </>
                    )}

                    {!g.firstPlacePoints && <>Squid token used</>}
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Games;
