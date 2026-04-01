import { Link } from "react-router-dom";
import { Star, StarHalf, TrendingUp, Clock, Flame } from "lucide-react";
import { albums, artists, trendingTracks } from "@/data/mockData";

const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="inline-flex items-center gap-px text-primary">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
      ))}
      {half && <StarHalf size={12} fill="currentColor" strokeWidth={0} />}
    </span>
  );
};

const ExplorePage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Explore</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Discover what the community is listening to right now.
      </p>

      {/* Genre filters */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {["All", "Electronic", "Jazz", "Alternative", "Classical", "Hip-Hop", "Post-Rock", "Ambient"].map((g, i) => (
          <button
            key={g}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
              i === 0
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Trending Albums */}
      <section className="mt-10">
        <div className="flex items-center gap-2 border-t border-border pt-3">
          <Flame size={14} className="text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Trending Albums
          </h2>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-5">
          {albums.map((album) => (
            <Link key={album.id} to={`/album/${album.id}`} className="group">
              <div className="overflow-hidden rounded-lg border border-border/40 shadow-md">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-3 text-sm font-bold">{album.title}</h3>
              <p className="text-xs text-muted-foreground">{album.artist}</p>
              <div className="mt-1 flex items-center gap-2">
                <Stars rating={album.rating} />
                <span className="text-[10px] text-muted-foreground">{album.genre}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Tracks */}
      <section className="mt-12">
        <div className="flex items-center gap-2 border-t border-border pt-3">
          <TrendingUp size={14} className="text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Trending Tracks
          </h2>
        </div>
        <div className="mt-4 flex flex-col">
          {trendingTracks.map((track, i) => (
            <Link
              key={track.id}
              to={`/track/${track.id}`}
              className="flex items-center gap-4 border-b border-border px-2 py-3.5 transition-colors hover:bg-muted"
            >
              <span className="w-6 text-center font-display text-sm font-bold text-muted-foreground">{i + 1}</span>
              <img src={track.cover} alt={track.title} className="h-10 w-10 rounded object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium">{track.title}</p>
                <p className="text-xs text-muted-foreground">{track.artistName}</p>
              </div>
              <span className="text-xs text-muted-foreground">{track.plays ? `${(track.plays / 1_000_000).toFixed(1)}M` : "—"}</span>
              <span className="text-xs text-muted-foreground">{track.duration}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Artists */}
      <section className="mt-12 pb-16">
        <div className="flex items-center gap-2 border-t border-border pt-3">
          <Clock size={14} className="text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Featured Artists
          </h2>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {artists.map((artist) => (
            <Link key={artist.id} to={`/artist/${artist.id}`} className="sonic-card group flex items-center gap-4">
              <img src={artist.photo} alt={artist.name} className="h-16 w-16 rounded-full object-cover ring-1 ring-border" />
              <div>
                <p className="text-sm font-semibold group-hover:text-primary transition-colors">{artist.name}</p>
                <p className="text-xs text-muted-foreground">{artist.genre}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {(artist.monthlyListeners / 1_000_000).toFixed(1)}M monthly listeners
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;
