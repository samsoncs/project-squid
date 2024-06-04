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
      <body className="bg-zinc-900 text-foreground text-zinc-100">
        <nav className="w-full bg-zinc-900 flex px-10 mb-2 py-1">
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
                    stroke-width="30"
                  />
                  {/* <circle
                    cx="55"
                    cy="117"
                    r="47.5"
                    fill="#06B6D4"
                    stroke="#06B6D4"
                    stroke-width="15"
                  /> */}
                </svg>

                {/* <svg
                  width="332"
                  height="209"
                  viewBox="0 0 332 209"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14"
                >
                  <path
                    d="M287.5 12.5H149.104C147.093 12.5 145.14 13.1737 143.556 14.4137L37.5504 97.4137C32.9483 101.017 32.9483 107.983 37.5504 111.586L143.556 194.586C145.14 195.826 147.093 196.5 149.104 196.5H287.5C292.471 196.5 296.5 192.471 296.5 187.5V21.5C296.5 16.5294 292.471 12.5 287.5 12.5Z"
                    stroke="#EC4899"
                    stroke-width="25"
                  />
                  <circle
                    cx="38"
                    cy="104"
                    r="30.5"
                    stroke="#06B6D4"
                    stroke-width="15"
                  />
                  <circle
                    cx="294"
                    cy="104"
                    r="30.5"
                    stroke="#06B6D4"
                    stroke-width="15"
                  />
                </svg> */}
              </div>
              <div>Login?</div>
            </div>
          </div>
        </nav>
        <main className="w-full max-w-screen-xl mx-auto">
          <div className="mx-2">{children}</div>
        </main>
      </body>
    </html>
  );
}
