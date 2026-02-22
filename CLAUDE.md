# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` - Runs Prisma generation and Next.js dev server
- **Build**: `pnpm build` - Generates Prisma client and builds Next.js app for production
- **Lint**: `pnpm lint` - Runs Next.js ESLint configuration
- **Start production**: `pnpm start` - Starts production server
- **Tests (watch)**: `pnpm test` - Runs Vitest in watch mode
- **Tests (run once)**: `pnpm test:run` - Runs Vitest once and exits

### Database Commands
- **Generate Prisma client**: `prisma generate` - Required after schema changes
- **Database migrations**: `prisma migrate dev` - Apply database schema changes
- **View database**: `prisma studio` - Opens Prisma Studio for database inspection

## Architecture Overview

This is a **Japanese dictionary and text corpus database application** built with Next.js 14 App Router, featuring multiple historical Japanese text databases and IIIF image viewing capabilities.

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS with DaisyUI components and `@tailwindcss/typography` for MDX content
- **Primary Database**: MySQL with Prisma ORM (`lib/prisma.ts` — singleton pattern)
- **Secondary Database**: Supabase (used only by the `tsj-wakun` corpus, `lib/supabase/`)
- **Authentication**: NextAuth.js with credentials provider (email/password) and Google OAuth
- **Forms**: react-hook-form in all search form components
- **Content Management**: MDX files with custom components
- **Image Viewing**: OpenSeadragon for IIIF manifests
- **Caching**: Upstash Redis (`lib/redis.ts` — singleton pattern)
- **Testing**: Vitest + React Testing Library + jsdom

### Path Alias
`@/` maps to the project root (`./`). For example, `@/lib/prisma` → `./lib/prisma.ts`.

## Databases / Text Corpora

The app manages several historical Japanese text corpora. Each has an `accessRole` controlling visibility:

| Route | Title (Japanese) | Model/Source | Access |
|---|---|---|---|
| `/hzwm` | 本草和名 | Prisma `Hzwm` | PUBLIC |
| `/kwrs` | 古活字版和名類聚抄 | Prisma `Wamyouruijyusho` | PUBLIC |
| `/jiruisho` | 色葉字類抄 | Prisma `Jiruisho` | PUBLIC |
| `/jiruisho-chushaku` | 色葉字類抄注釈 | Prisma `JiruishoChushaku` | ADVANCED_USER |
| `/racvyoxv` | 落葉集 | Prisma `Racvyoxv` | PUBLIC |
| `/bunmei` | 文明本節用集 | Prisma `BunmeiSetsuyoshu` | PUBLIC |
| `/gyokuhentaizen` | 増続大広益会玉篇大全 | Prisma `Gyokuhentaizen` | PUBLIC |
| `/wakunnoshiori` | 版本和訓栞 | Prisma `Wakunnosiori_Entry` + `Wakunnosiori_Def` | PUBLIC |
| `/tsj-wakun` | (TSJ Wakun) | Supabase `tsj_wakun` table | (varies) |

Database query functions live in `/db/` (e.g., `db/bunmeibon.ts`, `db/gyokuhentaizen.ts`). The `tsj-wakun` corpus is the exception — it uses Supabase via `db/tsj_wakun.ts`.

## Prisma Schema Key Models

- `User` — application users with `Role` enum (`USER`, `ADVANCED_USER`, `ADMIN`)
- `Account` — OAuth provider accounts linked to users
- `Hzwm` — 本草和名 entries
- `Wamyouruijyusho` — 和名類聚抄 entries
- `Gyokuhentaizen` — 増続大広益会玉篇大全 entries (unique key: `ghtz_id`)
- `Jiruisho` — 色葉字類抄 entries with optional `JiruishoChushaku` relation
- `JiruishoChushaku` — commentary/annotation linked 1-to-1 with `Jiruisho`
- `BunmeiSetsuyoshu` — 文明本節用集 entries (unique key: `bunmei_id`)
- `Racvyoxv` — 落葉集 entries
- `Wakunnosiori_Entry` / `Wakunnosiori_Def` — 和訓栞 with one-to-many definitions

