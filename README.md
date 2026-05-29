# Retro Arcade Web App MVP

A retro arcade-style web app with a frontend and backend.

## Included games

1. Pac-Man
2. Sonic the Hedgehog 2
3. Super Mario World
4. Street Fighter II
5. Tetris
6. The Legend of Zelda: A Link to the Past
7. Donkey Kong Country
8. F-Zero
9. GoldenEye 007
10. Ape Escape
11. Tekken 2
12. Oddworld: Abe's Oddysee
13. DOOM
14. Super Metroid
15. Wild Arms

> This MVP uses original retro-inspired mini-games, UI, and pixel-style illustrations. It does not include official ROMs, official box art, or copyrighted game assets.

## Project structure

```txt
retro-arcade-webapp/
├── server.js              # Node backend and static file server
├── package.json           # Start/check scripts
├── README.md
├── data/
│   ├── games.json         # Backend game catalogue, all 15 games
│   ├── scores.json        # Auto-created high score storage
│   └── settings.json      # Auto-created settings storage
└── public/
    ├── index.html         # Frontend HTML
    ├── styles.css         # Retro/pixel/CRT styling
    └── app.js             # Frontend JS and mini-game engines
```

## Run locally

```bash
npm start
```

Then open:

```txt
http://localhost:3000
```

## API endpoints

```txt
GET  /api/health
GET  /api/games
GET  /api/games/:id
GET  /api/settings
PUT  /api/settings
GET  /api/scores
POST /api/scores
```

## Keyboard controls

Common controls:

- Move: Arrow Keys or WASD
- Action / Jump / Shoot: Space
- Secondary action / hard drop: Enter
- Pause: P
- Quit: ESC

Each game also has its own instruction screen before play.

## Latest UX updates

- Clicking any game card now opens a pixel-style confirmation popup asking whether to start.
- Backend endpoint `GET /api/device` detects mobile vs desktop from request headers.
- The frontend automatically selects:
  - Desktop keyboard controls on desktop browsers
  - Floating touch controller on mobile browsers
- Mobile players get on-screen D-pad and A/B/P buttons during gameplay.
- Platform games now draw a small humanoid player character; Super Mario World uses a Mario-like pixel character.
