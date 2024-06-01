import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-slate-700 text-foreground text-white">
        <nav className="w-full bg-slate-900 flex py-4 px-10">
          <div className="w-full max-w-screen-xl mx-auto flex text-white">
            <div className="grow">Squid</div>
            <div>Login?</div>
          </div>
        </nav>
        <main className="w-full max-w-screen-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
