# Homepage Content Management Backend Specification

This document describes the backend work required to support the dynamic homepage editor in the AirCool Dynamics frontend.

The frontend already provides:

- Public homepage rendering from an ordered list of sections.
- Admin editing at `/admin/homepage`.
- Section creation and deletion.
- Section visibility toggling.
- Section reordering.
- Editing of headings, body copy, buttons, images, backgrounds, and custom items.
- Atomic saving of the complete homepage configuration.

Frontend references:

- [`src/data/homepage.ts`](./src/data/homepage.ts)
- [`src/services/api.ts`](./src/services/api.ts)
- [`src/components/HomepageRenderer.tsx`](./src/components/HomepageRenderer.tsx)
- [`src/pages/AdminHomepagePage.tsx`](./src/pages/AdminHomepagePage.tsx)

## Required API endpoints

### Public read endpoint

```http
GET /api/homepage
```

This endpoint is called by the public homepage. It should return the currently published homepage configuration.

Successful response:

```json
{
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "title": "Reliable HVAC & Cooling Solutions for Your Comfort",
      "eyebrow": "Licensed & Insured Professionals",
      "body": "Expert heating, cooling, and refrigeration services across Adelaide.",
      "buttonText": "Get a Quote",
      "buttonUrl": "/contact",
      "imageUrl": "/uploads/homepage/hero.jpg",
      "enabled": true,
      "background": null,
      "items": []
    }
  ]
}
```

The response must contain a `sections` array. The frontend also accepts a raw array or a `{ "data": [...] }` response, but `{ "sections": [...] }` is the recommended format.

### Admin save endpoint

```http
PUT /api/homepage
Content-Type: application/json
Authorization: Bearer <admin-token>
```

Request body:

```json
{
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "title": "Reliable HVAC & Cooling Solutions for Your Comfort",
      "eyebrow": "Licensed & Insured Professionals",
      "body": "Expert heating, cooling, and refrigeration services across Adelaide.",
      "buttonText": "Get a Quote",
      "buttonUrl": "/contact",
      "imageUrl": "/uploads/homepage/hero.jpg",
      "enabled": true,
      "background": null,
      "items": []
    },
    {
      "id": "custom-promo",
      "type": "custom",
      "title": "Summer Service Special",
      "eyebrow": "Limited offer",
      "body": "Book before 31 January and receive a free system health check.",
      "buttonText": "Contact us",
      "buttonUrl": "/contact",
      "imageUrl": null,
      "enabled": true,
      "background": "bg-secondary",
      "items": []
    }
  ]
}
```

Recommended successful response:

```http
200 OK
```

```json
{
  "message": "Homepage saved successfully",
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "title": "Reliable HVAC & Cooling Solutions for Your Comfort",
      "enabled": true
    }
  ]
}
```

The response should return the normalized, persisted sections in their saved order.

## Data model

Use one homepage document/configuration containing an ordered collection of sections. The exact database technology is up to the backend, but the following relational model is recommended.

### `homepage_sections`

| Column | Type | Required | Notes |
|---|---|---:|---|
| `id` | UUID or string primary key | Yes | Internal database key |
| `section_key` | string | Yes | Stable frontend identifier, for example `hero` |
| `type` | string | Yes | One of the supported section types |
| `title` | text | Yes | Main heading |
| `eyebrow` | text nullable | No | Small label above the heading |
| `body` | text nullable | No | Main descriptive content |
| `button_text` | text nullable | No | CTA label |
| `button_url` | text nullable | No | Internal path or external URL |
| `image_url` | text nullable | No | Stored public URL/path |
| `enabled` | boolean | Yes | Whether the section is publicly rendered |
| `background` | text nullable | No | Optional approved CSS/Tailwind class or theme key |
| `items` | JSON nullable | No | Structured section-specific content |
| `sort_order` | integer | Yes | Zero-based or one-based display order |
| `created_at` | timestamp | Yes | Creation timestamp |
| `updated_at` | timestamp | Yes | Last update timestamp |

If the backend prefers a single JSON document, the equivalent shape is:

```json
{
  "key": "homepage",
  "sections": [],
  "updatedAt": "2026-10-27T00:00:00.000Z",
  "updatedBy": "admin-user-id"
}
```

The save operation must replace the complete ordered section list atomically. Do not partially save a reorder operation.

## Supported section types

The frontend currently supports these values:

```text
hero
services
discounts
benefits
testimonials
cta
custom
```

The backend should reject unknown types with `400 Bad Request`, unless the product intentionally adds a new renderer in the frontend.

### Section-specific behavior

#### `hero`

Uses:

- `eyebrow`
- `title`
- `body`
- `buttonText`
- `buttonUrl`
- `imageUrl`

#### `services`

Uses `eyebrow`, `title`, and `items`.

Each item has this shape:

```json
{
  "title": "Heating & Cooling",
  "description": "Climate control solutions for homes and businesses.",
  "icon": "Thermometer"
}
```

The current frontend uses the existing service catalog images and routes for service cards. Preserve the item order.

#### `discounts`

Uses `title` and `body` for the promotion banner. Discount media continues to come from the existing `/api/discounts` endpoint.

#### `benefits`

Uses `eyebrow`, `title`, and `items`.

Each item has this shape:

```json
{
  "title": "Licensed & Insured",
  "description": "Fully certified technicians with complete insurance coverage.",
  "icon": "Shield"
}
```

Supported icon names currently used by the frontend:

