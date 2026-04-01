import { Link } from "react-router-dom";
import { Search, Bell, ChevronDown, Plus } from "lucide-react";
import userAvatar from "@/assets/user-avatar.jpg";

const Navbar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center px-4">
        {/* Logo */}
        <Link to="/" className="font-display text-lg font-bold italic text-primary mr-2">
          SONIC
        </Link>

        {/* User dropdown */}
        <button className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <img src={userAvatar} alt="avatar" className="h-6 w-6 rounded-full object-cover" />
          <span className="font-medium text-foreground">JULIAN_VIBE</span>
          <ChevronDown size={12} />
        </button>

        {/* Main nav */}
        <nav className="ml-4 flex items-center gap-1">
          {["Albums", "Lists", "Members", "Journal"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          <button className="text-muted-foreground transition-colors hover:text-foreground">
            <Search size={16} />
          </button>
          <button className="text-muted-foreground transition-colors hover:text-foreground">
            <Bell size={16} />
          </button>
          <button className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            <Plus size={14} />
            Log
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
