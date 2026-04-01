# Sonic Editorial — Product Requirements Document (PRD)

## 1. Overview

**Product Name:** Sonic Editorial
**Tagline:** The High-Fidelity Gallery — Letterboxd for Music
**Version:** 1.0 (MVP)
**Last Updated:** April 1, 2026

### 1.1 Vision
Sonic Editorial is a social music logging and review platform that enables listeners to catalog the albums they listen to, rate and review them, create curated lists, and discover music through the opinions of friends and the broader community. It draws direct inspiration from Letterboxd (film) but is purpose-built for the music domain.

### 1.2 Problem Statement
Music listeners lack a dedicated social platform to:
- Log and rate albums systematically
- Write and discover long-form reviews from real listeners (not algorithmic recommendations)
- Build and share curated album lists
- Track listening history and statistics over time
- Connect with friends and see what they're listening to

Existing platforms (Spotify, Apple Music, RateYourMusic) either lack social depth, are algorithmically driven, or have outdated UX.

### 1.3 Target Users
| Persona | Description |
|---------|-------------|
| **Casual Listener** | Logs albums occasionally, follows friends, browses trending |
| **Critic / Reviewer** | Writes detailed reviews, rates consistently, builds reputation |
| **Curator** | Creates themed lists, shares collections, organizes by genre/mood |
| **Pro Audiophile** | Wants advanced stats, annual reports, genre filtering, no ads |

---

## 2. Core Features (MVP)

### 2.1 Album Logging & Rating
- Users can log an album as "listened"
- 5-star rating system (half-star increments)
- Optional text review (short or long-form)
- Mark as "re-listen"
- Mark as "liked" (heart)
- Date of listen

### 2.2 Social Activity Feed
- Homepage shows friend activity (who logged/rated what)
- "New From Friends" horizontal scroll
- "Popular With Friends" grid
- "Latest Reviews" section with engagement (likes, replies)

### 2.3 Album, Track & Artist Pages
- **Album Page:** Cover art, metadata (label, genre, duration, release date), tracklist, community reviews, Interaction Hub (rate, log, add to list)
- **Track Page:** Technical specs (BPM, genre, label), listener discourse, related tracks
- **Artist Page:** Photo, bio, monthly listeners, followers, top tracks, discography, upcoming events

### 2.4 User Profile
- Avatar, bio, Pro badge
- Stats: albums logged, lists created, following, followers
- Recently logged albums
- Pinned lists
- Top artists

### 2.5 Lists
- Create/edit/delete lists of albums
- Public or private
- Like and comment on lists
- Cover mosaic auto-generated from album art

### 2.6 Reviews
- Dedicated reviews feed (Popular, Recent, Friends, Following)
- Like and reply to reviews
- Reviews appear on album pages

### 2.7 Explore / Discovery
- Genre-filtered browsing
- Trending albums and tracks
- Featured artists
- Community-driven (not algorithmic)

### 2.8 Journal
- Long-form editorial content (essays, deep dives, opinion pieces)
- Featured article hero section
- Author attribution, read time, engagement metrics

### 2.9 Members Directory
- Search and browse community members
- Follow/unfollow
- View member stats (albums logged, followers, review count)
- Pro badge differentiation

### 2.10 Settings
- Profile editing (avatar, name, bio, email)
- Privacy toggles (notifications, private profile, stats visibility)
- Subscription management (Pro tier)

---

## 3. Future Features (Post-MVP)

- **Authentication:** Sign up, login, OAuth (Google/Apple)
- **Search:** Global search across albums, artists, tracks, lists, members
- **Notifications:** Real-time activity notifications
- **Annual Stats:** Year-in-review listening reports (Pro feature)
- **Music Player Integration:** Embedded playback via Spotify/Apple Music APIs
- **Import:** Import listening history from Spotify/Last.fm
- **API:** Public API for third-party integrations
- **Mobile App:** React Native companion app

---

## 4. Success Metrics

| Metric | Target (6 months) |
|--------|-------------------|
| Registered users | 10,000 |
| Albums logged | 500,000 |
| Reviews written | 50,000 |
| Lists created | 5,000 |
| DAU/MAU ratio | > 25% |
| Pro conversion rate | > 5% |

---

## 5. Constraints & Assumptions

- MVP is a client-side SPA with mock data; backend integration follows
- No real authentication in MVP — profile is static
- No real-time features in MVP
- Music metadata will eventually come from MusicBrainz or Discogs API
- Cover art sourced from album metadata APIs