Prisma uses `relationMode = "prisma"` (no foreign key enforcement at DB level).

## Authentication & Authorization

- **Providers**: Email/password (credentials) + Google OAuth
- **Strategy**: JWT sessions
- **Config**: `lib/nextauth-options.ts`
- **Middleware**: `middleware.ts` protects only the `/admin` route via NextAuth middleware
- **Admin layout**: `app/admin/layout.tsx` performs server-side session validation and checks `session.user.role === "ADMIN"`
- **Roles** (defined in `prisma/schema.prisma`):
  - `USER` — default for all registered users
  - `ADVANCED_USER` — access to restricted corpora (e.g., `/jiruisho-chushaku`)
  - `ADMIN` — full admin panel access
- **OAuth note**: Google sign-in only works if the user email already exists in the database; new OAuth users are rejected
- **Type extension**: `types/next-auth.d.ts` extends the `Session` type to include `role`

## Key Application Patterns

### Search and Results Pattern

Every corpus follows this consistent file structure:

```
app/[corpus]/
├── page.tsx               # Landing page with search form
├── layout.tsx             # Shared layout (breadcrumbs, etc.)
├── [CorpusName]Form.tsx   # "use client" search form component
├── results/
│   ├── page.tsx           # Server component: fetches data, renders table
│   └── layout.tsx         # Optional layout wrapper
└── [id]/
    └── page.tsx           # Individual record detail page
```

**Search form components** (`[CorpusName]Form.tsx`):
- Always marked `"use client"`
- Use `react-hook-form` (`useForm`, `register`, `handleSubmit`)
- On submit, filter empty fields and push to results URL with `URLSearchParams`
- Use `TextInput` and `Select` from `components/common/`

**Results pages**:
- Always server components (no `"use client"`)
- Read `searchParams` props directly; call db query functions
- Render a `<table>` with DaisyUI classes

### Server Actions Pattern (jiruisho-chushaku only)

`app/jiruisho-chushaku/actions.ts` uses `"use server"` for CRUD operations instead of API routes. Actions call `prisma` directly and call `revalidatePath("/jiruisho-chushaku")` after mutations.

### API Routes

REST API routes exist under `app/api/databases/[corpus]/`:
- `route.ts` — GET search with query params
- `[id]/route.ts` — GET single record by ID

API routes exist for: `bunmeibon`, `gyokuhentaizen`, `jiruisho`, `racvyoxv`, `wakunnoshiori`.
**No API routes** for: `hzwm`, `kwrs` (results pages fetch Prisma directly), `jiruisho-chushaku` (uses Server Actions), `tsj-wakun` (uses Supabase).

There is also `app/api/databases/route.ts` (general listing), `app/api/auth/[...nextauth]/route.ts`, `app/api/auth/register/route.ts`, and `app/api/users/route.ts`.

### IIIF Image Integration

- OpenSeadragon components: `components/iiif/Osd.tsx` and `components/iiif/Viewer.tsx`
- IIIF v2 manifest parsing in `lib/getTiles.ts` (extracts tile info.json URLs from `sequences.canvases.images`)
- Allowed remote image domains (`next.config.js`):
  - `archive.wul.waseda.ac.jp`
  - `dl.ndl.go.jp`
  - `jisho-goi.s3.ap-northeast-1.amazonaws.com`
- Corpora with IIIF images: `gyokuhentaizen`, `jiruisho`, `wakunnoshiori`

### Content Management (MDX)

- MDX files are in `/content/` organized as `articles/`, `manuals/`, `news/`
- Global MDX components configured in `mdx-components.tsx` at project root
- Custom MDX components in `components/mdx/`: `Alert`, `CCLicense`, `ContentBlock`, `Divider`, `MembersList`, `SiteDescription`
- `next.config.js` sets `pageExtensions` to include `.md` and `.mdx`
- `@tailwindcss/typography` styles MDX prose content

