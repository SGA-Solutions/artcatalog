# Project Reference Document

This document describes the technical stack, architecture, design patterns, and system design of the current project. It is intended to serve as a blueprint for building similar applications.

## 1. Tech Stack

### Core Framework & Language
- **Framework**: [Next.js 15.4.6](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library**: [React 19.1.0](https://react.dev/)

### Styling
- **CSS Framework**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Fonts**: `next/font` (Geist Sans, Geist Mono, Custom Futura fonts)
- **Icons**: `@sanity/icons`

### CMS & Data
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Client**: `next-sanity`, `@sanity/client`
- **Content Queries**: GROQ (Graph-Relational Object Queries)
- **Studio**: Embedded Sanity Studio (`sanity` package)


## 2. Architecture

### Directory Structure
- **`app/`**: Next.js App Router directory. Contains pages, layouts, and global styles.
- **`components/`**: Reusable UI components.
- **`contexts/`**: React Context providers for global state (Theme, Mobile state, Preloader).
- **`hooks/`**: Custom React hooks.
- **`lib/`**: Utility functions, Sanity client configuration, and GROQ queries.
- **`sanity/`**: Sanity Studio configuration and schema definitions.
  - **`schemas/`**: Content type definitions (e.g., `project.ts`, `post.ts`).
  - **`config.ts`**: Sanity Studio configuration.
  - **`client.ts`**: Sanity client setup.
- **`public/`**: Static assets.

### App Router & Layout
- The application uses the Next.js App Router.
- **`app/layout.tsx`**: The root layout wraps the application in multiple providers:
  - `PreloaderProvider`: Manages the initial loading state.
  - `MobileProvider`: Manages mobile-specific state.
  - `ThemeProvider`: Manages visual themes.
  - `LayoutContent`: A wrapper component for the main content.
- **Global Styles**: Defined in `app/globals.css` and `app/layout.tsx` (Tailwind classes).

### Sanity Integration
- **Embedded Studio**: Sanity Studio is mounted at `/studio` (configured in `sanity.config.ts`).
- **Data Fetching**: Data is fetched using the `client` from `sanity/client.ts` and GROQ queries defined in `lib/sanity-queries.ts`.
- **Image Rendering**: Uses `@sanity/image-url` to generate optimized image URLs.

## 3. System Design

### Data Flow
1.  **Content Creation**: Content is managed in Sanity Studio.
2.  **Data Retrieval**: Next.js pages/components fetch data from Sanity using GROQ queries.
3.  **Rendering**:
    -   Likely uses **Static Site Generation (SSG)** or **Incremental Static Regeneration (ISR)** for high performance, given the nature of a portfolio/content site.
    -   `sanity-queries.ts` defines optimized queries selecting only necessary fields.

## 4. Design Patterns

### Component Composition
-   Small, focused components
-   Layout wrapper pattern (`LayoutContent`) to separate layout logic from global providers.

### Context API
-   Used for global UI state that doesn't require a complex state management library (Redux/Zustand).
-   Examples: Toggling mobile menu, handling theme switching, managing preloader visibility.

### Custom Hooks
-   Encapsulate logic in `hooks/` (e.g., likely for window resizing, scroll detection, or data fetching abstractions).

### Utility Functions
-   **`lib/sanity-queries.ts`**: Centralized location for all GROQ queries to maintain consistency and reusability.
-   **`lib/image-utils.ts`**: Helpers for image processing/URL generation.

### Mobile-First design
-  Must be mobile-first design

## 5. Deployment

### Platform
-   **Vercel**: The project is optimized for deployment on Vercel (implied by `next.config.ts` and standard Next.js practices).

### Environment Variables
Required environment variables (typically in `.env.local`):
-   `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity Project ID.
-   `NEXT_PUBLIC_SANITY_DATASET`: Sanity Dataset name (e.g., "production").
-   `NEXT_PUBLIC_SANITY_API_VERSION`: API version date (e.g., "2025-05-01").

### Build Process
1.  `npm run build`: Runs `next build`.
2.  Next.js compiles the application and generates static pages/assets.
3.  Sanity configuration is bundled for the embedded Studio.
