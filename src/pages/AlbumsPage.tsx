import { Link } from "react-router-dom";
import { Star, StarHalf, Grid, List, SlidersHorizontal } from "lucide-react";
import { albums, friendActivity } from "@/data/mockData";

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

const AlbumsPage = () => {
  const recentlyReviewed = friendActivity.filter((l) => l.reviewSnippet);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Albums</h1>
          <p className="mt-1 text-sm text-muted-foreground">Browse the community's most logged and reviewed albums.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <SlidersHorizontal size={14} /> Sort & Filter
          </button>
          <button className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Grid size={14} />
          </button>
          <button className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground transition-colors">
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 border-b border-border">
        {["Popular", "New Releases", "Top Rated", "Genre"].map((tab, i) => (
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

      {/* Album Grid */}
      <div className="mt-6 grid grid-cols-5 gap-5">
        {[...albums, ...albums, ...albums].slice(0, 10).map((album, i) => (
          <Link key={`${album.id}-${i}`} to={`/album/${album.id}`} className="group">
            <div className="overflow-hidden rounded-lg border border-border/40 shadow-md">
              <img
                src={album.cover}
                alt={album.title}
                className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="mt-2 text-sm font-bold truncate">{album.title}</h3>
            <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
            <div className="mt-1">
              <Stars rating={album.rating} />
            </div>
          </Link>
        ))}
      </div>

      {/* Recently Reviewed */}
      {recentlyReviewed.length > 0 && (
        <section className="mt-12">
          <div className="border-t border-border pt-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Recently Reviewed by Community
            </h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {recentlyReviewed.map((log) => (
              <div key={log.id} className="sonic-card flex gap-4">
                <Link to={`/album/${log.albumId}`}>
                  <img src={log.albumCover} alt={log.albumTitle} className="h-20 w-14 rounded object-cover" />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <img src={log.avatar} alt={log.username} className="h-5 w-5 rounded-full object-cover" />
                    <span className="text-xs font-semibold text-primary">{log.username}</span>
                  </div>
                  <Link to={`/album/${log.albumId}`} className="mt-1 block text-sm font-bold hover:text-primary transition-colors">
                    {log.albumTitle}
                  </Link>
                  <Stars rating={log.rating} />
                  <p className="mt-1 text-xs text-muted-foreground italic line-clamp-2">{log.reviewSnippet}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AlbumsPage;
