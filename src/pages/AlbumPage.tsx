import { useParams, Link } from "react-router-dom";
import { Play, Plus, MoreHorizontal, Star, Heart, MessageSquare, ListMusic, FolderPlus, ChevronRight } from "lucide-react";
import { albums, reviews } from "@/data/mockData";

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const album = albums.find((a) => a.id === id) || albums[0];

  return (
    <div className="px-8 py-10">
      <div className="grid grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="col-span-2">
          {/* Album Header */}
          <div className="flex gap-8">
            <img src={album.cover} alt={album.title} className="h-56 w-56 rounded-lg object-cover" width={224} height={224} />
            <div className="flex flex-col justify-center">
              <span className="sonic-badge text-primary">Masterpiece Edition</span>
              <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-tight">{album.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">by {album.artist}</p>
              <div className="mt-5 flex gap-3">
                <button className="flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-muted">
                  <Play size={14} /> Play Album
                </button>
                <button className="flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-muted">
                  <Plus size={14} /> Queue
                </button>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-8 flex gap-6">
            {[
              { label: "Release Date", value: album.releaseDate },
              { label: "Genre", value: album.genre },
              { label: "Label", value: album.label },
              { label: "Duration", value: album.duration },
            ].map((m) => (
              <div key={m.label} className="sonic-card min-w-[100px]">
                <p className="sonic-label">{m.label}</p>
                <p className="mt-1 font-display text-sm font-semibold">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Tracklist */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="sonic-section-title">Tracklist</h2>
              <span className="text-sm text-muted-foreground">{album.tracks.length} Tracks</span>
            </div>
            <div className="mt-4 flex flex-col">
              {album.tracks.map((track) => (
                <Link
                  key={track.id}
                  to={`/track/${track.id}`}
                  className="flex items-center gap-4 border-b border-border px-2 py-3.5 transition-colors hover:bg-muted"
                >
                  <span className="w-8 text-right text-sm text-muted-foreground">
                    {String(track.number).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{track.title}</p>
                    {track.explicit && <span className="sonic-label text-muted-foreground">Explicit Content</span>}
                  </div>
                  <span className="text-sm text-muted-foreground">{track.duration}</span>
                  <MoreHorizontal size={14} className="text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="sonic-section-title">Critic & Fan Reviews</h2>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold text-primary">{album.rating}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="sonic-card">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {review.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{review.username}</p>
                      <p className="sonic-label">{review.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={10} className="fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground italic">{review.text}</p>
                  <div className="mt-3 flex gap-4">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart size={12} /> {review.likes}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageSquare size={12} /> {review.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Related */}
        <div>
          {/* Interaction Hub */}
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
              placeholder="How does this album feel?"
              className="mt-2 w-full rounded-md border border-border bg-muted p-3 text-xs text-foreground placeholder:text-muted-foreground outline-none resize-none h-24"
            />
            <button className="mt-3 w-full rounded-md bg-primary py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors">
              Log Album
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

          {/* Related Echoes */}
          <div className="mt-5 sonic-card">
            <h3 className="font-display text-base font-semibold">Related Echoes</h3>
            <div className="mt-4 flex flex-col gap-4">
              {albums.filter((a) => a.id !== album.id).slice(0, 3).map((a) => (
                <Link key={a.id} to={`/album/${a.id}`} className="group">
                  <img src={a.cover} alt={a.title} className="w-full rounded-lg object-cover aspect-[4/3]" loading="lazy" width={512} height={384} />
                  <p className="mt-2 text-sm font-semibold group-hover:text-primary transition-colors">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.artist}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-sonic-coral/20 p-5">
            <p className="font-display text-base font-bold">Sonic Reach</p>
            <p className="mt-2 text-xs text-muted-foreground">
              This album is trending in <span className="text-foreground font-semibold">14 countries</span> and has been added to over{" "}
              <span className="text-foreground font-semibold">2.4k curated lists</span> this week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
