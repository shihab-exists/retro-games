const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');
const GAMES_FILE = path.join(DATA_DIR, 'games.json');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(SCORES_FILE)) fs.writeFileSync(SCORES_FILE, '[]\n');
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ difficulty: 'normal', sound: true, crt: true, visual: 'glow' }, null, 2));
  }
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}



const LEVEL_WORLDS = {
  maze: ['Neon Maze', 'Ghost Subway', 'Candy Grid', 'Midnight Labyrinth', 'Warp Tunnel'],
  speed: ['Emerald Coast', 'Chemical Highway', 'Sky Rail', 'Lava Loop', 'Star Speedway'],
  platform: ['Mushroom Hills', 'Brick Caverns', 'Cloud Steps', 'Lava Castle', 'Star Road'],
  duel: ['Downtown Dojo', 'Harbor Ring', 'Temple Arena', 'Neon Rooftop', 'Final Arcade'],
  tetris: ['Classic Grid', 'Ice Matrix', 'Neon Stack', 'Gravity Core', 'Master Well'],
  zelda: ['Light Forest', 'Desert Ruins', 'Dark Marsh', 'Mirror Castle', 'Sacred Peak'],
  donkey: ['Jungle Canopy', 'Mine Cart Ridge', 'Barrel Bay', 'Snowy Pines', 'Kong Temple'],
  fzero: ['Mute City', 'Big Blue', 'Sand Ocean', 'Fire Field', 'Silence Circuit'],
  goldeneye: ['Dam Facility', 'Bunker Halls', 'Archive Maze', 'Control Room', 'Cradle Tower'],
  ape: ['Time Beach', 'Dino Park', 'Cyber City', 'Snow Fortress', 'Space Circus'],
  tekken: ['Arcade Gym', 'Moonlit Yard', 'Steel Factory', 'Temple Gate', 'King Arena'],
  oddworld: ['Rupture Farm', 'Scrap Lines', 'Shadow Pens', 'Boiler Depths', 'Escape Portal'],
  doom: ['Hangar Gate', 'Toxic Refinery', 'Inferno Keep', 'Phobos Core', 'Demon Citadel'],
  metroid: ['Crateria Rain', 'Brinstar Vines', 'Norfair Heat', 'Wrecked Ship', 'Tourian Depths'],
  wildarms: ['Dusty Trail', 'Canyon Town', 'Ancient Mine', 'Mirage Desert', 'Frontier Shrine']
};

const GAMEPLAY_STYLES = {
  maze: 'Maze chase', speed: 'Momentum runner', platform: 'Precision platformer', duel: 'Arcade fighter', tetris: 'Falling block puzzle',
  zelda: 'Top-down adventure', donkey: 'Jungle platformer', fzero: 'Hover racing', goldeneye: 'Spy target shooter', ape: 'Gadget chase platformer',
  tekken: 'Combo fighter', oddworld: 'Cinematic puzzle platformer', doom: 'Arena shooter', metroid: 'Sci-fi exploration platformer', wildarms: 'Frontier RPG adventure'
};

function buildLevels(game) {
  const worlds = LEVEL_WORLDS[game.id] || ['Retro World'];
  return Array.from({ length: 100 }, (_, i) => {
    const level = i + 1;
    const zone = Math.floor(i / 20) + 1;
    const baseWorld = worlds[i % worlds.length];
    const world = `${baseWorld} Sector ${Math.floor(i / worlds.length) + 1}`;
    const difficultyScore = Math.min(100, 8 + Math.round(level * 0.92));
    const difficulty = level <= 20 ? 'Rookie' : level <= 40 ? 'Normal' : level <= 60 ? 'Hard' : level <= 80 ? 'Expert' : 'Nightmare';
    return {
      gameId: game.id,
      level,
      name: `Level ${level}: ${world}`,
      world,
      zone,
      difficulty,
      difficultyScore,
      speedMultiplier: Number((1 + level * 0.012).toFixed(2)),
      enemyMultiplier: Number((1 + level * 0.01).toFixed(2)),
      targetScore: 500 + level * 150,
      palette: ['neon', 'forest', 'ice', 'lava', 'space'][i % 5],
      objective: `${GAMEPLAY_STYLES[game.id] || 'Retro challenge'} in ${world}. Clear the objective with difficulty ${difficultyScore}/100.`
    };
  });
}

