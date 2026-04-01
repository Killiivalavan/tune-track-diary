import { Link } from "react-router-dom";
import { Heart, RotateCcw, Star, StarHalf, MessageSquare, Filter } from "lucide-react";
import { friendActivity, type ActivityLog } from "@/data/mockData";

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

const ActivityRow = ({ log }: { log: ActivityLog }) => (
  <div className="flex gap-4 border-b border-border py-4">
    <Link to={`/album/${log.albumId}`}>
      <img src={log.albumCover} alt={log.albumTitle} className="h-20 w-14 rounded object-cover" />
    </Link>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <img src={log.avatar} alt={log.username} className="h-5 w-5 rounded-full object-cover ring-1 ring-primary/40" />
        <span className="text-xs font-semibold text-primary">{log.username}</span>
        <span className="text-[10px] text-muted-foreground">{log.date}</span>
      </div>
      <Link to={`/album/${log.albumId}`} className="mt-1 block text-sm font-bold hover:text-primary transition-colors">
        {log.albumTitle}
      </Link>
      <p className="text-xs text-muted-foreground">{log.artistName}</p>
      <div className="mt-1.5 flex items-center gap-3">
        <Stars rating={log.rating} />
        {log.rewatch && (
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <RotateCcw size={10} /> Re-listen
          </span>
        )}
        {log.liked && <Heart size={11} className="text-destructive" fill="currentColor" />}
      </div>
      {log.reviewSnippet && (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground italic line-clamp-2">
          {log.reviewSnippet}
        </p>
      )}
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
);

const ActivityPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h1 className="font-display text-3xl font-bold">Friend Activity</h1>
        <button className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-1 border-b border-border">
        {["All", "Reviews", "Ratings", "Lists"].map((tab, i) => (
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

      <div className="mt-2">
        {friendActivity.map((log) => (
          <ActivityRow key={log.id} log={log} />
        ))}
        {/* Repeat for more content */}
        {friendActivity.map((log) => (
          <ActivityRow key={`dup-${log.id}`} log={log} />
        ))}
      </div>
    </div>
  );
};

export default ActivityPage;
