import { Link } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex w-[160px] items-center px-5">
        <Link to="/" className="font-display text-lg font-bold italic text-primary">
          SONIC EDITORIAL
        </Link>
      </div>

      <nav className="flex items-center gap-6 px-6">
        {["Explore", "Reviews", "Lists", "Activity"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-4 px-5">
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5">
          <Search size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search the archive..."
            className="w-40 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        <button className="text-muted-foreground transition-colors hover:text-foreground">
          <Bell size={18} />
        </button>
        <Link to="/profile" className="text-muted-foreground transition-colors hover:text-foreground">
          <User size={18} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
