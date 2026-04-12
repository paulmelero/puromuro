# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Porject overview

Puro Muro is a collective of artists and creatives who are passionate about creating urban art, tattoos, murals, and other creative projects. The main pillar is the graffiti walls. The motto is "The Wall is the Origin".

The site is a content-driven site that uses Nuxt 4 and Nuxt Content v3 to manage the content.

All texts NEED TO BE in Spanish.

## Commands

- **Install deps:** `pnpm install`
- **Dev server:** `pnpm dev` (http://localhost:3000)
- **Build:** `pnpm build`
- **Static generation:** `pnpm generate`
- **Preview production build:** `pnpm preview`
- **Lint:** `pnpm dlx eslint .` (ESLint configured via `@nuxt/eslint` — config extends from `.nuxt/eslint.config.mjs`)

No test framework is configured.

## Architecture

Nuxt 4 content-driven site using **Nuxt Content v3** with SQLite (better-sqlite3) as the content store.

- `content/` — Markdown pages. The collection is defined in `content.config.ts` as a single `content` collection sourcing all files (`**`). Pages are rendered automatically via the catch-all route.
- `app/pages/[...slug].vue` — Catch-all route that queries the `content` collection by path and renders with `<ContentRenderer>`.
- `app/components/` — Vue components that can be embedded directly in Markdown using Nuxt Content's MDC syntax (e.g., `::counter` or `::alert{color="green"}`).

### Nuxt Modules

`@nuxt/content`, `@nuxt/eslint`, `@nuxt/fonts`, `@nuxt/icon`, `@nuxt/image`

### Package Manager

pnpm 9.12.0 (enforced via `packageManager` field). The lock file is gitignored.
