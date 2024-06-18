"use client";
import { createContext, useEffect, useState } from "react";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { redirect, usePathname } from "next/navigation";

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

  console.log(pathname);
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
      redirect("/login"); // TODO: Should display login component directly here, and not redirect (causes flash)
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
