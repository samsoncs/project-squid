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
import PlaceMarker from "./icons/PlaceMarker";

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
                <div className="col-span-7 flex flex-col gap-2 font-bold">
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

                {g.firstPlacePoints && (
                  <div className="col-span-5 flex flex-col">
                    <div className="flex flex-col gap-2 pt-2 text-sm text-zinc-100">
                      {" "}
                      <div className="flex gap-2">
                        <div>
                          <PlaceMarker place={1} size="sm" />
                        </div>
                        <div>
                          <div className="font-bold">{g.firstPlace}</div>
                          <div className="text-zinc-400">
                            {g.firstPlacePoints} pts
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div>
                          <PlaceMarker place={2} size="sm" />
                        </div>
                        <div>
                          <div className="font-bold">{g.secondPlace}</div>
                          <div className="text-zinc-400">
                            {g.secondPlacePoints} pts
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div>
                          <PlaceMarker place={3} size="sm" />
                        </div>
                        <div>
                          <div className="font-bold">{g.thirdPlace}</div>
                          <div className="text-zinc-400">
                            {g.thirdPlacePoints} pts
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!g.firstPlacePoints && (
                  <div className="col-span-5 flex flex-col">
                    <div className="text-sm">Squid token used!</div>
                    <div className="flex h-full items-center justify-center">
                      <Triangle size="lg" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Games;
