import { Link } from "react-router-dom";
import { Heart, MoreHorizontal } from "lucide-react";
import heroImg from "@/assets/hero-turntable.jpg";
import { albums, trendingTracks, artists } from "@/data/mockData";

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[480px] overflow-hidden">
        <img src={heroImg} alt="Nocturnal Rhythms" className="h-full w-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-12 left-10 max-w-xl">
          <span className="sonic-badge">Editor&apos;s Choice</span>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-tight">
            Nocturnal Rhythms
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            An exploration of the digital-analog divide. Our editors dive deep into the underground synthesis of the decade&apos;s most influential modular sets.
          </p>
          <div className="mt-5 flex gap-3">
            <Link to={`/album/${albums[0].id}`} className="sonic-badge rounded-md px-5 py-2.5 text-xs">
              Read Review
            </Link>
            <button className="rounded-md border border-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-foreground/10">
              Listen Now
            </button>
          </div>
        </div>
      </section>

      {/* Top Albums */}
      <section className="px-8 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="sonic-section-title">Top Albums</h2>
            <p className="sonic-label mt-1">The week&apos;s most impactful releases</p>
          </div>
          <Link to="/explore" className="sonic-label text-primary hover:underline">View All</Link>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-5">
          {albums.map((album) => (
            <Link key={album.id} to={`/album/${album.id}`} className="group">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width={512}
                  height={512}
                />
              </div>
              <h3 className="mt-3 font-display text-sm font-semibold">{album.title}</h3>
              <p className="text-xs text-muted-foreground">{album.artist}</p>
              <p className="sonic-label mt-1 text-primary">{album.genre}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Tracks + Artists */}
      <section className="px-8 pb-16">
        <div className="grid grid-cols-3 gap-8">
          {/* Trending Tracks */}
          <div className="col-span-2">
            <h2 className="sonic-section-title">Trending Tracks</h2>
            <div className="mt-5 flex flex-col gap-1">
              {trendingTracks.map((track, i) => (
                <Link
                  key={track.id}
                  to={`/track/${track.id}`}
                  className="flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-muted"
                >
                  <span className="w-8 text-right font-display text-lg font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <img src={track.cover} alt={track.title} className="h-12 w-12 rounded object-cover" loading="lazy" width={48} height={48} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{track.title}</p>
                    <p className="text-xs text-muted-foreground">{track.artistName}</p>
                  </div>
                  <span className="sonic-label">{track.genre}</span>
                  <span className="text-xs text-muted-foreground">{track.duration}</span>
                  <Heart size={14} className="text-sonic-coral" />
                  <MoreHorizontal size={14} className="text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Artists */}
          <div>
            <h2 className="sonic-section-title">Trending Artists</h2>
            <div className="mt-5 flex flex-col gap-4">
              {artists.map((artist) => (
                <Link key={artist.id} to={`/artist/${artist.id}`} className="flex items-center gap-3 group">
                  <img
                    src={artist.photo}
                    alt={artist.name}
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{artist.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(artist.monthlyListeners / 1000000).toFixed(1)}M Monthly
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
