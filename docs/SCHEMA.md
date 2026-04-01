# Sonic Editorial — Database Schema Document

## 1. Overview

This document defines the planned relational database schema for Sonic Editorial. The MVP currently uses client-side mock data (`src/data/mockData.ts`). This schema will be implemented via Lovable Cloud (PostgreSQL) when backend integration begins.

---

## 2. Entity-Relationship Diagram (Conceptual)

```
users ──< user_roles
users ──< reviews ──> albums
users ──< album_logs ──> albums
users ──< lists ──< list_items ──> albums
users ──< follows >── users
albums ──> artists
albums ──< tracks
albums ──< reviews
artists ──< albums
```

---

## 3. Tables

### 3.1 `users`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique user ID |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login email |
| username | VARCHAR(50) | UNIQUE, NOT NULL | Display name |
| avatar_url | TEXT | NULLABLE | Profile image URL |
| bio | TEXT | NULLABLE | User bio |
| is_pro | BOOLEAN | DEFAULT false | Pro subscription status |
| created_at | TIMESTAMPTZ | DEFAULT now() | Account creation |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Last profile update |

### 3.2 `user_roles`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| user_id | UUID | FK → users(id) ON DELETE CASCADE, NOT NULL | |
| role | app_role (ENUM) | NOT NULL | admin, moderator, user |
| | | UNIQUE(user_id, role) | |

### 3.3 `artists`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| name | VARCHAR(255) | NOT NULL | |
| slug | VARCHAR(255) | UNIQUE, NOT NULL | URL-friendly identifier |
| photo_url | TEXT | NULLABLE | |
| genre | VARCHAR(100) | NULLABLE | |
| bio | TEXT | NULLABLE | |
| monthly_listeners | INTEGER | DEFAULT 0 | |
| followers_count | INTEGER | DEFAULT 0 | |
| verified | BOOLEAN | DEFAULT false | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

### 3.4 `albums`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| title | VARCHAR(255) | NOT NULL | |
| slug | VARCHAR(255) | UNIQUE, NOT NULL | URL-friendly identifier |
| artist_id | UUID | FK → artists(id), NOT NULL | |
| cover_url | TEXT | NULLABLE | |
| genre | VARCHAR(100) | NULLABLE | |
| release_date | DATE | NULLABLE | |
| label | VARCHAR(255) | NULLABLE | |
| duration | VARCHAR(20) | NULLABLE | Total duration (HH:MM:SS) |
| avg_rating | NUMERIC(2,1) | DEFAULT 0 | Computed average |
| total_ratings | INTEGER | DEFAULT 0 | |
| total_logs | INTEGER | DEFAULT 0 | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

### 3.5 `tracks`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| album_id | UUID | FK → albums(id) ON DELETE CASCADE, NOT NULL | |
| track_number | INTEGER | NOT NULL | Position in album |
| title | VARCHAR(255) | NOT NULL | |
| duration | VARCHAR(10) | NULLABLE | MM:SS |
| genre | VARCHAR(100) | NULLABLE | |
| bpm | INTEGER | NULLABLE | |
| explicit | BOOLEAN | DEFAULT false | |
| plays_count | INTEGER | DEFAULT 0 | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

### 3.6 `album_logs`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| user_id | UUID | FK → users(id) ON DELETE CASCADE, NOT NULL | |
| album_id | UUID | FK → albums(id) ON DELETE CASCADE, NOT NULL | |
| rating | NUMERIC(2,1) | NULLABLE | 0.5–5.0 |
| liked | BOOLEAN | DEFAULT false | |
| is_relisten | BOOLEAN | DEFAULT false | |
| listened_at | DATE | NULLABLE | When the user listened |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

### 3.7 `reviews`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| user_id | UUID | FK → users(id) ON DELETE CASCADE, NOT NULL | |
| album_id | UUID | FK → albums(id) ON DELETE CASCADE, NOT NULL | |
| rating | NUMERIC(2,1) | NOT NULL | 0.5–5.0 |
| body | TEXT | NOT NULL | Review text |
| likes_count | INTEGER | DEFAULT 0 | |
| comments_count | INTEGER | DEFAULT 0 | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

### 3.8 `review_likes`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| user_id | UUID | FK → users(id) ON DELETE CASCADE | |
| review_id | UUID | FK → reviews(id) ON DELETE CASCADE | |
| | | PK(user_id, review_id) | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

### 3.9 `review_comments`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| review_id | UUID | FK → reviews(id) ON DELETE CASCADE, NOT NULL | |
| user_id | UUID | FK → users(id) ON DELETE CASCADE, NOT NULL | |
| body | TEXT | NOT NULL | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

### 3.10 `lists`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| user_id | UUID | FK → users(id) ON DELETE CASCADE, NOT NULL | |
| title | VARCHAR(255) | NOT NULL | |
| description | TEXT | NULLABLE | |
| is_public | BOOLEAN | DEFAULT true | |
| is_pinned | BOOLEAN | DEFAULT false | |
| likes_count | INTEGER | DEFAULT 0 | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

### 3.11 `list_items`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| list_id | UUID | FK → lists(id) ON DELETE CASCADE, NOT NULL | |
| album_id | UUID | FK → albums(id) ON DELETE CASCADE, NOT NULL | |
| position | INTEGER | NOT NULL | Sort order |
| notes | TEXT | NULLABLE | Per-item annotation |
| | | UNIQUE(list_id, album_id) | |

### 3.12 `follows`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| follower_id | UUID | FK → users(id) ON DELETE CASCADE | |
| following_id | UUID | FK → users(id) ON DELETE CASCADE | |
| | | PK(follower_id, following_id) | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

### 3.13 `journal_entries`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | |
| author_id | UUID | FK → users(id), NOT NULL | |
| title | VARCHAR(255) | NOT NULL | |
| body | TEXT | NOT NULL | Markdown content |
| cover_url | TEXT | NULLABLE | |
| category | VARCHAR(50) | NULLABLE | Deep Dive, Opinion, Review, Essay |
| read_time_minutes | INTEGER | NULLABLE | |
| likes_count | INTEGER | DEFAULT 0 | |
| comments_count | INTEGER | DEFAULT 0 | |
| published_at | TIMESTAMPTZ | NULLABLE | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

---

## 4. Indexes (Recommended)

```sql
CREATE INDEX idx_album_logs_user ON album_logs(user_id);
CREATE INDEX idx_album_logs_album ON album_logs(album_id);
CREATE INDEX idx_reviews_album ON reviews(album_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_tracks_album ON tracks(album_id);
CREATE INDEX idx_list_items_list ON list_items(list_id);
CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);
CREATE INDEX idx_albums_artist ON albums(artist_id);
CREATE INDEX idx_albums_slug ON albums(slug);
CREATE INDEX idx_artists_slug ON artists(slug);
```

---

## 5. Row-Level Security (RLS) Strategy

- All tables have RLS enabled
- `has_role()` security-definer function for admin checks (see user-roles pattern)
- Users can read public data (albums, artists, tracks, public reviews/lists)
- Users can only write/update/delete their own data (logs, reviews, lists, profile)
- Admin role can manage all content
