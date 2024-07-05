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

            <div className="mb-6 flex flex-col gap-2">
              <div className="grid grid-cols-12 px-2 text-sm font-bold lg:px-7">
                <div className="col-span-2 text-zinc-400 lg:col-span-1">
                  Order
                </div>
                <div className="col-span-8 text-zinc-400">Game</div>
                <div className="col-span-2 flex justify-end text-zinc-400 lg:col-span-3">
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
                      <div className="col-span-2 flex items-center justify-start text-3xl font-bold text-zinc-400 lg:col-span-1">
                        <div>{u.order}</div>
                      </div>
                      <div className="text-md col-span-8 flex items-center font-bold">
                        {u.gameName}
                      </div>
                      <div className="col-span-2 flex justify-end lg:col-span-3">
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

      <div className="mb-4 flex flex-col gap-2">
        <div className="grid grid-cols-12 px-2 text-sm font-bold lg:px-7">
          <div className="col-span-2 text-zinc-400 lg:col-span-1">Order</div>
          <div className="col-span-10 text-zinc-400 lg:col-span-11">Game</div>
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
              <div className="grid grid-cols-12 px-4 py-1 lg:px-5">
                <div className="col-span-2 flex items-center justify-start text-3xl font-bold lg:col-span-1">
                  <div className="text-zinc-400">{g.order}</div>
                </div>
                <div className="col-span-10 flex flex-col lg:col-span-11">
                  <div className="text-md mb-1 font-bold">{g.gameName}</div>
                  <div className="flex flex-col gap-2 pt-2 text-sm text-zinc-100">
                    {g.firstPlacePoints && (
                      <>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="w-10 font-bold text-primary-500">
                              1st
                            </div>
                            <div className="h-3 w-32 rounded-md bg-primary-500" />
                          </div>
                          <div className="flex gap-2">
                            <div className="w-10 text-zinc-400">
                              {g.firstPlacePoints} pts
                            </div>
                            <div>{g.firstPlace}</div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="w-10 font-bold text-secondary-500">
                              2nd
                            </div>
                            <div className="h-3 w-20 rounded-md bg-secondary-500" />
                          </div>
                          <div className="flex gap-2">
                            <div className="w-10 text-zinc-400">
                              {g.secondPlacePoints} pts
                            </div>
                            <div>{g.secondPlace}</div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="w-10 font-bold text-zinc-400">
                              3rd
                            </div>
                            <div className="h-3 w-5 rounded-md bg-zinc-400" />
                          </div>
                          <div className="flex gap-2">
                            <div className="w-10 text-zinc-400">
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
