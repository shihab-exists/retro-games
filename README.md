# Retro Arcade Web App MVP

A retro arcade-style web app with a Node.js backend and a browser frontend.

## Current working game list

This version intentionally keeps only the 5 most stable games:

1. Pac-Man-inspired maze chase
2. Sonic the Hedgehog 2-inspired speed runner
3. Super Mario World-inspired platformer
4. Street Fighter II-inspired arcade duel
5. Tetris-inspired falling-block puzzle

> This project uses original retro-inspired mini-games, UI, and pixel-style illustrations. It does not include official ROMs, official box art, or copyrighted game assets.

## Features

- 5 working selectable games
- Retro arcade game select screen
- Start confirmation popup when a game is clicked
- Instruction/settings screen before gameplay
- Desktop keyboard controls
- Mobile floating controller
- Backend device detection: `/api/device`
- 100-level campaign metadata for each game
- Level selector before starting
- Next-level popup after clearing a level
- Retry/quit flow after losing

## Project structure

```txt
retro-games/
├── server.js
├── package.json
├── README.md
├── data/
│   ├── games.json
│   ├── scores.json
│   └── settings.json
└── public/
    ├── index.html
    ├── styles.css
    └── app.js
```

## Run locally

```bash
npm start
```

Open:

```txt
http://localhost:3000
```

## API endpoints

```txt
GET  /api/health
GET  /api/device
GET  /api/games
GET  /api/games/:id
GET  /api/games/:id/levels
GET  /api/games/:id/levels/:level
GET  /api/settings
PUT  /api/settings
GET  /api/scores
POST /api/scores
```

## Controls

Desktop:

- Move: Arrow Keys or WASD
- Action / Jump / Shoot: Space
- Secondary action / hard drop: Enter
- Pause: P
- Quit: ESC

Mobile:

- Floating D-pad
- A button
- B button
- P pause button

## Level environment/difficulty behavior

Level selection now changes gameplay, not just text:

- Each level has a unique world label such as `Mushroom Hills Sector 1`, `Brick Caverns Sector 1`, etc.
- The canvas background/theme changes by level palette: neon, forest, ice, lava, and space.
- A level banner is drawn inside the game canvas showing world, level number, and difficulty score.
- Difficulty affects game speed/enemy behavior through level multipliers.
- Higher campaign levels increase speed/enemy pressure and target score.
