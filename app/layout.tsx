"use client";
import { useEffect, useState } from "react";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import Login from "@/components/Login";
import Link from "next/link";
import { AuthContext } from "@/components/utils/AuthContext";

const supabase = createClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!isLoading && !session) {
    if (!pathname.endsWith("login") && pathname !== "/") {
      return (
        <html lang="en" className={GeistSans.className}>
          <body className="bg-zinc-900 text-foreground text-zinc-100 pt-10 flex justify-center items-center">
            <Login />
          </body>
        </html>
      );
    }
  }

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-zinc-900 text-foreground text-zinc-100">
        {pathname !== "/" && (
          <nav className="w-full bg-zinc-900 flex mb-2 py-1 px-2">
            <div className="w-full max-w-screen-xl mx-auto">
              <div className="flex items-center">
                <div className="grow">
                  <Link href="/dashboard">
                    <svg
                      className="h-14 w-14"
                      width="349"
                      height="235"
                      viewBox="0 0 349 235"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="stroke-primary-600"
                        d="M314.5 25.5H176.104C174.093 25.5 172.14 26.1737 170.556 27.4137L64.5504 110.414C59.9483 114.017 59.9483 120.983 64.5504 124.586L170.556 207.586C172.14 208.826 174.093 209.5 176.104 209.5H314.5C319.471 209.5 323.5 205.471 323.5 200.5V34.5C323.5 29.5294 319.471 25.5 314.5 25.5Z"
                        strokeWidth="30"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="flex gap-4">
                  {session &&
                    session.user.id ===
                      "66efe21d-7bf8-4425-915b-8000a7b10840" && (
                      <Link
                        className="text-sm font-bold"
                        href="/admin/start-game"
                      >
                        Admin
                      </Link>
                    )}
                  {session && (
                    <>
                      <button
                        className="text-sm font-bold"
                        onClick={() => {
                          supabase.auth.signOut();
                        }}
                      >
                        Log out
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        )}
        <main className="w-full max-w-screen-xl mx-auto">
          <div className="mx-2">
            {!isLoading && (
              <AuthContext.Provider value={{ session }}>
                {children}
              </AuthContext.Provider>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
