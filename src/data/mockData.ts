import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import track1 from "@/assets/track-1.jpg";
import track2 from "@/assets/track-2.jpg";
import track3 from "@/assets/track-3.jpg";
import userAvatar from "@/assets/user-avatar.jpg";

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  cover: string;
  genre: string;
  releaseDate: string;
  label: string;
  duration: string;
  rating: number;
  tracks: Track[];
}

export interface Track {
  id: string;
  number: number;
  title: string;
  duration: string;
  albumId: string;
  albumTitle: string;
  artistName: string;
  cover: string;
  genre: string;
  bpm: number;
  label: string;
  explicit?: boolean;
  plays?: number;
}

export interface Artist {
  id: string;
  name: string;
  photo: string;
  genre: string;
  monthlyListeners: number;
  followers: number;
  bio: string;
  verified: boolean;
  albums: Album[];
  topTracks: Track[];
}

export interface Review {
  id: string;
  username: string;
  avatar: string;
  role: string;
  rating: number;
  text: string;
  likes: number;
  comments: number;
  date: string;
}

export interface UserProfile {
  username: string;
  avatar: string;
  bio: string;
  isPro: boolean;
  albumsLogged: number;
  listsCreated: number;
  following: number;
  followers: number;
}

/** A log entry from a friend / community member */
export interface ActivityLog {
  id: string;
  username: string;
  avatar: string;
  albumId: string;
  albumTitle: string;
  albumCover: string;
  artistName: string;
  rating: number;       // 0-5, half-stars stored as 0.5 increments
  liked: boolean;
  date: string;         // display date
  reviewSnippet?: string;
  rewatch?: boolean;     // "re-listen"
}

export const albums: Album[] = [
  {
    id: "electric-dreams",
    title: "Electric Dreams",
    artist: "The Synthesizer Collective",
    artistId: "synth-noir",
    cover: album1,
    genre: "Electronic",
    releaseDate: "Oct 24, 2024",
    label: "Signal Form",
    duration: "54:12",
    rating: 4.8,
    tracks: [],
  },
  {
    id: "midnight-session",
    title: "Midnight Session",
    artist: "Soul Quintet",
    artistId: "soul-quintet",
    cover: album2,
    genre: "Jazz Revival",
    releaseDate: "Sep 15, 2024",
    label: "Analog Press",
    duration: "48:30",
    rating: 4.6,
    tracks: [],
  },
  {
    id: "static-void",
    title: "Static Void",
    artist: "Velvet Echo",
    artistId: "velvet-echo",
    cover: album3,
    genre: "Alternative",
    releaseDate: "Aug 02, 2024",
    label: "Void Records",
    duration: "42:18",
    rating: 4.3,
    tracks: [],
  },
  {
    id: "golden-hour",
    title: "Golden Hour",
    artist: "Aura Chamber",
    artistId: "aura-chamber",
    cover: album4,
    genre: "Classical Modern",
    releaseDate: "Jul 10, 2024",
    label: "Horizon Music",
    duration: "62:05",
    rating: 4.9,
    tracks: [],
  },
];

const neonEchoTracks: Track[] = [
  { id: "t1", number: 1, title: "Digital Mirage", duration: "04:32", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track1, genre: "IDM / Techno", bpm: 128, label: "Signal Form", explicit: true },
  { id: "t2", number: 2, title: "Spectral Flow", duration: "05:11", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track2, genre: "IDM / Techno", bpm: 132, label: "Signal Form" },
  { id: "t3", number: 3, title: "Kinetic Static", duration: "03:58", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track3, genre: "IDM / Techno", bpm: 125, label: "Signal Form" },
  { id: "t4", number: 4, title: "Sub-Zero Pulse", duration: "06:22", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track1, genre: "IDM / Techno", bpm: 140, label: "Signal Form" },
  { id: "t5", number: 5, title: "Phantom Circuit", duration: "04:45", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track2, genre: "IDM / Techno", bpm: 130, label: "Signal Form" },
  { id: "t6", number: 6, title: "Neon Drift", duration: "05:30", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track3, genre: "IDM / Techno", bpm: 136, label: "Signal Form" },
  { id: "t7", number: 7, title: "Void Sequence", duration: "03:42", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track1, genre: "IDM / Techno", bpm: 122, label: "Signal Form" },
  { id: "t8", number: 8, title: "Lucid Terminal", duration: "04:18", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track2, genre: "IDM / Techno", bpm: 128, label: "Signal Form" },
  { id: "t9", number: 9, title: "Deep Resonance", duration: "06:01", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track3, genre: "IDM / Techno", bpm: 118, label: "Signal Form" },
  { id: "t10", number: 10, title: "Signal Lost", duration: "03:15", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track1, genre: "IDM / Techno", bpm: 145, label: "Signal Form" },
  { id: "t11", number: 11, title: "Echo Chamber", duration: "04:55", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track2, genre: "IDM / Techno", bpm: 133, label: "Signal Form" },
  { id: "t12", number: 12, title: "System Reboot", duration: "05:43", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "The Synthesizer Collective", cover: track3, genre: "IDM / Techno", bpm: 126, label: "Signal Form" },
];
albums[0].tracks = neonEchoTracks;

