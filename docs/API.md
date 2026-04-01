# Sonic Editorial — API Document

## 1. Overview

This document defines the planned REST API for Sonic Editorial. The API will be implemented as Lovable Cloud Edge Functions backed by PostgreSQL. All endpoints require authentication unless marked as public.

**Base URL:** `https://<project>.supabase.co/rest/v1/` (via Lovable Cloud)
**Auth:** Bearer token (JWT) in `Authorization` header
**Format:** JSON

---

## 2. Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register with email/password |
| POST | `/auth/login` | Login, returns JWT |
| POST | `/auth/logout` | Invalidate session |
| POST | `/auth/reset-password` | Send password reset email |
| POST | `/auth/oauth/google` | OAuth with Google |
| POST | `/auth/oauth/apple` | OAuth with Apple |
| GET | `/auth/me` | Get current user profile |

---

## 3. Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users/:id` | Public | Get user profile |
| PATCH | `/users/:id` | Owner | Update profile (name, bio, avatar) |
| GET | `/users/:id/stats` | Public | Get user statistics |
| GET | `/users/:id/logs` | Public | Get user's album logs |
| GET | `/users/:id/reviews` | Public | Get user's reviews |
| GET | `/users/:id/lists` | Public | Get user's public lists |

---

## 4. Albums

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/albums` | Public | List albums (paginated, filterable) |
| GET | `/albums/:slug` | Public | Get album detail |
| GET | `/albums/:slug/tracks` | Public | Get album tracklist |
| GET | `/albums/:slug/reviews` | Public | Get album reviews |
| GET | `/albums/trending` | Public | Get trending albums |

### Query Parameters (GET /albums)
| Param | Type | Description |
|-------|------|-------------|
| `genre` | string | Filter by genre |
| `sort` | string | `popular`, `recent`, `top_rated` |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20, max: 100) |

---

## 5. Tracks

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/tracks/:id` | Public | Get track detail |
| GET | `/tracks/trending` | Public | Get trending tracks |

---

## 6. Artists

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/artists` | Public | List artists (paginated) |
| GET | `/artists/:slug` | Public | Get artist detail |
| GET | `/artists/:slug/albums` | Public | Get artist's albums |
| GET | `/artists/:slug/top-tracks` | Public | Get artist's top tracks |

---

## 7. Album Logs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/logs` | Auth | Log an album listen |
| GET | `/logs` | Auth | Get current user's logs |
| PATCH | `/logs/:id` | Owner | Update a log (rating, liked, review) |
| DELETE | `/logs/:id` | Owner | Remove a log |

### Request Body (POST /logs)
```json
{
  "album_id": "uuid",
  "rating": 4.5,
  "liked": true,
  "is_relisten": false,
  "listened_at": "2026-03-28"
}
```

---

## 8. Reviews

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/reviews` | Auth | Write a review |
| GET | `/reviews` | Public | List reviews (paginated, sortable) |
| GET | `/reviews/:id` | Public | Get review detail |
| PATCH | `/reviews/:id` | Owner | Edit a review |
| DELETE | `/reviews/:id` | Owner | Delete a review |
| POST | `/reviews/:id/like` | Auth | Like a review |
| DELETE | `/reviews/:id/like` | Auth | Unlike a review |
| POST | `/reviews/:id/comments` | Auth | Comment on a review |

### Request Body (POST /reviews)
```json
{
  "album_id": "uuid",
  "rating": 5,
  "body": "This album redefined my understanding of electronic music..."
}
```

---

## 9. Lists

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/lists` | Auth | Create a list |
| GET | `/lists` | Public | Browse lists (paginated, sortable) |
| GET | `/lists/:id` | Public | Get list with items |
| PATCH | `/lists/:id` | Owner | Update list metadata |
| DELETE | `/lists/:id` | Owner | Delete a list |
| POST | `/lists/:id/items` | Owner | Add album to list |
| DELETE | `/lists/:id/items/:album_id` | Owner | Remove album from list |
| PATCH | `/lists/:id/items/reorder` | Owner | Reorder list items |

---

## 10. Social / Follows

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/users/:id/follow` | Auth | Follow a user |
| DELETE | `/users/:id/follow` | Auth | Unfollow a user |
| GET | `/users/:id/followers` | Public | Get followers |
| GET | `/users/:id/following` | Public | Get following |

---

## 11. Activity Feed

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/feed` | Auth | Get personalized friend activity feed |
| GET | `/feed/popular` | Public | Get popular community activity |

### Query Parameters
| Param | Type | Description |
|-------|------|-------------|
| `type` | string | `all`, `reviews`, `ratings`, `lists` |
| `cursor` | string | Pagination cursor |
| `limit` | number | Items per page (default: 20) |

---

## 12. Journal

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/journal` | Public | List journal entries |
| GET | `/journal/:id` | Public | Get journal entry |
| POST | `/journal` | Admin/Author | Create journal entry |
| PATCH | `/journal/:id` | Owner | Update journal entry |

---

## 13. Search

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/search` | Public | Global search |

### Query Parameters
| Param | Type | Description |
|-------|------|-------------|
| `q` | string | Search query |
| `type` | string | `albums`, `artists`, `tracks`, `lists`, `members`, `all` |
| `limit` | number | Results per type (default: 5) |

---

## 14. Error Responses

All errors follow this format:
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Album not found",
    "status": 404
  }
}
```

| Status | Code | Description |
|--------|------|-------------|
| 400 | BAD_REQUEST | Invalid input |
| 401 | UNAUTHORIZED | Missing or invalid token |
| 403 | FORBIDDEN | Insufficient permissions |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Duplicate (e.g., already logged) |
| 422 | VALIDATION_ERROR | Schema validation failed |
| 429 | RATE_LIMITED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |

---

## 15. Rate Limiting

| Tier | Limit |
|------|-------|
| Anonymous | 60 requests/minute |
| Authenticated | 300 requests/minute |
| Pro | 1000 requests/minute |