function detectDevice(req) {
  const ua = req.headers['user-agent'] || '';
  const chMobile = req.headers['sec-ch-ua-mobile'];
  const mobileByCH = chMobile === '?1';
  const mobileByUA = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i.test(ua);
  const isMobile = mobileByCH || mobileByUA;
  return {
    type: isMobile ? 'mobile' : 'desktop',
    isMobile,
    controlMode: isMobile ? 'mobile' : 'desktop',
    source: 'backend-user-agent'
  };
}

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); }
      catch { reject(new Error('Invalid JSON body')); }
    });
  });
}

function staticFile(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (!filePath.startsWith(PUBLIC_DIR)) return send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}

async function api(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const games = () => readJson(GAMES_FILE, []);

  if (req.method === 'GET' && url.pathname === '/api/health') {
    return send(res, 200, { ok: true, app: 'Retro Arcade API', games: games().length });
  }


  if (req.method === 'GET' && url.pathname === '/api/device') {
    return send(res, 200, detectDevice(req));
  }

  if (req.method === 'GET' && url.pathname === '/api/games') {
    return send(res, 200, games().map(g => ({ ...g, playStyle: GAMEPLAY_STYLES[g.id] || 'Retro challenge', totalLevels: 100 })));
  }


  const levelsMatch = url.pathname.match(/^\/api\/games\/([^/]+)\/levels(?:\/(\d+))?$/);
  if (req.method === 'GET' && levelsMatch) {
    const game = games().find(g => g.id === levelsMatch[1]);
    if (!game) return send(res, 404, { error: 'Game not found' });
    const levels = buildLevels(game);
    if (levelsMatch[2]) {
      const level = levels.find(l => l.level === Number(levelsMatch[2]));
      return level ? send(res, 200, level) : send(res, 404, { error: 'Level not found' });
    }
    return send(res, 200, levels);
  }

  const gameMatch = url.pathname.match(/^\/api\/games\/([^/]+)$/);
  if (req.method === 'GET' && gameMatch) {
    const game = games().find(g => g.id === gameMatch[1]);
    return game ? send(res, 200, { ...game, playStyle: GAMEPLAY_STYLES[game.id] || 'Retro challenge', totalLevels: 100 }) : send(res, 404, { error: 'Game not found' });
  }

  if (req.method === 'GET' && url.pathname === '/api/settings') {
    return send(res, 200, readJson(SETTINGS_FILE, {}));
  }

  if (req.method === 'PUT' && url.pathname === '/api/settings') {
    try {
      const body = await parseBody(req);
      const settings = {
        difficulty: ['easy', 'normal', 'hard'].includes(body.difficulty) ? body.difficulty : 'normal',
        sound: Boolean(body.sound),
        crt: Boolean(body.crt),
        visual: ['glow', 'clean', 'high'].includes(body.visual) ? body.visual : 'glow'
      };
      writeJson(SETTINGS_FILE, settings);
      return send(res, 200, settings);
    } catch (err) {
      return send(res, 400, { error: err.message });
    }
  }

  if (req.method === 'GET' && url.pathname === '/api/scores') {
    const scores = readJson(SCORES_FILE, []);
    return send(res, 200, scores.slice(-100).reverse());
  }

  if (req.method === 'POST' && url.pathname === '/api/scores') {
    try {
      const body = await parseBody(req);
      const validGame = games().some(g => g.id === body.gameId);
      if (!validGame) return send(res, 400, { error: 'Invalid gameId' });
      const entry = {
        id: crypto.randomUUID(),
        gameId: body.gameId,
        player: String(body.player || 'PLAYER').slice(0, 18),
        score: Math.max(0, Number.parseInt(body.score, 10) || 0),
        createdAt: new Date().toISOString()
      };
      const scores = readJson(SCORES_FILE, []);
      scores.push(entry);
      writeJson(SCORES_FILE, scores.slice(-500));
      return send(res, 201, entry);
    } catch (err) {
      return send(res, 400, { error: err.message });
    }
  }

  return send(res, 404, { error: 'API route not found' });
}

ensureFiles();

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) return api(req, res);
  return staticFile(req, res);
});

server.listen(PORT, () => {
  console.log(`Retro Arcade running at http://localhost:${PORT}`);
  console.log(`API health check: http://localhost:${PORT}/api/health`);
});
