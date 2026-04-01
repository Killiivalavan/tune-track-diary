# Sonic Editorial — Application Flow Document

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser (SPA)                     │
│  ┌───────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  React    │  │  Router  │  │  TanStack Query  │ │
│  │  18 + TSX │  │  v6      │  │  (Server State)  │ │
│  └───────────┘  └──────────┘  └──────────────────┘ │
│  ┌───────────────────────────────────────────────┐  │
│  │           Tailwind + shadcn/ui                │  │
│  │     (Design System / Component Library)       │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────┘
                      │ HTTPS (REST API)
┌─────────────────────▼───────────────────────────────┐
│              Lovable Cloud (Planned)                │
│  ┌─────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │  Auth   │  │  Edge    │  │  File Storage    │   │
│  │  (JWT)  │  │  Funcs   │  │  (Avatars, etc.) │   │
│  └─────────┘  └──────────┘  └──────────────────┘   │
│  ┌───────────────────────────────────────────────┐  │
│  │              PostgreSQL                       │  │
│  │  (Users, Albums, Reviews, Lists, Logs, etc.)  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 2. Route Map

| Route | Page Component | Description |
|-------|---------------|-------------|
| `/` | `HomePage` | Social feed — friend activity, popular, reviews, trending |
| `/album/:id` | `AlbumPage` | Album detail — metadata, tracklist, reviews, interaction hub |
| `/artist/:id` | `ArtistPage` | Artist profile — bio, top tracks, discography, events |
| `/track/:id` | `TrackPage` | Track detail — specs, discourse, interaction hub |
| `/profile` | `ProfilePage` | User profile — stats, logged albums, lists, top artists |
| `/activity` | `ActivityPage` | Full friend activity feed with filters |
| `/explore` | `ExplorePage` | Discovery — trending albums/tracks, featured artists, genre filter |
| `/albums` | `AlbumsPage` | Album directory — grid/list view, sort, filter, community reviews |
| `/lists` | `ListsPage` | Community lists — browse, create, like |
| `/members` | `MembersPage` | Member directory — search, follow, view stats |
| `/journal` | `JournalPage` | Editorial content — articles, essays, reviews |
| `/reviews` | `ReviewsPage` | Reviews feed — popular, recent, friends |
| `/settings` | `SettingsPage` | Account management — profile, preferences, subscription |
| `*` | `NotFound` | 404 error page |

---

## 3. User Flows

### 3.1 First-Time Visitor
```
Landing (/) → Browse trending → Click album → AlbumPage
                                            → Read reviews
                                            → Sign up prompt (future)
```

### 3.2 Returning User (Logged In)
```
Home (/) → See friend activity → Click album cover → AlbumPage
        → See latest reviews  → Click reply        → Review thread
        → Click "Log" button  → Log album modal    → Rate + review
```

### 3.3 Logging an Album
```
AlbumPage → Interaction Hub (sidebar)
          → Set star rating (1-5, half stars)
          → Write thoughts (optional textarea)
          → Click "Log Album"
          → Appears in activity feed + profile history
```

### 3.4 Creating a List
```
ListsPage → Click "New List"
          → Enter title + description
          → Search and add albums
          → Drag to reorder
          → Publish (public/private)
```

### 3.5 Writing a Review
```
AlbumPage → Interaction Hub → Write longer review
         → Set rating
         → Submit
         → Appears on album page + reviews feed + friend activity
```

### 3.6 Discovering Music
```
ExplorePage → Filter by genre
            → Browse trending albums/tracks
            → Click artist → ArtistPage → Discography
            → Click album → AlbumPage → Log/review
```

### 3.7 Social Interaction
```
HomePage → See friend's review → Like it
        → Click reply → Write comment
        → Click friend's avatar → Their profile
        → Follow/unfollow
```

---

## 4. Layout Architecture

```
┌──────────────────────────────────────────────┐
│  Navbar (fixed top, z-40)                    │
│  [SONIC] [avatar▾] [Albums][Lists][Members]  │
│  [Journal]                    [🔍][🔔][+Log] │
├──────────────────────────────────────────────┤
│                                              │
│  <main> (pt-14, max-w-6xl centered)          │
│                                              │
│    ┌────────────────────────────────────┐     │
│    │  <Outlet /> (page content)        │     │
│    │                                   │     │
│    │  Some pages use 2/3 + 1/3 grid:   │     │
│    │  ┌──────────┐  ┌────────┐         │     │
│    │  │ Main     │  │Sidebar │         │     │
│    │  │ Content  │  │(Hub,   │         │     │
│    │  │          │  │ Related)│         │     │
│    │  └──────────┘  └────────┘         │     │
│    └────────────────────────────────────┘     │
│                                              │
│  Footer                                      │
│  [SONIC EDITORIAL] [Archive] [Support]       │
└──────────────────────────────────────────────┘
```

---

## 5. Data Flow (Current — Mock Data)

```
mockData.ts (static TypeScript objects)
    │
    ├── albums[]      → HomePage, AlbumPage, AlbumsPage, ExplorePage
    ├── artists[]     → ArtistPage, HomePage, ExplorePage, MembersPage
    ├── reviews[]     → AlbumPage, TrackPage, ReviewsPage
    ├── friendActivity[] → HomePage, ActivityPage
    ├── popularWithFriends[] → HomePage
    ├── trendingTracks[] → ExplorePage
    └── userProfile   → ProfilePage, SettingsPage, Navbar
```

### Data Flow (Planned — With Backend)
```
Component mounts
    → TanStack Query fires fetch
    → Edge Function receives request
    → Validates JWT
    → Queries PostgreSQL
    → Returns JSON
    → TanStack Query caches result
    → Component renders
    → Mutations invalidate cache → auto-refetch
```

---

## 6. Component Hierarchy

```
App
├── QueryClientProvider
│   └── TooltipProvider
│       ├── Toaster (notifications)
│       └── BrowserRouter
│           └── Routes
│               ├── AppLayout
│               │   ├── Navbar
│               │   ├── <Outlet /> (page)
│               │   └── Footer
│               └── NotFound
```

---

## 7. State Transitions

### Album Log State
```
[Not Logged] → Rate → [Rated]
             → Rate + Review → [Rated + Reviewed]
             → Like → [Liked]
             → Add to List → [In List]
             → Re-listen → [Re-listened]
```

### User Session State (Planned)
```
[Anonymous] → Sign Up → [Authenticated]
           → Login   → [Authenticated]
[Authenticated] → Upgrade → [Pro]
               → Logout  → [Anonymous]
```