## Component Organization

```
components/
├── common/           # Reusable form inputs (TextInput, Select) and layout (Header, Footer, GenericResultsTable)
├── iiif/             # OpenSeadragon wrappers (Osd.tsx, Viewer.tsx)
├── landing/          # Landing page sections (Hero, DatabasesSection, NewsSection, etc.)
├── mdx/              # Custom MDX components (Alert, ContentBlock, etc.)
└── ui/               # Generic UI elements (BackButton, LoginButton, LogoutButton, etc.)
```

## Constants

- `constants/db-menu.ts` — `Database[]` array with all corpus metadata (title, url, description, image, accessRole)
- `constants/nav-menu.ts` — top navigation links
- `constants/adminRoute.ts` — admin sidebar links (manuals, news, data, users)
- `constants/radicalList.ts` — kanji radical lookup list
- `constants/kwrs-manifest.ts` — IIIF manifest URLs for KWRS
- `constants/gyokuhentaizen_maki_tyo.ts` — volume/chapter data for Gyokuhentaizen

## Important Configuration Files

- **Database schema**: `prisma/schema.prisma` (MySQL with Prisma relation mode)
- **Auth**: `lib/nextauth-options.ts` (credentials + Google, JWT strategy, role propagation)
- **Prisma client**: `lib/prisma.ts` (global singleton, logs queries in dev)
- **Redis client**: `lib/redis.ts` (Upstash, global singleton)
- **Supabase clients**: `lib/supabase/server.ts` and `lib/supabase/client.ts`
- **Images / MDX**: `next.config.js` (remote image allowlist, MDX plugin, `styledComponents: true`)
- **Styling**: `tailwind.config.js` (DaisyUI with custom "mytheme" + "dracula" themes; typography plugin)
- **MDX Components**: `mdx-components.tsx` (global MDX component configuration)
- **Types**: `types/index.d.ts` (shared `ApiResponse` interface), `types/next-auth.d.ts` (session role extension)

## Testing

- **Framework**: Vitest + React Testing Library + jsdom
- **Config**: `vitest.config.ts` (includes `@/` alias, jsdom environment, `vitest.setup.ts` setup file)
- **Setup**: `vitest.setup.ts` imports `@testing-library/jest-dom` matchers
- **Test files**: colocated with source files, named `*.test.ts` or `*.test.tsx`
- **Example**: `components/common/TextInput.test.tsx`
- Run tests with `pnpm test` (watch) or `pnpm test:run` (CI)

## Environment Variables

Required environment variables (not committed to repo):

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MySQL connection string for Prisma |
| `SECRET` | NextAuth.js secret for JWT signing |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST API URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis authentication token |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |

## Admin Panel

The admin panel (`/admin`) provides:
- **Manuals** (`/admin/manuals`) — manage manual MDX content
- **News** (`/admin/news`) — manage news MDX content
- **Data** (`/admin/data`) — database data management
- **Users** (`/admin/users`) — CRUD operations for user accounts (add, edit, delete)

Access requires `ADMIN` role. The middleware only blocks `/admin` at the top level; the `AdminLayout` server component enforces role checking for all sub-pages.

## Development Notes

- Uses pnpm for package management (`pnpm-lock.yaml`)
- `pnpm.onlyBuiltDependencies` controls which packages can run install scripts (bcrypt, prisma, supabase, etc.)
- Admin functionality requires `ADMIN` role set directly in the database
- `ADVANCED_USER` role grants access to internal corpora like `jiruisho-chushaku`
- Image viewing requires valid IIIF manifest URLs and tile server support
- Prisma logs all queries in development (`log: ['query', 'info', 'warn']`)
- The `tsj-wakun` corpus is the only one backed by Supabase; all others use the MySQL/Prisma stack
- `@vercel/analytics` is included for deployment on Vercel
