import { Link } from "react-router-dom";
import { Star, Users, Search } from "lucide-react";
import { artists, userProfile } from "@/data/mockData";
import userAvatar from "@/assets/user-avatar.jpg";

interface Member {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  isPro: boolean;
  albumsLogged: number;
  followers: number;
  reviewCount: number;
}

const members: Member[] = [
  {
    id: "m1",
    username: userProfile.username,
    avatar: userProfile.avatar,
    bio: userProfile.bio,
    isPro: true,
    albumsLogged: 1248,
    followers: 2100,
    reviewCount: 342,
  },
  {
    id: "m2",
    username: "Anirudh_R",
    avatar: artists[0].photo,
    bio: "Deep-diving into the intersections of ambient, noise, and post-industrial music.",
    isPro: false,
    albumsLogged: 876,
    followers: 1400,
    reviewCount: 198,
  },
  {
    id: "m3",
    username: "prarthana",
    avatar: artists[1].photo,
    bio: "Jazz enthusiast and vinyl collector. Writing about music that moves.",
    isPro: true,
    albumsLogged: 2341,
    followers: 5200,
    reviewCount: 567,
  },
  {
    id: "m4",
    username: "VaishuBeats",
    avatar: artists[2].photo,
    bio: "Producer, DJ, and obsessive cataloger of electronic music.",
    isPro: false,
    albumsLogged: 654,
    followers: 890,
    reviewCount: 123,
  },
  {
    id: "m5",
    username: "marcus_v",
    avatar: userAvatar,
    bio: "Pro audiophile. If it's not on vinyl, it doesn't count.",
    isPro: true,
    albumsLogged: 3100,
    followers: 8700,
    reviewCount: 890,
  },
];

const MembersPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Members</h1>
          <p className="mt-1 text-sm text-muted-foreground">The Sonic community of listeners, critics, and curators.</p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2">
          <Search size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search members…"
            className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-48"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 border-b border-border">
        {["Popular", "Most Active", "New", "Following"].map((tab, i) => (
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

      {/* Members grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {members.map((member) => (
          <div key={member.id} className="sonic-card flex gap-4">
            <img src={member.avatar} alt={member.username} className="h-16 w-16 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link to="/profile" className="text-sm font-bold hover:text-primary transition-colors">
                  {member.username}
                </Link>
                {member.isPro && <span className="sonic-badge text-[8px] bg-sonic-coral">PRO</span>}
              </div>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{member.bio}</p>
              <div className="mt-2 flex items-center gap-4">
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Star size={10} className="text-primary" /> {member.albumsLogged.toLocaleString()} logged
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Users size={10} /> {member.followers.toLocaleString()} followers
                </span>
                <span className="text-[10px] text-muted-foreground">{member.reviewCount} reviews</span>
              </div>
            </div>
            <button className="self-start rounded-md border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
