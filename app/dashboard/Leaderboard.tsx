import Card from "@/components/Card";
import Header3 from "@/components/Header3";
import LoadingCard from "@/components/LoadingCard";
import useSWR from "swr";
import Medal from "./icons/Medal";
import Token from "./icons/Token";
import {
  leaderboardFetcher,
  leaderboardKey,
} from "./fetchers/leaderboardFetcher";

const Leaderboard = () => {
  const { data, isLoading, error } = useSWR(leaderboardKey, leaderboardFetcher);

  return (
    <div>
      <div className="px-2">
        <Header3 title="Leaderboard" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-10 px-2 px-4 text-sm font-bold lg:grid-cols-12 lg:px-7">
          <div className="col-span-2 text-zinc-400 lg:col-span-1">#</div>
          <div className="col-span-6 text-zinc-400 lg:col-span-9">Team</div>
          <div className="col-span-2 flex justify-end text-zinc-400">
            Points
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
        {error && <>Someting went wrong</>}
        {!isLoading &&
          !error &&
          data!
            .sort((a, b) => b.score - a.score)
            .map((r, idx) => (
              <Card key={`list-${r.teamName}${idx}`}>
                <div className="grid grid-cols-10 px-2 py-1 lg:grid-cols-12 lg:px-5">
                  <div className="col-span-2 flex items-center lg:col-span-1">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-md text-3xl font-bold text-zinc-400 ${(idx === 0 || idx === 1 || idx === 2) && "text-zinc-800"} ${idx === 0 && "bg-gradient-to-t from-primary-500 to-primary-400"} ${idx === 1 && "bg-gradient-to-t from-secondary-500 to-secondary-400"} ${idx === 2 && "bg-gradient-to-t from-zinc-500 to-zinc-400"}`}
                    >
                      {idx + 1}
                    </div>
                  </div>
                  <div className="col-span-6 flex flex-col gap-2 lg:col-span-9">
                    <div className="text-md font-bold">{r.teamName}</div>
                    <div className="flex flex-wrap gap-1">
                      {[...Array(r.firstPlaces)].map((_, idx) => (
                        <Medal
                          key={idx}
                          pos={1}
                          textColor="text-primary-500"
                          color="border-primary-500"
                        />
                      ))}
                      {[...Array(r.secondPlaces)].map((_, idx) => (
                        <Medal
                          key={idx}
                          pos={2}
                          textColor="text-secondary-500"
                          color="border-secondary-500"
                        />
                      ))}
                      {[...Array(r.thirdPlaces)].map((_, idx) => (
                        <Medal
                          key={idx}
                          pos={3}
                          textColor="text-zinc-400"
                          color="border-zinc-400"
                        />
                      ))}
                      {[...Array(r.usedTokens)].map((_, idx) => (
                        <Token
                          key={idx}
                          textColor="text-primary-500"
                          color="border-zinc-800"
                        />
                      ))}
                      {[...Array(r.totalUsedTokens - r.usedTokens)].map(
                        (_, idx) => (
                          <Token
                            key={idx}
                            textColor="text-zinc-100"
                            color="border-zinc-800"
                          />
                        ),
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end font-bold">
                    <div>{r.score}</div>
                  </div>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default Leaderboard;
