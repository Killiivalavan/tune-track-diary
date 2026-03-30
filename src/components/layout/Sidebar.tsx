import { Link, useLocation } from "react-router-dom";
import { Home, Library, ListMusic, Users, Compass, PenLine } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Library, label: "Library", path: "/library" },
  { icon: ListMusic, label: "Playlists", path: "/playlists" },
  { icon: Users, label: "Following", path: "/following" },
  { icon: Compass, label: "Discover", path: "/discover" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[160px] flex-col border-r border-border bg-background pt-20">
      <div className="px-4 pb-6">
        <p className="font-display text-sm font-bold text-primary">Your Sonic</p>
        <p className="sonic-label mt-0.5">High-Fidelity Curation</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <Link
          to="/write-review"
          className="flex items-center gap-2 rounded-md border border-primary bg-transparent px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <PenLine size={14} />
          Write a Review
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
