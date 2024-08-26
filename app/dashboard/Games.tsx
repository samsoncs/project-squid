import Card from "@/components/Card";
import Header3 from "@/components/Header3";
import LoadingCard from "@/components/LoadingCard";
import useSWR from "swr";
import Square from "./icons/Square";
import Image from "next/image";
import { gamesFetcher, gamesFetcherKey } from "./fetchers/gamesFetcher";
import Triangle from "./icons/Triangle";
import Circle from "./icons/Circle";
import { BASE_PATH } from "@/next.config.mjs";

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
                    <div className="flex flex-col">
                      <div className="text-md flex items-end">
                        <div className="flex gap-4">
                          <Image
                            src={`${BASE_PATH}/${u.gameName.toLocaleLowerCase().replaceAll(" ", "")}.webp`}
                            height="100"
                            width="100"
                            alt={u.gameName}
                            className="rounded-md"
                          />
                          <div className="mt-2 flex flex-col gap-2">
                            <div className="font-bold">
                              {u.order}. {u.gameName}
                            </div>
                            {u.isSquidGame && (
                              <div className="flex items-center gap-3">
                                {idx % 3 === 0 && <Square />}
                                {(idx + 2) % 3 === 0 && <Circle />}
                                {(idx + 1) % 3 === 0 && <Triangle />}
                                <div className="text-sm text-zinc-400">
                                  Squid token up for grabs!
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
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
              <div className="grid grid-cols-12 py-1">
                <div className="col-span-7 flex flex-col font-bold">
                  <div className="text-md">
                    {g.order}. {g.gameName}
                  </div>
                  <Image
                    src={`${BASE_PATH}/${g.gameName.toLocaleLowerCase().replaceAll(" ", "")}.webp`}
                    height="100"
                    width="100"
                    alt={g.gameName}
                    className="rounded-md"
                  />
                </div>
                <div className="col-span-5 flex flex-col">
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
                            <div className="w-10">{g.firstPlacePoints} pts</div>
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
                            <div className="w-10">
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
                            <div className="w-10">{g.thirdPlacePoints} pts</div>
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