```text
Clock
Shield
ThumbsUp
Users
Zap
Award
```

#### `testimonials`

Uses `eyebrow` and `title`. Review entries continue to come from the existing `/api/reviews` endpoint.

#### `cta`

Uses:

- `title`
- `body`
- `buttonText`
- `buttonUrl`

#### `custom`

Uses all general fields and is intended for future content without a source-code change. It may contain `items`, but the current frontend renders the general title/body content only.

## Items validation

When `items` is present:

- It must be a JSON array.
- Every item must be an object.
- `title` must be a string.
- `description` must be a string.
- `icon` is optional and must be a string when supplied.
- Reject malformed JSON or invalid item structures with `400 Bad Request`.

Example validation error:

```json
{
  "message": "Invalid homepage section items",
  "errors": [
    {
      "path": "sections[2].items[0].title",
      "message": "title must be a string"
    }
  ]
}
```

## Authentication and authorization

`GET /api/homepage` should be publicly readable.

`PUT /api/homepage` must require an authenticated administrator. The existing frontend login flow uses:

```http
POST /api/admin/login
```

The current frontend stores the returned token as `aircool_admin_token`. The backend should accept that token using the existing authentication middleware and enforce an admin role/permission.

Do not rely only on the frontend route guard or the `aircool_admin_authenticated` local-storage flag.

If the existing Axios setup requires the token to be sent automatically, add an interceptor or ensure the backend accepts the current authentication convention consistently with the discounts and reviews admin endpoints.

## Validation rules

Recommended limits:

| Field | Rule |
|---|---|
| `sections` | Required array, maximum 50 sections |
| `id` | Required, unique within the request, 1–100 safe characters |
| `type` | Required supported section type |
| `title` | Required string, maximum 200 characters |
| `eyebrow` | Optional, maximum 120 characters |
| `body` | Optional, maximum 10,000 characters |
| `buttonText` | Optional, maximum 80 characters |
| `buttonUrl` | Optional validated URL/path |
| `imageUrl` | Optional validated URL/path |
| `enabled` | Required boolean; default `true` only during migration |
| `background` | Optional allow-listed theme key/class |
| `items` | Optional JSON array, maximum 100 items |

`buttonUrl` should allow internal routes such as `/contact` and trusted HTTPS URLs. Avoid allowing unsafe protocols such as `javascript:`.

## Ordering behavior

The array order in the `PUT /api/homepage` request is the display order.

Example:

```json
{
  "sections": [
    { "id": "hero", "type": "hero", "sortOrder": 0 },
    { "id": "services", "type": "services", "sortOrder": 1 },
    { "id": "cta", "type": "cta", "sortOrder": 2 }
  ]
}
```

The backend may calculate `sort_order` from array position. If the backend returns `sortOrder`, the frontend currently ignores it and uses response array order, so always return sections sorted ascending by `sort_order`.

## Delete and add behavior

The current frontend performs add/delete through the complete homepage save operation rather than separate section endpoints:

- Adding a section means including a new object in `sections`.
- Deleting a section means omitting it from `sections`.
- Reordering means changing array order.
- Hiding a section means setting `enabled: false`.

Optional future endpoints may be added, but they are not required by the current frontend:

```http
POST   /api/homepage/sections
PATCH  /api/homepage/sections/:id
DELETE /api/homepage/sections/:id
PATCH  /api/homepage/reorder
```

## Error handling

Use clear HTTP status codes:

- `200 OK` — successful read or save
- `400 Bad Request` — invalid payload
- `401 Unauthorized` — missing/invalid authentication
- `403 Forbidden` — authenticated user is not an administrator
- `404 Not Found` — only if the backend intentionally has no homepage configuration
- `409 Conflict` — concurrent update conflict, if versioning is implemented
- `500 Internal Server Error` — unexpected server/database failure

Recommended error shape:

```json
{
  "message": "Could not save homepage",
  "errors": []
}
```

Never return `200 OK` with a success-shaped response when persistence fails.

## Default seed data

On first deployment, seed the existing homepage sections in this order:

1. `hero`
2. `services`
3. `discounts`
4. `benefits`
5. `testimonials`
6. `cta`

All six should initially have `enabled: true`.

The values can be copied from [`src/data/homepage.ts`](./src/data/homepage.ts). The frontend has a fallback configuration for a `404` response, but production should persist and return the seeded configuration from the backend.

## Caching and publishing

The public frontend caches the homepage query for approximately five minutes. After a successful admin save, the admin page invalidates its local query.

The backend should:

- Return the latest saved configuration.
- Send appropriate cache invalidation headers if a CDN is used.
- Ensure a successful save is visible to subsequent public reads.

If draft/published workflows are added later, expose a published read endpoint or ensure `GET /api/homepage` returns the published version for public users while admin users can access drafts separately.

## Implementation checklist

- [ ] Create homepage configuration/section persistence.
- [ ] Add `GET /api/homepage`.
- [ ] Add authenticated `PUT /api/homepage`.
- [ ] Validate section types and field lengths.
- [ ] Validate and sanitize button/image URLs.
- [ ] Validate `items` arrays.
- [ ] Save the entire ordered list atomically.
- [ ] Return sections sorted by display order.
- [ ] Enforce administrator authorization server-side.
- [ ] Seed the six default sections.
- [ ] Add API tests for read, save, reorder, hide, add, delete, invalid payload, unauthorized access, and persistence failure.
- [ ] Verify compatibility with the frontend admin page at `/admin/homepage`.

