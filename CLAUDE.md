# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fluxa is a custom management tool for artisans and independent professionals, built as a marketing website with an integrated interactive demo. The project is built with **Vite + React + TypeScript + shadcn/ui** and uses Tailwind CSS for styling.

## Tech Stack

- **Build Tool**: Vite 5
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React

## Development Commands

```bash
# Install dependencies
npm i

# Start dev server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm preview
```

## Project Structure

The codebase has a **dual-theme architecture** to support both the marketing site and the demo interface:

### Main Application (`src/`)
- **`src/pages/`** - Main application pages (Index, Articles, MentionsLegales, etc.)
- **`src/components/`** - Reusable components for the marketing site
- **`src/components/ui/`** - shadcn/ui components (shared across entire app)
- **`src/lib/`** - Utility functions (tailwind-merge, clsx)
- **`src/hooks/`** - Custom React hooks
- **`src/routes/`** - Route definitions (currently empty)
- **`src/index.css`** - Global styles and CSS variables for main site theme

### Demo Section (`src/_import_demo/`)
The demo is a completely separate themed section with its own components and pages:

- **`src/_import_demo/pages/demo/`** - Demo-specific pages (Dashboard, Clients, Messages, Factures, Automations)
- **`src/_import_demo/components/demo/`** - Demo-specific components (DemoLayout, DemoSidebar, KPICard)
- **`src/_import_demo/data/mockData.ts`** - Mock data for demo
- **`src/styles/demo-vars.css`** - Scoped CSS variables for demo theme (`.demo-scope` class)

### Key Files
- **`src/App.tsx`** - Main app component with routing, includes conditional header logic
- **`src/main.tsx`** - Entry point
- **`vite.config.ts`** - Vite configuration with path aliases (`@/` → `src/`)
- **`tailwind.config.ts`** - Tailwind configuration with theme extensions
- **`components.json`** - shadcn/ui configuration

## Architecture Patterns

### Theming System
The project uses **two separate CSS variable scopes**:

1. **Main Site Theme** (`:root` in `src/index.css`)
   - Dark-first design
   - Applied globally to marketing pages

2. **Demo Theme** (`.demo-scope` in `src/styles/demo-vars.css`)
   - Scoped to demo routes only
   - Has both light and dark variants (`.demo-scope.dark`)
   - Applied in `DemoLayout.tsx` with `<div className="demo-scope dark">`

### Routing Structure
The app uses React Router v6 with nested routes:

```typescript
/ - Marketing homepage (Index)
/articles - Articles page
/ressources - Resources/blog page
/mentions-legales - Legal mentions
/politique-confidentialite - Privacy policy
/demo/* - Demo section (nested routes):
  /demo/dashboard - Main dashboard
  /demo/clients - Client management
  /demo/messages - Messaging
  /demo/factures - Invoicing
  /demo/automations - Automations showcase
```

### Component Organization
- **UI components** (`src/components/ui/`) are shadcn/ui components - follow shadcn patterns when modifying
- **Feature components** (`src/components/`) are marketing-specific (Faq, Automations, PricingCard, etc.)
- **Demo components** (`src/_import_demo/components/demo/`) are isolated from main site

### Path Aliases
The project uses `@/` as an alias for `src/`:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

## Important Conventions

### Styling
- Use Tailwind utility classes for styling
- Use `cn()` from `@/lib/utils` to merge class names conditionally
- CSS variables are defined in HSL format: `hsl(var(--primary))`
- Custom animations are defined in `tailwind.config.ts` (fade-in, wave, glow-pulse, etc.)

### Forms
- Use React Hook Form with Zod resolvers
- Form components follow shadcn/ui patterns (Form, FormField, FormItem, etc.)

### SEO
- Use the `SEOHead` component for page-specific meta tags
- Set `document.title` in page components via `useEffect`

### Scroll Behavior
- `html` has `scroll-behavior: smooth` and `scroll-padding-top` for anchor navigation
- Deep-link scrolling uses `sessionStorage.getItem('scrollTo')` pattern

### Header Visibility
The main header (defined in `App.tsx`) is **hidden** on specific routes:
- Homepage (`/`)
- All demo routes (`/demo/*`)
- Legal pages (`/mentions-legales`, `/politique-confidentialite`)
- Resources/articles (`/ressources`, `/articles`)

This is controlled by the `hideHeader` logic in `AppInner` component.

## Adding New Features

### Adding a new shadcn/ui component
Use the CLI (components are configured in `components.json`):
```bash
npx shadcn-ui@latest add [component-name]
```

### Adding a new page
1. Create component in `src/pages/`
2. Add route in `src/App.tsx` `<Routes>` section
3. Update `hideHeader` logic if needed
4. Add SEO metadata using `SEOHead` component

### Adding demo features
- Work within `src/_import_demo/`
- Keep demo theme isolated using `.demo-scope` class
- Add mock data to `src/_import_demo/data/mockData.ts`

## Lovable Integration

This project was initially created with Lovable (https://lovable.dev) and can be edited there. Changes made via Lovable are automatically committed to this repo.

## Build & Deployment

- Vite outputs to `dist/` directory
- Production builds use `npm run build`
- Can be deployed via Lovable's deployment system (Project > Settings > Domains)
