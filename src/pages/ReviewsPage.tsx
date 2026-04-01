import { Link } from "react-router-dom";
import { Star, StarHalf, Heart, MessageSquare } from "lucide-react";
import { friendActivity, reviews as globalReviews, albums } from "@/data/mockData";

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

const ReviewsPage = () => {
  const reviewLogs = friendActivity.filter((l) => l.reviewSnippet);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Reviews</h1>
      <p className="mt-1 text-sm text-muted-foreground">What the community is saying about the music they love.</p>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 border-b border-border">
        {["Popular", "Recent", "Friends", "Following"].map((tab, i) => (
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

      {/* Reviews */}
      <div className="mt-6 flex flex-col gap-5">
        {/* Full reviews from globalReviews */}
        {globalReviews.map((review) => (
          <div key={review.id} className="sonic-card flex gap-5">
            <Link to={`/album/${albums[0].id}`}>
              <img src={albums[0].cover} alt={albums[0].title} className="h-24 w-16 shrink-0 rounded object-cover" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {review.username[0].toUpperCase()}
                </div>
                <span className="text-xs font-semibold">{review.username}</span>
                <span className="sonic-badge text-[8px]">{review.role}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">{review.date}</span>
              </div>
              <Link to={`/album/${albums[0].id}`} className="mt-2 block text-sm font-bold hover:text-primary transition-colors">
                {albums[0].title} — {albums[0].artist}
              </Link>
              <div className="mt-1">
                <Stars rating={review.rating} />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground italic">{review.text}</p>
              <div className="mt-3 flex items-center gap-4 text-muted-foreground">
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                  <Heart size={12} /> {review.likes}
                </button>
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                  <MessageSquare size={12} /> {review.comments}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* From activity feed */}
        {reviewLogs.map((log) => (
          <div key={log.id} className="sonic-card flex gap-5">
            <Link to={`/album/${log.albumId}`}>
              <img src={log.albumCover} alt={log.albumTitle} className="h-24 w-16 shrink-0 rounded object-cover" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <img src={log.avatar} alt={log.username} className="h-6 w-6 rounded-full object-cover" />
                <span className="text-xs font-semibold">{log.username}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">{log.date}</span>
              </div>
              <Link to={`/album/${log.albumId}`} className="mt-2 block text-sm font-bold hover:text-primary transition-colors">
                {log.albumTitle} — {log.artistName}
              </Link>
              <div className="mt-1">
                <Stars rating={log.rating} />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground italic">{log.reviewSnippet}</p>
              <div className="mt-3 flex items-center gap-4 text-muted-foreground">
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                  <Heart size={12} /> Like
                </button>
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                  <MessageSquare size={12} /> Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
