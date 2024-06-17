"use client";

import { createClient } from "@/utils/supabase/client";
import { Session, UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const supabase = createClient();
  const [user, setUser] = useState<UserResponse | undefined>(undefined);
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    async function auth() {
      // const session = (await supabase.auth.getSession())?.data?.session;
      // if (session) {
      //   setSession(session);
      // }

      setUser(await supabase.auth.getUser());
    }

    auth();
  }, []);

  return (
    <>
      <nav className="w-full bg-zinc-900 flex mb-2 py-1 px-2">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <div className="grow">
              <svg
                className="h-14 w-14"
                width="349"
                height="235"
                viewBox="0 0 349 235"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M314.5 25.5H176.104C174.093 25.5 172.14 26.1737 170.556 27.4137L64.5504 110.414C59.9483 114.017 59.9483 120.983 64.5504 124.586L170.556 207.586C172.14 208.826 174.093 209.5 176.104 209.5H314.5C319.471 209.5 323.5 205.471 323.5 200.5V34.5C323.5 29.5294 319.471 25.5 314.5 25.5Z"
                  stroke="#EC4899"
                  strokeWidth="30"
                />
              </svg>
            </div>
            <div>
              {session && <>Log out</>}
              {!session && <>Log in</>}
            </div>
          </div>
        </div>
      </nav>
      <main className="w-full max-w-screen-xl mx-auto">
        <div className="mx-2">{children}</div>
      </main>
    </>
  );
}
