# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` - Runs Prisma generation and Next.js dev server
- **Build**: `pnpm build` - Generates Prisma client and builds Next.js app for production
- **Lint**: `pnpm lint` - Runs Next.js ESLint configuration
- **Start production**: `pnpm start` - Starts production server

### Database Commands
- **Generate Prisma client**: `prisma generate` - Required after schema changes
- **Database migrations**: `prisma migrate dev` - Apply database schema changes
- **View database**: `prisma studio` - Opens Prisma Studio for database inspection

## Architecture Overview

This is a **Japanese dictionary and text corpus database application** built with Next.js 14, featuring multiple historical Japanese text databases and IIIF image viewing capabilities.

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS with DaisyUI components
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials and OAuth providers
- **Content Management**: MDX files with custom components
- **Image Viewing**: OpenSeadragon for IIIF manifests
- **Caching**: Upstash Redis

### Database Structure
The app manages several historical Japanese text corpora:
- **Bunmeibon** (`bunmeibon.ts`) - Historical text corpus
- **Gyokuhentaizen** (`gyokuhentaizen.ts`) - Classical text database with IIIF images
- **Hzwm** (`hzwm.ts`) - Text definitions database  
- **Jiruisho** (`jiruisho.ts`) - Dictionary with image references
- **KWRS** (`kwrs.ts`) - Manuscript database with IIIF manifests
- **Racvyoxv** (`racvyoxv.ts`) - Text corpus with metadata
- **Wakunnoshiori** (`wakunnosiori.ts`) - Classical text with annotations
- **Jiruisho-Chushaku** - Commentary and annotation system

### Authentication & Authorization
- **Middleware protection**: Only `/admin` routes protected by NextAuth middleware
- **Role-based access**: `ADMIN` role for administrative functions, regular users for database access
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
- **Auth**: `lib/nextauth-options.ts` (NextAuth configuration with role extensions)
- **Images**: `next.config.js` (IIIF domain allowlist for remote images, MDX configuration)
- **Styling**: `tailwind.config.js` (DaisyUI theme configuration)
- **MDX Components**: `mdx-components.tsx` (Global MDX component configuration)

### Development Notes
- Uses pnpm for package management with specific built dependencies configuration
- Requires environment variables for database and authentication providers
- Admin functionality requires `ADMIN` role in user database record
- Image viewing requires proper IIIF manifest URLs and tile generation