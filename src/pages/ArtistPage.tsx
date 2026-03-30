import { useParams, Link } from "react-router-dom";
import { Heart, Globe, Share2, Rss } from "lucide-react";
import { artists } from "@/data/mockData";

const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const artist = artists.find((a) => a.id === id) || artists[0];

  const formatNumber = (n: number) => n.toLocaleString();

  return (
    <div className="px-8 py-10">
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          {/* Artist Header */}
          <div className="flex items-center gap-2 mb-2">
            {artist.verified && <span className="sonic-badge">Verified Artist</span>}
            <span className="sonic-label">{artist.genre}</span>
          </div>
          <div className="flex gap-8">
            <div className="relative">
              <img
                src={artist.photo}
                alt={artist.name}
                className="h-48 w-48 rounded-lg border-2 border-primary object-cover"
                width={192}
                height={192}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-display text-5xl font-bold uppercase">{artist.name}</h1>
              <div className="mt-4 flex gap-8">
                <div>
                  <p className="font-display text-xl font-bold">{formatNumber(artist.monthlyListeners)}</p>
                  <p className="sonic-label">Monthly Listeners</p>
                </div>
                <div>
                  <p className="font-display text-xl font-bold">{formatNumber(artist.followers)}</p>
                  <p className="sonic-label">Followers</p>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button className="rounded-md border border-border px-6 py-2 text-xs font-bold uppercase tracking-wider hover:bg-muted transition-colors">
                  Follow
                </button>
                <button className="rounded-md border border-border px-6 py-2 text-xs font-bold uppercase tracking-wider hover:bg-muted transition-colors">
                  Message
                </button>
              </div>
            </div>
          </div>

          {/* Top Tracks */}
          <div className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="sonic-section-title">Top Tracks</h2>
              <span className="sonic-label text-primary hover:underline cursor-pointer">View All</span>
            </div>
            <div className="mt-4 flex flex-col">
              {artist.topTracks.map((track, i) => (
                <Link
                  key={track.id}
                  to={`/track/${track.id}`}
                  className="flex items-center gap-4 border-b border-border px-2 py-3 transition-colors hover:bg-muted"
                >
                  <span className="w-6 text-center text-sm text-muted-foreground">{i + 1}</span>
                  <img src={track.cover} alt={track.title} className="h-10 w-10 rounded object-cover" loading="lazy" width={40} height={40} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{track.title}</p>
                    <p className="text-xs text-muted-foreground">{track.albumTitle}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{track.plays ? formatNumber(track.plays) : "—"}</span>
                  <span className="text-xs text-muted-foreground">{track.duration}</span>
                  <Heart size={14} className="text-muted-foreground hover:text-sonic-coral transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Albums */}
          <div className="mt-12">
            <h2 className="sonic-section-title">Albums</h2>
            <div className="mt-5 grid grid-cols-3 gap-5">
              {artist.albums.map((album) => (
                <Link key={album.id} to={`/album/${album.id}`} className="group">
                  <img src={album.cover} alt={album.title} className="aspect-square w-full rounded-lg object-cover transition-transform group-hover:scale-105" loading="lazy" width={512} height={512} />
                  <p className="mt-2 text-sm font-semibold group-hover:text-primary transition-colors">{album.title}</p>
                  <p className="text-xs text-muted-foreground">{album.releaseDate} • LP</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* About sidebar */}
        <div>
          <div className="sonic-card">
            <h3 className="font-display text-base font-semibold">About</h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{artist.bio}</p>
            <div className="mt-4 flex gap-3">
              <Globe size={16} className="text-muted-foreground hover:text-foreground cursor-pointer" />
              <Share2 size={16} className="text-muted-foreground hover:text-foreground cursor-pointer" />
              <Rss size={16} className="text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
          </div>

          <div className="mt-5 sonic-card">
            <p className="sonic-label">Upcoming Live</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded bg-sonic-coral text-xs font-bold">
                <span>MAY</span>
                <span className="text-lg leading-none">14</span>
              </div>
              <div>
                <p className="text-sm font-semibold">The Berlin Concourse</p>
                <p className="text-xs text-muted-foreground">Berlin, DE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
