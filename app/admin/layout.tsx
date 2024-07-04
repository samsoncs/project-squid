import Link from "next/link";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <div className="flex gap-4 pb-2">
      <Link className="underline text-secondary-500" href="/admin/start-game">
        Start game
      </Link>
      <Link
        className="underline text-secondary-500"
        href="/admin/complete-game"
      >
        Complete game
      </Link>
    </div>
    {children}
  </div>
);

export default Layout;
