"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import Leaderboard from "./Leaderboard";
import Games from "./Games";
import {
  hasTeamTokenFetcher,
  hasTeamTokenFetcherKey,
} from "./fetchers/hasTeamTokenFetcher";

const supabase = createClient();

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<"games" | "leaderboard">(
    "leaderboard",
  );

  const { data, isLoading, error } = useSWR(
    hasTeamTokenFetcherKey,
    hasTeamTokenFetcher,
  );

  return (
    <div>
      {!isLoading && !error && data && data.teamTokens > 0 && (
        <div className="py-4">
          <Link href="/my-team">
            <div className="rounded-md bg-primary-800 p-2 px-3">
              <div className="flex items-center">
                <div className="grow">{data.teamTokens} token(s) available</div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 px-2 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="flex justify-center">
        <div className="rounded-lg bg-zinc-800 p-1.5">
          <button
            className={`min-w-24 rounded-lg p-2 ${
              currentTab === "leaderboard" ? "bg-zinc-700" : ""
            }`}
            onClick={() => setCurrentTab("leaderboard")}
          >
            Leaderboard
          </button>
          <button
            className={`min-w-24 rounded-lg p-2 ${
              currentTab === "games" ? "bg-zinc-700" : ""
            }`}
            onClick={() => setCurrentTab("games")}
          >
            Games
          </button>
        </div>
      </div>
      <div>{currentTab === "leaderboard" && <Leaderboard />}</div>
      <div>{currentTab === "games" && <Games />}</div>
    </div>
  );
};

export default Dashboard;
