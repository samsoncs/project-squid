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
import Image from "next/image";
import { BASE_PATH } from "../next.config.mjs";

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
          <body className="flex items-center justify-center bg-zinc-900 pt-10 text-foreground text-zinc-100">
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
          <nav className="mb-2 flex w-full bg-zinc-900 px-2 py-1">
            <div className="mx-auto w-full max-w-screen-xl">
              <div className="flex items-center">
                <div>
                  <Link href="/dashboard">
                    <Image
                      src={`${BASE_PATH}/gos.svg`}
                      width="160"
                      height="160"
                      alt="Game of Squids"
                    />
                  </Link>
                </div>
                <div className="grow" />
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
        <main className="mx-auto w-full max-w-screen-xl">
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
