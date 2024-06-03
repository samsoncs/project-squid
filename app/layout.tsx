"use client";

import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-neutral-800 text-foreground text-white">
        <nav className="w-full bg-neutral-800 flex py-4 px-10 mb-2">
          <div className="w-full max-w-screen-xl mx-auto flex text-white">
            <div className="grow">Squid</div>
            <div>Login?</div>
          </div>
        </nav>
        <main className="w-full max-w-screen-xl mx-auto">
          <div className="mx-2">{children}</div>
        </main>
      </body>
    </html>
  );
}
