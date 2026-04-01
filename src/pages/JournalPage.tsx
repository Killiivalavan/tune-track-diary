import { Link } from "react-router-dom";
import { Clock, MessageSquare, Heart } from "lucide-react";
import { albums, artists } from "@/data/mockData";
import userAvatar from "@/assets/user-avatar.jpg";

interface JournalEntry {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  avatar: string;
  cover: string;
  category: string;
  readTime: string;
  date: string;
  likes: number;
  comments: number;
}

const entries: JournalEntry[] = [
  {
    id: "j1",
    title: "The Rise of Modular Synthesis in Modern Electronic Music",
    excerpt: "How a niche corner of electronic music production became the defining sound of a generation. From Buchla to Eurorack, we trace the lineage of voltage-controlled creativity.",
    author: "Julian_Vibe",
    avatar: userAvatar,
    cover: albums[0].cover,
    category: "Deep Dive",
    readTime: "12 min read",
    date: "Mar 28, 2026",
    likes: 234,
    comments: 42,
  },
  {
    id: "j2",
    title: "Why Jazz Revival Is More Than Nostalgia",
    excerpt: "The new wave of jazz musicians isn't looking backward — they're deconstructing the form and rebuilding it with electronic textures, hip-hop rhythms, and global influences.",
    author: "prarthana",
    avatar: artists[1].photo,
    cover: albums[1].cover,
    category: "Opinion",
    readTime: "8 min read",
    date: "Mar 25, 2026",
    likes: 189,
    comments: 31,
  },
  {
    id: "j3",
    title: "Album of the Month: Electric Dreams",
    excerpt: "The Synthesizer Collective's latest opus is a masterclass in textural layering. We break down why this record deserves your undivided attention.",
    author: "marcus_v",
    avatar: userAvatar,
    cover: albums[0].cover,
    category: "Review",
    readTime: "6 min read",
    date: "Mar 22, 2026",
    likes: 456,
    comments: 67,
  },
  {
    id: "j4",
    title: "The Art of the Curated Playlist in an Algorithmic Age",
    excerpt: "As streaming services push algorithmic recommendations, a growing community of listeners is returning to the art of human curation.",
    author: "VaishuBeats",
    avatar: artists[2].photo,
    cover: albums[3].cover,
    category: "Essay",
    readTime: "10 min read",
    date: "Mar 18, 2026",
    likes: 312,
    comments: 55,
  },
];

const JournalPage = () => {
  const featured = entries[0];
  const rest = entries.slice(1);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Journal</h1>
      <p className="mt-1 text-sm text-muted-foreground">Long-form writing about music, culture, and sound.</p>

      {/* Featured */}
      <div className="mt-8 grid grid-cols-2 gap-8 rounded-lg border border-border bg-card p-6">
        <img src={featured.cover} alt={featured.title} className="aspect-[4/3] w-full rounded-lg object-cover" />
        <div className="flex flex-col justify-center">
          <span className="sonic-badge w-fit">{featured.category}</span>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight">{featured.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
          <div className="mt-4 flex items-center gap-3">
            <img src={featured.avatar} alt={featured.author} className="h-6 w-6 rounded-full object-cover" />
            <span className="text-xs font-semibold text-primary">{featured.author}</span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock size={10} /> {featured.readTime}
            </span>
            <span className="text-[10px] text-muted-foreground">{featured.date}</span>
          </div>
        </div>
      </div>

      {/* Articles list */}
      <div className="mt-10 flex flex-col gap-6">
        {rest.map((entry) => (
          <div key={entry.id} className="flex gap-5 border-b border-border pb-6">
            <img src={entry.cover} alt={entry.title} className="h-28 w-28 shrink-0 rounded-lg object-cover" />
            <div className="flex-1">
              <span className="sonic-badge text-[8px] bg-secondary text-secondary-foreground">{entry.category}</span>
              <h3 className="mt-2 font-display text-lg font-bold leading-snug hover:text-primary transition-colors cursor-pointer">
                {entry.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">{entry.excerpt}</p>
              <div className="mt-3 flex items-center gap-3">
                <img src={entry.avatar} alt={entry.author} className="h-5 w-5 rounded-full object-cover" />
                <span className="text-xs font-semibold text-primary">{entry.author}</span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock size={10} /> {entry.readTime}
                </span>
                <span className="text-[10px] text-muted-foreground">{entry.date}</span>
                <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                  <Heart size={11} /> {entry.likes}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare size={11} /> {entry.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
