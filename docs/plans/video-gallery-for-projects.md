# Plan: Add Video Gallery to Projects, Remove featuredVideo from Services

## Context

The client wants to move video content from service pages to project pages. Currently:
- Services have a `featuredVideo` field (schema + GROQ exists, but **never rendered** on the frontend)
- Projects have no video support — only an image gallery
- The `VideoPlayer` component already exists and is analytics-ready

The goal is to:
1. Add a `videoGallery` array field to the `recentProject` Sanity schema
2. Remove `featuredVideo` from the `service` schema (it was never rendered so no data migration risk)
3. Extend the project detail page to render videos alongside images in the gallery section
4. Remove service video-related code from GROQ queries, Zod schemas, and TypeScript types

Videos should feel like a natural part of the project "Photos" section — not a separate section. The recommendation is to show videos inline in the same gallery grid, distinguishable by a play-button overlay, and clicking one opens the VideoPlayer instead of a lightbox.

---

## Implementation Plan

### Step 1 — Sanity Schema: `recentProject.ts`

**File:** `apps/content/schemaTypes/recentProject.ts`

Add a `videoGallery` array field after `imageGallery`:

```ts
defineField({
  name: 'videoGallery',
  title: 'Video Gallery',
  type: 'array',
  description: 'Upload project videos (MP4 recommended). Max 5.',
  of: [
    {
      type: 'object',
      fields: [
        defineField({
          name: 'video',
          title: 'Video File',
          type: 'file',
          options: { accept: 'video/*' },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Video Title',
          type: 'string',
          description: 'Short label shown under the video thumbnail',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'thumbnail',
          title: 'Thumbnail Image',
          type: 'image',
          description: 'Optional custom thumbnail; shown as poster image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Screen reader description for accessibility',
        }),
        defineField({
          name: 'transcript',
          title: 'Transcript',
          type: 'text',
          description: 'For accessibility and SEO',
        }),
      ],
    },
  ],
  validation: (Rule) => Rule.max(5),
}),
```

### Step 2 — Sanity Schema: `service.ts`

**File:** `apps/content/schemaTypes/service.ts`

Remove the entire `featuredVideo` `defineField` block (lines 169–217). The field was never rendered, so no content is at risk.

---

### Step 3 — GROQ Query: `queries.ts`

**File:** `apps/web/src/lib/sanity/queries.ts`

**`projectBySlugQuery`** — add `videoGallery` projection:

```groq
videoGallery[] {
  title,
  description,
  transcript,
  video {
    asset-> {
      _id,
      url,
      mimeType,
      originalFilename
    }
  },
  thumbnail {
    asset {
      _ref
    }
  }
}
```

**`serviceBySlugQuery`** — remove the `featuredVideo { ... }` block entirely.

---

### Step 4 — Zod Schemas & TypeScript Types: `schemas.ts`

**File:** `apps/web/src/lib/sanity/schemas.ts`

**Add** a `ProjectVideoSchema`:

```ts
const ProjectVideoSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  transcript: z.string().nullable().optional(),
  video: z.object({
    asset: z.object({
      _id: z.string(),
      url: z.string(),
      mimeType: z.string(),
      originalFilename: z.string(),
    }),
  }),
  thumbnail: z
    .object({ asset: z.object({ _ref: z.string() }) })
    .nullable()
    .optional(),
});
```

**Update** `ProjectDetailSchema` — add `videoGallery` field:

```ts
videoGallery: z.array(ProjectVideoSchema).nullable().optional(),
```

**Update** `ServiceSchema` — remove the `featuredVideo` field entirely.

**Add** export type: `export type ProjectVideo = z.infer<typeof ProjectVideoSchema>;`

---

### Step 5 — Project Detail Page: `page.tsx`

**File:** `apps/web/src/app/projects/[slug]/page.tsx`

In the gallery section, pass both `images` and `videos` to a refactored gallery client. The section heading changes from "Photos" to "Gallery" when videos are also present.

```tsx
const videoGallery = project.videoGallery ?? [];
// ...
<ProjectGalleryClient images={galleryImages} videos={videoGallery} />
```

---

### Step 6 — `ProjectGalleryClient.tsx` + `ProjectVideoModal.tsx`

**Files:** `apps/web/src/components/ProjectGalleryClient.tsx`, `apps/web/src/components/ProjectVideoModal.tsx`

This is the most significant UI change. **Use the `frontend-design` skill** to design and implement these two components, providing it with the following context:
- The existing `ProjectGalleryClient` layout (featured full-width image + 2-column grid)
- The existing `ProjectImageLightbox` as a structural reference for the modal
- The existing `VideoPlayer` component to embed inside the modal
- Brand colours: `jlc-blue`, `jlc-black`, white
- Must be AAA accessible and mobile-first

**Design approach to feed into the skill:**
- Videos appear in the same 2-column grid as photos (same visual weight)
- Video grid items show a thumbnail (or dark placeholder) with a semi-transparent play-button circle overlay
- Clicking a video item opens `ProjectVideoModal` — a full-screen dialog wrapping `VideoPlayer`
- The first featured hero slot remains image-only
- Close modal on Escape / backdrop click

**Implementation details:**
- `ProjectGalleryClient` accepts new prop `videos: ProjectVideo[]`
- Union type: `GalleryItem = { type: 'image'; data: GalleryImage } | { type: 'video'; data: ProjectVideo }`
- Combined array: images first, then videos; featured slot is always `images[0]`
- `ProjectVideoModal` mirrors `ProjectImageLightbox` structure with full a11y (role="dialog", aria-modal, focus trap)

---

### Step 7 — Remove unused service video code from `service` page

**File:** `apps/web/src/app/services/[serviceName]/page.tsx`

Verify the `featuredVideo` was not being consumed (confirmed — it wasn't rendered). No changes needed to the page itself since GROQ query change handles cleanup.

---

## Files to Modify

| File | Change |
|---|---|
| `apps/content/schemaTypes/recentProject.ts` | Add `videoGallery` array field |
| `apps/content/schemaTypes/service.ts` | Remove `featuredVideo` field |
| `apps/web/src/lib/sanity/queries.ts` | Add videos to `projectBySlugQuery`, remove from `serviceBySlugQuery` |
| `apps/web/src/lib/sanity/schemas.ts` | Add `ProjectVideoSchema`, update `ProjectDetailSchema`, remove from `ServiceSchema` |
| `apps/web/src/app/projects/[slug]/page.tsx` | Pass `videoGallery` to gallery client |
| `apps/web/src/components/ProjectGalleryClient.tsx` | Support mixed image+video items |

**New file:**
- `apps/web/src/components/ProjectVideoModal.tsx` — video lightbox modal

**Reuse existing:**
- `VideoPlayer` component (`apps/web/src/components/VideoPlayer.tsx`) — no changes needed
- `ProjectImageLightbox` patterns for modal structure

---

## Verification

1. Run `npm run type:check` — no TypeScript errors
2. Run `npm run dev -w web` and navigate to a project detail page
3. Confirm the gallery section renders images and (once content is uploaded via Sanity Studio) videos
4. Confirm service pages no longer reference `featuredVideo` in schema or GROQ
5. Run `npm run lint` — no lint errors
