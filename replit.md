# FOMO Trading Learning Hub

## Overview

FOMO Trading Learning Hub is a free educational platform for trading courses. The application provides a curated collection of trading courses covering Smart Money Concepts, Price Action, Forex trading, and investing strategies. Users can browse courses, view lesson lists, and track their learning progress through an intuitive sidebar-based interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style variant) built on Radix UI primitives
- **Build Tool**: Vite with React plugin

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Custom application components in `client/src/components/`
- Shared hooks in `client/src/hooks/`

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api/` prefix
- **Development**: Vite middleware integration for HMR

The server provides:
- Course listing endpoint (`GET /api/courses`)
- Individual course endpoint (`GET /api/courses/:id`)
- Static file serving for production builds
- SPA fallback routing

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts`
- **Migrations**: Generated to `./migrations` directory via `drizzle-kit push`

Current schema includes:
- Users table (id, username, password)
- Course and Lesson TypeScript interfaces for in-memory course data

Note: Course data is currently stored in-memory (`server/storage.ts` and `client/src/lib/courses-data.ts`). The database infrastructure is set up for user management.

### Theming System
- Dual theme support (light/dark) with CSS variables
- Orange/Bitcoin-inspired color palette for light mode
- Theme persistence via localStorage
- Automatic system preference detection

### Build Process
- Client: Vite builds to `dist/public`
- Server: esbuild bundles to `dist/index.cjs`
- Selective dependency bundling for faster cold starts

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage (available but not currently active)

### UI Libraries
- **Radix UI**: Full suite of accessible primitives (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel functionality
- **cmdk**: Command palette component
- **Vaul**: Drawer component
- **react-day-picker**: Calendar/date picker

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **drizzle-zod**: Drizzle to Zod schema generation

### Development Tools
- **Replit plugins**: Runtime error overlay, cartographer, dev banner
- **TypeScript**: Strict mode enabled with path aliases (@/, @shared/, @assets/)