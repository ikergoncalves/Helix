# Helix

A Linear / Notion-light workspace for managing projects and tasks — a focused, fast, dark-mode-ready SaaS dashboard built as a portfolio piece.

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

## Tech Stack

- **[Next.js 14](https://nextjs.org)** — App Router, server/client components, file-based routing.
- **TypeScript** — `strict` mode, zero `any`.
- **[chiselui](https://www.npmjs.com/package/chiselui)** — the design system every UI element is built on ([source & Storybook](https://ikergoncalves.github.io/chiselui)).
- **[Tailwind CSS](https://tailwindcss.com)** — utility classes for layout and spacing, driven by chiselui's design tokens.
- **localStorage** — client-side persistence; no backend required to run the app.

## Features

- **Projects listing** — responsive grid of project cards with status badges and a live completion progress bar.
- **Task board** — tasks grouped by status in an accordion, each card showing priority, assignee, and deadline range.
- **Full CRUD** — create and edit projects through a modal and tasks through a drawer, with validated forms and toast feedback.
- **Dark mode** — a self-contained theme toggle that persists the user's choice; the entire page (not just components) follows the active theme via design tokens.
- **Settings with auto-save** — profile, notification toggles, and appearance preferences saved as you change them.
- **Polished states** — custom 404 page, route-level loading spinner, and an error boundary with retry.
- **Responsive layout** — a fixed sidebar on desktop that collapses into a sticky top header on mobile.

## Getting Started

```bash
git clone https://github.com/ikergoncalves/Helix.git
cd Helix
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app seeds sample data into `localStorage` on first load.

## Project Structure

```
src/
├── app/            # App Router routes, layouts, and the 404 / loading / error states
│   ├── projects/   # Projects listing and per-project task board
│   └── settings/   # Profile, notifications, and appearance settings
├── components/
│   ├── layout/     # App shell, sidebar, and mobile navigation
│   ├── projects/   # Project card and create/edit modal
│   ├── tasks/      # Task board, card, and drawer form
│   └── settings/   # Profile, notifications, and appearance sections
├── hooks/          # localStorage-backed data hooks (projects, tasks, settings)
├── lib/            # Storage keys, seed data, date and avatar helpers
└── types/          # Shared TypeScript models
```

## Design System

Every visual element in Helix comes from **[chiselui](https://www.npmjs.com/package/chiselui)**, a design system built from scratch — buttons, badges, drawers, modals, toasts, progress bars, the theme toggle, and the underlying CSS design tokens that make theming consistent across the whole app. Browse the components in the [Storybook](https://ikergoncalves.github.io/chiselui).

## Roadmap

- Deploy to [Vercel](https://vercel.com).

---

Built by [Iker Gonçalves](https://github.com/ikergoncalves).
