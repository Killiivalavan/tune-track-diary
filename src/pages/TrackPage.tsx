import { useParams, Link } from "react-router-dom";
import { Play, Share2, Star, Heart, ListMusic, FolderPlus, ChevronRight } from "lucide-react";
import { albums, reviews } from "@/data/mockData";

const TrackPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find track across all albums
  const allTracks = albums.flatMap((a) => a.tracks);
  const track = allTracks.find((t) => t.id === id) || allTracks[0];
  const album = albums.find((a) => a.id === track?.albumId) || albums[0];
  const relatedTracks = album.tracks.filter((t) => t.id !== track?.id).slice(0, 3);

  if (!track) return <div className="p-8">Track not found</div>;

  return (
    <div className="px-8 py-10">
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          {/* Track Header */}
          <div className="flex gap-8">
            <img src={track.cover} alt={track.title} className="h-56 w-56 rounded-lg object-cover" width={224} height={224} />
            <div className="flex flex-col justify-center">
              <span className="sonic-label text-primary">Single Track</span>
              <h1 className="mt-1 font-display text-5xl font-bold leading-tight">{track.title}</h1>
              <div className="mt-4 flex gap-8">
                {[
                  { label: "Artist", value: track.artistName },
                  { label: "Album", value: track.albumTitle },
                  { label: "Released", value: album.releaseDate },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="sonic-label">{m.label}</p>
                    <p className="text-sm font-semibold">{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-muted transition-colors">
                  <Play size={14} /> Play Track
                </button>
                <button className="flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-muted transition-colors">
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="mt-10">
            <h2 className="sonic-section-title border-b border-border pb-3">Technical Specs</h2>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[
                { label: "Duration", value: track.duration },
                { label: "BPM", value: String(track.bpm) },
                { label: "Genre", value: track.genre },
                { label: "Label", value: track.label },
              ].map((s) => (
                <div key={s.label} className="sonic-card">
                  <p className="sonic-label">{s.label}</p>
                  <p className="mt-1 font-display text-lg font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Listener Discourse */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="sonic-section-title">Listener Discourse</h2>
              <span className="sonic-label text-primary">248 Reviews</span>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {reviews.map((r) => (
                <div key={r.id} className="sonic-card">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.username} className="h-8 w-8 rounded-full object-cover" loading="lazy" width={32} height={32} />
                    <p className="text-sm font-medium">{r.username}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={10} className="fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground italic">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* From the Same Album */}
          <div className="mt-10">
            <h2 className="sonic-section-title">From the Same Echo</h2>
            <div className="mt-5 grid grid-cols-3 gap-5">
              {relatedTracks.map((t) => (
                <Link key={t.id} to={`/track/${t.id}`} className="group">
                  <img src={t.cover} alt={t.title} className="aspect-square w-full rounded-lg object-cover transition-transform group-hover:scale-105" loading="lazy" width={512} height={512} />
                  <p className="mt-2 text-sm font-semibold group-hover:text-primary transition-colors">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.artistName}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Interaction Hub Sidebar */}
        <div>
          <div className="sonic-card">
            <h3 className="font-display text-base font-semibold">Interaction Hub</h3>
            <p className="sonic-label mt-3">Personal Rating</p>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={24} className="fill-primary text-primary cursor-pointer hover:scale-110 transition-transform" />
              ))}
            </div>
            <p className="sonic-label mt-4">Log Thoughts</p>
            <textarea
              placeholder="How does this soundscape feel?"
              className="mt-2 w-full rounded-md border border-border bg-muted p-3 text-xs text-foreground placeholder:text-muted-foreground outline-none resize-none h-24"
            />
            <button className="mt-3 w-full rounded-md bg-primary py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors">
              Log Track
            </button>

            <div className="mt-5 flex flex-col gap-2">
              {[
                { icon: ListMusic, label: "Listen List" },
                { icon: Heart, label: "Add to Favorites" },
                { icon: FolderPlus, label: "Add to Collection" },
              ].map((item) => (
                <button key={item.label} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs transition-colors hover:bg-muted">
                  <item.icon size={14} className="text-primary" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronRight size={14} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 sonic-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Global Popularity</span>
              <span className="font-display text-sm font-bold text-primary">#14 Trending</span>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
              <div className="h-full w-3/4 rounded-full bg-primary" />
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-[10px] text-muted-foreground">1.2M Streams</span>
              <span className="text-[10px] text-muted-foreground">Top 1% of Genre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
