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
        <div className="grid grid-cols-12 px-2 text-sm font-bold">
          <div className="col-span-2 text-zinc-400">#</div>
          <div className="col-span-8 text-zinc-400">Team</div>
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
                <div className="grid grid-cols-12 px-4">
                  <div className="col-span-2 text-3xl font-bold flex items-center justify-start">
                    <div>{idx + 1}</div>
                  </div>
                  <div className="col-span-8 flex flex-col gap-2">
                    <div className="text-md font-bold">{r.teamName}</div>
                    <div className="flex gap-1 flex-wrap">
                      {[...Array(r.firstPlaces)].map((_, idx) => (
                        <Medal
                          key={idx}
                          pos={1}
                          textColor="text-cyan-500"
                          color="border-cyan-500"
                        />
                      ))}
                      {[...Array(r.secondPlaces)].map((_, idx) => (
                        <Medal
                          key={idx}
                          pos={2}
                          textColor="text-pink-500"
                          color="border-pink-500"
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
                          textColor="text-pink-500"
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
                  <div className="col-span-2 font-bold flex justify-end items-center">
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
