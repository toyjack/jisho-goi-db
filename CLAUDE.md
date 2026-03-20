# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` - Runs Prisma generation and Next.js dev server
- **Build**: `pnpm build` - Generates Prisma client and builds Next.js app for production
- **Lint**: `pnpm lint` - Runs Next.js ESLint configuration
- **Start production**: `pnpm start` - Starts production server
- **Test**: `pnpm test` - Runs Vitest in watch mode
- **Test (run once)**: `pnpm test:run` - Runs Vitest once and exits

### Database Commands
- **Generate Prisma client**: `prisma generate` - Required after schema changes
- **Database migrations**: `prisma migrate dev` - Apply database schema changes
- **View database**: `prisma studio` - Opens Prisma Studio for database inspection

### Supabase Commands
- **Supabase CLI**: `pnpm supabase` - Access Supabase CLI commands
- **Generate Supabase types**: `pnpm supabase:gen` - Generates TypeScript types from Supabase schema to `lib/supabase/types.ts`

## Architecture Overview

This is a **Japanese dictionary and text corpus database application** built with Next.js 14, featuring multiple historical Japanese text databases and IIIF image viewing capabilities.

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS with DaisyUI components
- **Database**: MySQL with Prisma ORM, Supabase (PostgreSQL) for select features
- **Authentication**: NextAuth.js with credentials and OAuth providers
- **Content Management**: MDX files with custom components
- **Image Viewing**: OpenSeadragon for IIIF manifests
- **Caching**: Upstash Redis
- **Testing**: Vitest with React Testing Library

### Database Structure
The app manages several historical Japanese text corpora:
- **Bunmeibon** (BunmeiSetsuyoshu) - Historical text corpus (文明本節用集)
- **Gyokuhentaizen** - Classical text database with IIIF images (玉篇大全)
- **Hzwm** - Text definitions database (和名類聚抄)
- **Jiruisho** - Dictionary with image references (字類抄)
- **KWRS** - Manuscript database with IIIF manifests
- **Racvyoxv** - Text corpus with metadata and cross-references to other dictionaries
- **Wakunnoshiori** (Wakunnosiori) - Classical text with annotations (和訓栞)
- **Tsj-Wakun** - Supabase-based database for 新撰字鏡 (Shinsen Jikyō) readings and definitions
- **Jiruisho-Chushaku** - Commentary and annotation system for Jiruisho entries

### Authentication & Authorization
- **Middleware protection**: Only `/admin` routes protected by NextAuth middleware
- **Role-based access**: Three-tier role system defined in Prisma schema
  - `USER` - Regular users with basic database access
  - `ADVANCED_USER` - Enhanced access privileges
  - `ADMIN` - Administrative functions and user management
- **Session management**: JWT-based sessions with custom user role extension
- **Admin layout protection**: Server-side session validation in admin routes

### Key Application Patterns

#### Search and Results Pattern
Each database follows a consistent pattern:
```
/[database]/
├── page.tsx          # Search form
├── [id]/page.tsx     # Individual record view
├── results/          # Search results display
└── Form.tsx          # Search form component
```

#### IIIF Image Integration
- OpenSeadragon viewer components in `/components/iiif/`
- Image manifests served from various sources (Waseda, NDL, S3)
- Tile generation utilities in `lib/getTiles.ts`

#### Supabase Integration
- **Client utilities**: `lib/supabase/client.ts` for client-side operations
- **Server utilities**: `lib/supabase/server.ts` for Server Components and API routes
- **Type safety**: Auto-generated types in `lib/supabase/types.ts` using Supabase CLI
- **Use cases**: Currently used for Tsj-Wakun database with PostgreSQL backend
- **SSR support**: Built on `@supabase/ssr` for proper cookie handling in Next.js

#### API Structure
RESTful API routes under `/api/databases/[database]/`:
- GET endpoints for search and individual record retrieval
- Consistent query parameter handling across databases
- Redis caching for performance optimization

### Content Management
- **MDX Files**: Manages static content (manuals, news, articles)
- **Content files**: Stored in `/content/` as MDX files
- **Components**: Custom MDX components in `/components/mdx/` for rich content

### Important Configuration Files
- **Database**: `prisma/schema.prisma` (MySQL with Prisma relation mode)
- **Supabase**: `lib/supabase/types.ts` (Auto-generated TypeScript types from Supabase schema)
- **Auth**: `lib/nextauth-options.ts` (NextAuth configuration with role extensions)
- **Images**: `next.config.js` (IIIF domain allowlist for remote images, MDX configuration)
- **Styling**: `tailwind.config.js` (DaisyUI theme configuration)
- **MDX Components**: `mdx-components.tsx` (Global MDX component configuration)
- **Testing**: Component tests using Vitest and React Testing Library (e.g., `components/common/TextInput.test.tsx`)

### Development Notes
- Uses pnpm for package management with specific built dependencies configuration
- **Environment variables required**:
  - Prisma/MySQL: `DATABASE_URL`
  - Supabase: `SUPABASE_DB_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - NextAuth and OAuth providers configuration
- Admin functionality requires `ADMIN` role in user database record
- Image viewing requires proper IIIF manifest URLs and tile generation
- Supabase types must be regenerated after schema changes using `pnpm supabase:gen`
- Run tests before committing changes using `pnpm test:run`