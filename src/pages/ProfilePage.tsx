import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { userProfile, albums, artists } from "@/data/mockData";

const ProfilePage = () => {
  return (
    <div className="px-8 py-10">
      {/* Profile Header */}
      <div className="flex items-center gap-8">
        <img
          src={userProfile.avatar}
          alt={userProfile.username}
          className="h-32 w-32 rounded-lg object-cover"
          width={128}
          height={128}
        />
        <div>
          <h1 className="font-display text-4xl font-bold">{userProfile.username}</h1>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">{userProfile.bio}</p>
          {userProfile.isPro && <span className="sonic-badge mt-2 bg-sonic-coral">Pro Member</span>}
          <div className="mt-4 flex gap-6">
            {[
              { value: userProfile.albumsLogged.toLocaleString(), label: "Albums Logged" },
              { value: userProfile.listsCreated, label: "Lists Created" },
              { value: userProfile.following, label: "Following" },
              { value: `${(userProfile.followers / 1000).toFixed(1)}k`, label: "Followers" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-xl font-bold text-primary">{s.value}</p>
                <p className="sonic-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Logged */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="sonic-section-title">Recently Logged</h2>
          <span className="sonic-label text-primary hover:underline cursor-pointer">View History</span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {albums.slice(0, 3).map((album) => (
            <Link key={album.id} to={`/album/${album.id}`} className="group">
              <img src={album.cover} alt={album.title} className="aspect-square w-full rounded-lg object-cover transition-transform group-hover:scale-105" loading="lazy" width={512} height={512} />
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">{album.title}</p>
                  <p className="text-xs text-muted-foreground">{album.artist}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} className="fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Your Lists */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="sonic-section-title">Your Lists</h2>
          <span className="sonic-label text-primary hover:underline cursor-pointer">Create New</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="sonic-card">
            <span className="sonic-badge bg-sonic-coral">Pinned Collection</span>
            <h3 className="mt-3 font-display text-xl font-bold uppercase">The Dark Ambient Manifesto</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              128 essential tracks for late-night programming sessions and rainy urban commutes.
            </p>
          </div>
          <div className="sonic-card flex flex-col items-center justify-center">
            <div className="grid grid-cols-2 gap-1">
              {albums.slice(0, 4).map((a) => (
                <img key={a.id} src={a.cover} alt={a.title} className="h-16 w-16 rounded object-cover" loading="lazy" width={64} height={64} />
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold">Morning Clarity</p>
            <p className="text-xs text-muted-foreground">34 Albums • Last updated 2d ago</p>
          </div>
        </div>
      </section>

      {/* Top Artists */}
      <section className="mt-12 pb-8">
        <div className="flex items-center justify-between">
          <h2 className="sonic-section-title">Top Artists</h2>
          <div className="flex gap-2">
            <button className="rounded-full border border-border p-1.5 hover:bg-muted transition-colors"><ChevronLeft size={14} /></button>
            <button className="rounded-full border border-border p-1.5 hover:bg-muted transition-colors"><ChevronRight size={14} /></button>
          </div>
        </div>
        <div className="mt-5 flex gap-6">
          {artists.map((artist) => (
            <Link key={artist.id} to={`/artist/${artist.id}`} className="group flex flex-col items-center">
              <img src={artist.photo} alt={artist.name} className="h-24 w-24 rounded-full object-cover transition-transform group-hover:scale-105" loading="lazy" width={96} height={96} />
              <p className="mt-2 text-sm font-semibold group-hover:text-primary transition-colors">{artist.name}</p>
              <p className="sonic-label">{artist.genre.split("/")[0].trim()}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