export const artists: Artist[] = [
  {
    id: "synth-noir",
    name: "Synth Noir",
    photo: artist1,
    genre: "Electronic / Avant-Garde",
    monthlyListeners: 2482910,
    followers: 841003,
    bio: "Synth Noir is the electronic project of visual artist turned producer Silas Thorne. Merging cold-wave aesthetics with modern cinematic soundscapes, the project has become a staple of late-night sonic exploration. Based in Berlin, Thorne utilizes a modular-heavy workflow to create textures that are both mechanical and deeply emotive.",
    verified: true,
    albums: [albums[0], albums[2]],
    topTracks: neonEchoTracks.slice(0, 3),
  },
  {
    id: "kaelen-vance",
    name: "Kaelen Vance",
    photo: artist2,
    genre: "Neo-Electro",
    monthlyListeners: 1200000,
    followers: 320000,
    bio: "Rising producer blending classical training with electronic production.",
    verified: false,
    albums: [albums[1]],
    topTracks: neonEchoTracks.slice(3, 6),
  },
  {
    id: "echo-station",
    name: "Echo Station",
    photo: artist3,
    genre: "Post-Rock",
    monthlyListeners: 890000,
    followers: 215000,
    bio: "Ambient post-rock collective from Portland.",
    verified: true,
    albums: [albums[3]],
    topTracks: neonEchoTracks.slice(6, 9),
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    username: "marcus_v",
    avatar: userAvatar,
    role: "PRO MEMBER",
    rating: 5,
    text: '"System Overload has outdone themselves. The production clarity on \'Spectral Flow\' is something you only hear once a decade. An absolute must-listen on high-fidelity monitors."',
    likes: 124,
    comments: 12,
    date: "2 days ago",
  },
  {
    id: "r2",
    username: "elara_noise",
    avatar: userAvatar,
    role: "SONIC CURATOR",
    rating: 5,
    text: '"A bit too aggressive in the mid-range for my personal taste, but the artistic direction is undeniable. This is what the future of IDM looks like."',
    likes: 89,
    comments: 5,
    date: "1 week ago",
  },
];

export const trendingTracks: Track[] = [
  { id: "tt1", number: 1, title: "Linear Velocity", duration: "3:42", albumId: "electric-dreams", albumTitle: "Electric Dreams", artistName: "Prism Theory", cover: album1, genre: "Neo-Electro", bpm: 128, label: "Signal Form", plays: 1250000 },
  { id: "tt2", number: 2, title: "Ghost Frequency", duration: "5:15", albumId: "midnight-session", albumTitle: "Midnight Session", artistName: "The Signal", cover: album2, genre: "Ambient", bpm: 95, label: "Analog Press", plays: 980000 },
  { id: "tt3", number: 3, title: "Azure Sky", duration: "4:08", albumId: "static-void", albumTitle: "Static Void", artistName: "Loom", cover: album3, genre: "Post-Rock", bpm: 110, label: "Void Records", plays: 870000 },
];

export const userProfile: UserProfile = {
  username: "Julian_Vibe",
  avatar: userAvatar,
  bio: "Curating the intersection of ambient textures and industrial noise. Collecting rare pressings and documenting the evolution of high-fidelity sound.",
  isPro: true,
  albumsLogged: 1248,
  listsCreated: 42,
  following: 893,
  followers: 2100,
};

/* ── Friend Activity Feed ── */
export const friendActivity: ActivityLog[] = [
  {
    id: "a1",
    username: "Anirudh_R",
    avatar: artist1,
    albumId: "electric-dreams",
    albumTitle: "Electric Dreams",
    albumCover: album1,
    artistName: "The Synthesizer Collective",
    rating: 3.5,
    liked: false,
    date: "Mar 27",
    rewatch: true,
  },
  {
    id: "a2",
    username: "prarthana",
    avatar: artist2,
    albumId: "midnight-session",
    albumTitle: "Midnight Session",
    albumCover: album2,
    artistName: "Soul Quintet",
    rating: 3.5,
    liked: false,
    date: "Mar 28",
  },
  {
    id: "a3",
    username: "prarthana",
    avatar: artist2,
    albumId: "static-void",
    albumTitle: "Static Void",
    albumCover: album3,
    artistName: "Velvet Echo",
    rating: 5,
    liked: true,
    date: "Mar 28",
  },
  {
    id: "a4",
    username: "prarthana",
    avatar: artist2,
    albumId: "golden-hour",
    albumTitle: "Golden Hour",
    albumCover: album4,
    artistName: "Aura Chamber",
    rating: 4.5,
    liked: false,
    date: "Mar 28",
  },
  {
    id: "a5",
    username: "VaishuBeats",
    avatar: artist3,
    albumId: "electric-dreams",
    albumTitle: "Electric Dreams",
    albumCover: album1,
    artistName: "The Synthesizer Collective",
    rating: 4,
    liked: true,
    date: "Mar 21",
    reviewSnippet: "The layering on this record is phenomenal. Each listen reveals something new.",
  },
  {
    id: "a6",
    username: "marcus_v",
    avatar: userAvatar,
    albumId: "midnight-session",
    albumTitle: "Midnight Session",
    albumCover: album2,
    artistName: "Soul Quintet",
    rating: 4.5,
    liked: true,
    date: "Mar 26",
    reviewSnippet: "Soul Quintet keeps pushing jazz into thrilling new territory.",
  },
];

export const popularWithFriends: { albumId: string; cover: string; title: string }[] = [
  { albumId: "static-void", cover: album3, title: "Static Void" },
  { albumId: "electric-dreams", cover: album1, title: "Electric Dreams" },
  { albumId: "midnight-session", cover: album2, title: "Midnight Session" },
  { albumId: "golden-hour", cover: album4, title: "Golden Hour" },
  { albumId: "electric-dreams", cover: track1, title: "Digital Mirage (Single)" },
  { albumId: "midnight-session", cover: track2, title: "Spectral Flow (Single)" },
];
