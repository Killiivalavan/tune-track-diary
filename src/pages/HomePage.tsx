import { Link } from "react-router-dom";
import { Heart, RotateCcw, Star, StarHalf, MessageSquare } from "lucide-react";
import {
  friendActivity,
  popularWithFriends,
  albums,
  artists,
  userProfile,
  type ActivityLog,
} from "@/data/mockData";

/* ── Star renderer ── */
const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="inline-flex items-center gap-px text-primary">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
      ))}
      {half && <StarHalf size={13} fill="currentColor" strokeWidth={0} />}
    </span>
  );
};

/* ── Activity card (Letterboxd-style) ── */
const ActivityCard = ({ log }: { log: ActivityLog }) => (
  <div className="group w-[170px] shrink-0">
    {/* Cover */}
    <Link to={`/album/${log.albumId}`} className="block overflow-hidden rounded-md border border-border/40 shadow-md">
      <img
        src={log.albumCover}
        alt={log.albumTitle}
        className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        width={340}
        height={510}
      />
    </Link>

    {/* User badge */}
    <div className="mt-2 flex items-center gap-1.5">
      <img src={log.avatar} alt={log.username} className="h-5 w-5 rounded-full object-cover ring-1 ring-primary/40" />
      <span className="text-xs font-semibold text-primary truncate">{log.username}</span>
    </div>

    {/* Rating row */}
    <div className="mt-1 flex items-center gap-2">
      <Stars rating={log.rating} />
      {log.rewatch && <RotateCcw size={11} className="text-muted-foreground" />}
      {log.liked && <Heart size={11} className="text-destructive" fill="currentColor" />}
    </div>

    {/* Date */}
    <p className="mt-0.5 text-[10px] text-muted-foreground">{log.date}</p>
  </div>
);

/* ── Page ── */
const HomePage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Welcome */}
      <section className="pb-6 pt-10 text-center">
        <p className="text-lg text-muted-foreground">
          Welcome back,{" "}
          <Link to="/profile" className="font-bold text-foreground underline decoration-primary underline-offset-4">
            {userProfile.username}
          </Link>
          . Here&apos;s what your friends have been listening to…
        </p>
      </section>

      {/* ── NEW FROM FRIENDS ── */}
      <section>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            New From Friends
          </h2>
          <Link to="/activity" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            ⚡ All Activity
          </Link>
        </div>

        <div className="mt-5 flex gap-5 overflow-x-auto pb-4 scrollbar-none">
          {friendActivity.map((log) => (
            <ActivityCard key={log.id} log={log} />
          ))}
        </div>
      </section>

      {/* ── PRO BANNER ── */}
      <section className="my-8 rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
        <h3 className="font-display text-lg font-bold uppercase text-primary">
          Ever dreamt of a better version of your listening stats?
        </h3>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Get annual and all-time stats, filter by genre, watchlist notifications, no third-party ads and more…
        </p>
        <button className="mt-4 rounded-md bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors">
          Upgrade to PRO
        </button>
      </section>

      {/* ── POPULAR WITH FRIENDS ── */}
      <section>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Popular With Friends
          </h2>
          <Link to="/explore" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            More
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-6 gap-4">
          {popularWithFriends.map((item, i) => (
            <Link key={i} to={`/album/${item.albumId}`} className="group overflow-hidden rounded-md border border-border/40 shadow-md">
              <img
                src={item.cover}
                alt={item.title}
                className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                width={300}
                height={450}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── RECENT REVIEWS ── */}
      <section className="mt-12">
        <div className="flex items-center justify-between border-t border-border pt-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Latest Reviews
          </h2>
          <Link to="/reviews" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            More
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {friendActivity
            .filter((l) => l.reviewSnippet)
            .map((log) => (
              <div key={log.id} className="flex gap-4 rounded-lg border border-border bg-card p-4">
                <Link to={`/album/${log.albumId}`}>
                  <img src={log.albumCover} alt={log.albumTitle} className="h-24 w-16 rounded object-cover" />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <img src={log.avatar} alt={log.username} className="h-5 w-5 rounded-full object-cover" />
                    <span className="text-xs font-semibold text-primary">{log.username}</span>
                    <span className="text-[10px] text-muted-foreground">{log.date}</span>
                  </div>
                  <Link to={`/album/${log.albumId}`} className="mt-1 block text-sm font-bold hover:text-primary transition-colors">
                    {log.albumTitle}
                  </Link>
                  <Stars rating={log.rating} />
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {log.reviewSnippet}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-muted-foreground">
                    <button className="flex items-center gap-1 text-[10px] hover:text-primary transition-colors">
                      <Heart size={11} /> Like
                    </button>
                    <button className="flex items-center gap-1 text-[10px] hover:text-primary transition-colors">
                      <MessageSquare size={11} /> Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ── TRENDING (explore-style) ── */}
      <section className="mt-12 pb-16">
        <div className="flex items-center justify-between border-t border-border pt-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Trending This Week
          </h2>
          <Link to="/explore" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            View All
          </Link>
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
                  width={512}
                  height={512}
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

      {/* ── TRENDING ARTISTS ── */}
      <section className="pb-16">
        <div className="flex items-center justify-between border-t border-border pt-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Trending Artists
          </h2>
        </div>
        <div className="mt-5 flex gap-6">
          {artists.map((artist) => (
            <Link key={artist.id} to={`/artist/${artist.id}`} className="group flex items-center gap-3">
              <img src={artist.photo} alt={artist.name} className="h-12 w-12 rounded-full object-cover ring-1 ring-border" />
              <div>
                <p className="text-sm font-semibold group-hover:text-primary transition-colors">{artist.name}</p>
                <p className="text-[10px] text-muted-foreground">{(artist.monthlyListeners / 1_000_000).toFixed(1)}M monthly</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
