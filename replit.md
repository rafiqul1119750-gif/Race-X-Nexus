# Race-X Creator Ecosystem

## Overview

Full-stack pnpm monorepo. Race-X is a hyper-gamified creator platform with 6 modules, God Mode Admin, AI engagement, gamification, enforcement, and more.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion

## Architecture

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (all backend routes)
│   ├── race-x/             # React + Vite frontend (main app, served at /)
│   └── mockup-sandbox/     # Design prototyping sandbox
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
```

## Race-X Modules & Pages

| Route | Page | Description |
|---|---|---|
| `/` | Main Hub | Floating 3D module cards, event ticker, user welcome |
| `/studio` | RX Studio | Recent projects, AI Mentor, templates, collaboration |
| `/studio/editor` | Studio Editor | Canvas with resizable aspect ratio + tool sidebars |
| `/social` | RX Social | Feed, like/save/comment, trending hashtags |
| `/chat` | RX Magic Chat | Real-time chat, AI suggestions, message append |
| `/music` | RX Music | Track list, sticky player, AI-generated music |
| `/shop` | RX Shopping | Items, Add to Cart (updates global cart count) |
| `/events` | Events | Live tournaments, PvP, seasonal, workshops |
| `/leaderboard` | Leaderboard | Global ranking, seasons, faction badges |
| `/admin` | God Mode Admin | Full dashboard: users, modules, rewards, logs |
| `/profile` | User Profile | Balance, achievements, faction, status |

## API Endpoints (all at /api/*)

- `GET/PUT /user/profile` — Current user profile + updates
- `GET /modules`, `POST /modules/:id/toggle` — Module management
- `GET /rewards`, `POST /rewards/grant` — Diamonds/Gems
- `GET/POST /events` — Events and tournaments
- `GET/POST /leaderboard` — Leaderboard + reset
- `GET /admin/users`, `POST /admin/users/:id/action`, `GET /admin/logs` — God Mode
- `GET/POST /enforcement/violations` — Safety enforcement
- `GET /social/feed`, `POST /social/posts/:id/like` — Social
- `GET/POST /chat/messages` — Chat
- `GET /music/tracks` — Music library
- `GET /shop/items`, `POST /shop/cart` — Shopping

## Key Features

- **AppContext**: Global React context managing user profile, modules, cart count, current music track, chat messages, reward balances, god mode state
- **Floating 3D Cards**: Glassmorphism cards on Home with hover lift + glow
- **Enforcement**: 3-strike system → account freeze (3 hour timer)
- **God Mode Admin**: Toggle modules on/off (instantly hides from Home), grant rewards, ban users, view audit logs, reset leaderboard
- **Interactive**: Like toggle (red/gray), Save toggle, Chat send (appends), Cart count (header badge), Music sticky player
- **Ripple animations**: All buttons have press animation

## Running in Development

- API Server: `pnpm --filter @workspace/api-server run dev`
- Race-X Frontend: `pnpm --filter @workspace/race-x run dev`
- DB push: `pnpm --filter @workspace/db run push`
- Codegen: `pnpm --filter @workspace/api-spec run codegen`
