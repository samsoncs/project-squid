"use client";
import { createContext, useEffect, useState } from "react";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import Login from "@/components/Login";

type AuthContextType = {
  session: Session | null;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
});
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
        {!isLoading && (
          <AuthContext.Provider value={{ session }}>
            {children}
          </AuthContext.Provider>
        )}
      </body>
    </html>
  );
}
