# Sonic Editorial — Tech Stack Document

## 1. Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.x | UI library — component-based architecture |
| **TypeScript** | 5.x | Type safety across the codebase |
| **Vite** | 5.x | Build tool and dev server (HMR, fast builds) |
| **React Router** | 6.x | Client-side routing with nested layouts |
| **TanStack Query** | 5.x | Server-state management, caching, and data fetching |
| **Tailwind CSS** | 3.x | Utility-first CSS framework with custom design tokens |
| **shadcn/ui** | latest | Accessible, composable UI primitives (Radix-based) |
| **Lucide React** | latest | Icon library (consistent, tree-shakeable) |
| **tailwindcss-animate** | latest | Animation utilities for Tailwind |

## 2. Design System

| Aspect | Implementation |
|--------|---------------|
| **Typography** | Space Grotesk (display/headings), Inter (body) via Google Fonts |
| **Color Palette** | HSL-based CSS variables: `--sonic-lime`, `--sonic-navy`, `--sonic-coral`, etc. |
| **Tokens** | Semantic tokens in `index.css`: `--background`, `--foreground`, `--primary`, `--muted`, etc. |
| **Components** | Custom utility classes: `.sonic-card`, `.sonic-badge`, `.sonic-label`, `.sonic-section-title` |
| **Theme** | Dark-only (navy background `#0a0e1a`, lime accent `#c8ff00`) |

## 3. State Management

| Layer | Tool | Use Case |
|-------|------|----------|
| **Server State** | TanStack Query | API data fetching, caching, invalidation |
| **Client State** | React useState/useReducer | Form state, UI toggles, local interactions |
| **URL State** | React Router | Route params, query strings, navigation |
| **Future** | Zustand (planned) | Global client state if complexity grows |

## 4. Project Structure

```
src/
├── assets/          # Static images (album covers, avatars)
├── components/
│   ├── layout/      # AppLayout, Navbar, Footer
│   └── ui/          # shadcn/ui primitives
├── data/
│   └── mockData.ts  # TypeScript interfaces + mock data
├── hooks/           # Custom React hooks
├── lib/             # Utilities (cn, etc.)
├── pages/           # Route-level page components
│   ├── HomePage.tsx
│   ├── AlbumPage.tsx
│   ├── ArtistPage.tsx
│   ├── TrackPage.tsx
│   ├── ProfilePage.tsx
│   ├── ActivityPage.tsx
│   ├── ExplorePage.tsx
│   ├── AlbumsPage.tsx
│   ├── ListsPage.tsx
│   ├── MembersPage.tsx
│   ├── JournalPage.tsx
│   ├── ReviewsPage.tsx
│   ├── SettingsPage.tsx
│   └── NotFound.tsx
└── test/            # Test setup and specs
```

## 5. Build & Tooling

| Tool | Purpose |
|------|---------|
| **Vite** | Dev server, production bundling, asset optimization |
| **ESLint** | Code linting |
| **TypeScript** | Static type checking (`strict` mode) |
| **Vitest** | Unit/integration testing |
| **Playwright** | E2E testing |
| **PostCSS** | CSS processing (Tailwind plugin) |

## 6. Backend (Planned — Lovable Cloud)

| Service | Purpose |
|---------|---------|
| **PostgreSQL** | Relational database for users, albums, reviews, lists |
| **Auth** | Email/password + OAuth (Google, Apple) |
| **Edge Functions** | Server-side logic (email, payments, AI features) |
| **File Storage** | Avatar uploads, custom cover art |
| **Real-time** | Live activity feed, notifications |

## 7. External APIs (Planned)

| API | Purpose |
|-----|---------|
| **MusicBrainz** | Album/artist/track metadata |
| **Discogs** | Vinyl/physical release metadata |
| **Spotify Web API** | Listening history import, embedded playback |
| **Last.fm** | Scrobble history import |

## 8. Deployment

| Concern | Solution |
|---------|----------|
| **Hosting** | Lovable (preview + production) |
| **CDN** | Lovable CDN for static assets |
| **CI/CD** | Automatic on commit via Lovable |
| **Domain** | Custom domain via Lovable publish settings |
