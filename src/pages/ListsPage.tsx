import { Link } from "react-router-dom";
import { Heart, MessageSquare, Plus } from "lucide-react";
import { albums, userProfile } from "@/data/mockData";

interface MockList {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar: string;
  covers: string[];
  likes: number;
  comments: number;
  albumCount: number;
  updatedAt: string;
}

const mockLists: MockList[] = [
  {
    id: "l1",
    title: "The Dark Ambient Manifesto",
    description: "128 essential tracks for late-night programming sessions and rainy urban commutes.",
    author: "Julian_Vibe",
    avatar: userProfile.avatar,
    covers: albums.map((a) => a.cover),
    likes: 342,
    comments: 28,
    albumCount: 128,
    updatedAt: "2 days ago",
  },
  {
    id: "l2",
    title: "Morning Clarity",
    description: "Soft ambient and neo-classical pieces for the first hour of the day.",
    author: "prarthana",
    avatar: albums[1].cover,
    covers: [...albums.map((a) => a.cover)].reverse(),
    likes: 89,
    comments: 5,
    albumCount: 34,
    updatedAt: "1 week ago",
  },
  {
    id: "l3",
    title: "Best of 2024: Electronic",
    description: "The definitive list of electronic releases that shaped 2024.",
    author: "Anirudh_R",
    avatar: albums[2].cover,
    covers: albums.map((a) => a.cover),
    likes: 1204,
    comments: 87,
    albumCount: 50,
    updatedAt: "3 days ago",
  },
  {
    id: "l4",
    title: "Post-Rock Essentials",
    description: "From Mogwai to Godspeed, the genre's most important works catalogued.",
    author: "VaishuBeats",
    avatar: albums[0].cover,
    covers: [...albums.map((a) => a.cover)].reverse(),
    likes: 567,
    comments: 42,
    albumCount: 75,
    updatedAt: "5 days ago",
  },
];

const ListsPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Lists</h1>
          <p className="mt-1 text-sm text-muted-foreground">Community-curated collections of albums and tracks.</p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus size={14} /> New List
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 border-b border-border">
        {["Popular", "Recent", "Your Lists", "Following"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
              i === 0
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Lists */}
      <div className="mt-6 flex flex-col gap-5">
        {mockLists.map((list) => (
          <div key={list.id} className="sonic-card flex gap-5">
            {/* Cover mosaic */}
            <div className="grid h-28 w-28 shrink-0 grid-cols-2 gap-0.5 overflow-hidden rounded-md">
              {list.covers.slice(0, 4).map((cover, i) => (
                <img key={i} src={cover} alt="" className="h-full w-full object-cover" />
              ))}
            </div>

            <div className="flex-1">
              <Link to="#" className="font-display text-lg font-bold hover:text-primary transition-colors">
                {list.title}
              </Link>
              <div className="mt-1 flex items-center gap-2">
                <img src={list.avatar} alt={list.author} className="h-4 w-4 rounded-full object-cover" />
                <span className="text-xs font-semibold text-primary">{list.author}</span>
                <span className="text-[10px] text-muted-foreground">• {list.albumCount} albums • Updated {list.updatedAt}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {list.description}
              </p>
              <div className="mt-3 flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1 text-xs">
                  <Heart size={12} /> {list.likes}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <MessageSquare size={12} /> {list.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsPage;
