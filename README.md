# The Headlines Today

AI-curated daily news briefing, edited by Maxwell.

## Stack

- React 19 + TypeScript + Vite
- Pure CSS (no Tailwind)
- Served via nginx in Docker

## Local Dev

```bash
npm install
npm run dev
# Runs at http://localhost:3003
```

## Production Build

```bash
npm run build
docker compose up -d
```

## Docker

- Container: `the-headlines-today`
- Port: `3006:80`
- Archive mount: `/home/r2d2/newspapers` → `/archive` (read-only)
- Network: `webnet` (external)

## Data Pipeline

```
RSS Feeds → maxwell.py (5 AM EST) → data.json + .mp3 + .pdf
                                            ↓
                                   /home/r2d2/newspapers/YYYY/MM/DD/
                                            ↓
                                   nginx serves /archive/YYYY/MM/DD/
                                            ↓
                                   React app reads + displays
```

## Branches

- `master` — stable releases only
- `development` — active work; PRs to master on version bumps

## License

MIT
