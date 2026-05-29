const fallbackGames=[
 {id:'maze',title:'Pac-Man',year:'1980',emoji:'🟡',accent:'#FFD93D',tag:'Maze escape madness',desc:'Ghosts get smarter fast — one wrong turn and it’s over.',thumb:'mazeThumb',brief:'A maze-chase arcade challenge inspired by classic dot-eating action. Collect every pellet while avoiding ghosts that cut off your route.',controls:[['Arrow Keys / WASD','Move through the maze'],['P','Pause'],['ESC','Quit to menu'],['Enter','Restart after game over']],objectives:['Collect dots for points.','Avoid ghosts.','Clear the maze to win the round.']},
 {id:'speed',title:'Sonic the Hedgehog 2',year:'1992',emoji:'🔵',accent:'#4DA8FF',tag:'Pure speed platforming',desc:'Fast, fluid, and packed with momentum-driven action.',thumb:'sonicThumb',brief:'A fast side-scrolling runner inspired by speed platformers. Keep momentum, jump obstacles, and grab rings.',controls:[['Space / ↑ / W','Jump'],['↓ / S','Slide / fast fall'],['P','Pause'],['ESC','Quit']],objectives:['Collect rings.','Jump over spikes and blocks.','Survive as the speed increases.']},
 {id:'platform',title:'Super Mario World',year:'1990',emoji:'🍄',accent:'#FF4D4D',tag:'Creative classic platforming',desc:'Tight controls and unforgettable level design.',thumb:'marioThumb',brief:'A compact platforming stage with coins, enemies, and chunky blocks. Precision jumping is the whole game.',controls:[['← / → or A / D','Move'],['Space / ↑ / W','Jump'],['↓ / S','Crouch / drop faster'],['ESC','Quit']],objectives:['Collect coins.','Land on enemies or avoid them.','Reach the flag at the far right.']},
 {id:'duel',title:'Street Fighter II',year:'1991',emoji:'🥊',accent:'#FF6B6B',tag:'Arcade 1v1 showdown',desc:'Pick a fighter and test your reflexes and strategy.',thumb:'fightThumb',brief:'A one-screen arcade duel inspired by old-school fighting games. Manage spacing, strike, and block the CPU.',controls:[['← / → or A / D','Move'],['Space','Punch'],['Enter / K','Kick'],['↓ / S','Block']],objectives:['Reduce CPU health to zero.','Block incoming hits.','Do not let your health hit zero.']},
 {id:'tetris',title:'Tetris',year:'1985',emoji:'🧱',accent:'#A66CFF',tag:'Simple. Hypnotic. Brutal.',desc:'Easy to learn, intense to master at higher speeds.',thumb:'tetrisThumb',brief:'A falling-block puzzle challenge. Rotate, place, and clear rows before the stack reaches the top.',controls:[['← / → or A / D','Move piece'],['↑ / W / Space','Rotate'],['↓ / S','Soft drop'],['Enter','Hard drop']],objectives:['Fill rows to clear lines.','Avoid stacking to the top.','Score rises with multi-line clears.']},
 {id:'zelda',title:'The Legend of Zelda: A Link to the Past',year:'1991',emoji:'🗡️',accent:'#59D86D',tag:'Overworld dungeon adventure',desc:'Explore light and dark realms with crafted secrets and danger.',thumb:'zeldaThumb',brief:'A top-down adventure-inspired challenge. Navigate a dungeon-like maze, collect relics, and avoid roaming monsters.',controls:[['Arrow Keys / WASD','Move hero'],['Space','Use sword / action'],['P','Pause'],['ESC','Quit']],objectives:['Explore the maze.','Collect relics for points.','Avoid monsters and clear the route.']},
 {id:'donkey',title:'Donkey Kong Country',year:'1994',emoji:'🦍',accent:'#C77732',tag:'Jungle platform rush',desc:'Tight platforming, barrels, bananas, and chunky jungle rhythm.',thumb:'donkeyThumb',brief:'A jungle platformer-inspired stage. Run, jump, collect bananas, and dodge hazards.',controls:[['← / → or A / D','Move'],['Space / ↑ / W','Jump'],['↓ / S','Drop faster'],['ESC','Quit']],objectives:['Collect bananas/coins.','Avoid enemies.','Reach the end of the jungle stage.']},
 {id:'fzero',title:'F-Zero',year:'1990',emoji:'🚀',accent:'#FF8A00',tag:'High-speed hover racing',desc:'A futuristic racing rush built around speed and reaction time.',thumb:'fzeroThumb',brief:'A hover-racer-inspired speed challenge. Dodge track hazards as the velocity keeps climbing.',controls:[['← / → or A / D','Steer'],['Space / ↑ / W','Boost jump/evade'],['P','Pause'],['ESC','Quit']],objectives:['Survive the fastest track.','Dodge barriers.','Push your score higher as speed rises.']},
 {id:'goldeneye',title:'GoldenEye 007',year:'1997',emoji:'🔫',accent:'#D6B85A',tag:'Living-room spy shooter',desc:'Split-screen era FPS energy with quick aim and target reflexes.',thumb:'goldenThumb',brief:'A spy-shooter-inspired target range. Move the reticle, tag enemies, and avoid civilian decoys.',controls:[['Arrow Keys / WASD','Move aim'],['Space / Enter','Shoot'],['P','Pause'],['ESC','Quit']],objectives:['Shoot hostile targets.','Avoid missing too much.','Survive the mission timer.']},
 {id:'ape',title:'Ape Escape',year:'1999',emoji:'🐒',accent:'#FFB347',tag:'Monkey-catching gadget chase',desc:'Creative platforming built around chasing clever monkeys through time.',thumb:'apeThumb',brief:'A gadget-platformer-inspired chase. Leap through a stage and collect escaped monkeys/coins.',controls:[['← / → or A / D','Move'],['Space / ↑ / W','Jump'],['Enter','Swing net / action'],['ESC','Quit']],objectives:['Catch monkeys by collecting targets.','Avoid hazards.','Reach the stage end.']},
 {id:'tekken',title:'Tekken 2',year:'1995',emoji:'👾',accent:'#B56CFF',tag:'3D arcade fighter energy',desc:'Deep combos, iconic fighters, and tense close-range duels.',thumb:'tekkenThumb',brief:'A fighting-game-inspired arcade duel. Step in, strike, block, and defeat the CPU opponent.',controls:[['← / → or A / D','Move'],['Space','Punch'],['Enter / K','Kick'],['↓ / S','Block']],objectives:['Drop CPU health to zero.','Time blocks and counterattacks.','Win the round.']},
 {id:'oddworld',title:"Oddworld: Abe's Oddysee",year:'1997',emoji:'👽',accent:'#76D7C4',tag:'Dark puzzle platform escape',desc:'Atmospheric cinematic platforming with danger around every step.',thumb:'oddThumb',brief:'A puzzle-platformer-inspired escape. Move carefully, collect clues, and survive the factory path.',controls:[['← / → or A / D','Move'],['Space / ↑ / W','Jump'],['↓ / S','Sneak/drop'],['ESC','Quit']],objectives:['Move carefully through hazards.','Collect clues.','Escape the stage.']},
 {id:'doom',title:'DOOM',year:'1993',emoji:'💀',accent:'#D6422B',tag:'Fast demon-blasting FPS',desc:'A milestone shooter: quick, intense, loud, and endlessly replayable.',thumb:'doomThumb',brief:'A fast shooter-inspired target arena. Keep moving, blast demons, and survive the wave.',controls:[['Arrow Keys / WASD','Move aim'],['Space / Enter','Fire'],['P','Pause'],['ESC','Quit']],objectives:['Hit enemy targets.','Protect your health.','Survive as targets speed up.']},
 {id:'metroid',title:'Super Metroid',year:'1994',emoji:'🧬',accent:'#FF7A3D',tag:'Isolated sci-fi exploration',desc:'Non-linear exploration, haunting atmosphere, and secrets everywhere.',thumb:'metroidThumb',brief:'A sci-fi exploration-platformer-inspired stage. Jump, collect energy, and reach the exit.',controls:[['← / → or A / D','Move'],['Space / ↑ / W','Jump'],['Enter','Blaster / action'],['ESC','Quit']],objectives:['Collect energy orbs.','Avoid alien hazards.','Reach the far exit.']},
 {id:'wildarms',title:'Wild Arms',year:'1996',emoji:'🌍',accent:'#E2B15C',tag:'Western JRPG adventure',desc:'A sweeping frontier quest with emotional story and classic RPG charm.',thumb:'wildThumb',brief:'A western-RPG-inspired overworld quest. Explore the frontier maze, collect treasures, and avoid monsters.',controls:[['Arrow Keys / WASD','Move traveler'],['Space / Enter','Interact'],['P','Pause'],['ESC','Quit']],objectives:['Collect treasure.','Avoid roaming enemies.','Finish the frontier route.']}
];
let games=[...fallbackGames];
let selected=null, selectedLevel=null, currentLevels=[], settings={difficulty:'normal',sound:true,crt:true,visual:'glow',controlMode:'desktop'};
let deviceInfo={type:'desktop',isMobile:false,source:'fallback'};
let virtualKeys={};
const $=id=>document.getElementById(id); const menu=$('menu'), inst=$('instructions'), play=$('play');
function beep(freq=440,dur=.045,type='square'){ if(!settings.sound) return; try{const ac=new (window.AudioContext||window.webkitAudioContext)(); const o=ac.createOscillator(), g=ac.createGain(); o.type=type;o.frequency.value=freq;o.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(.045,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+dur);o.start();o.stop(ac.currentTime+dur)}catch(e){} }
function renderCards(){ $('gameGrid').innerHTML=games.map(g=>`<button class="card ${selected&&g.id===selected.id?'selected':''}" data-id="${g.id}" style="--cardAccent:${g.accent};--glow:${g.accent}66"><div class="thumb ${g.thumb}">${thumbInner(g.id)}</div><div class="titleRow"><h2>${g.emoji} ${g.title}</h2><span class="year">${g.year}</span></div><div class="tag">${g.tag}</div><p class="desc">${g.desc}</p><span class="campaignBadge">100 LEVELS • ${g.playStyle||'UNIQUE MODE'}</span><span class="ready">READY</span></button>`).join(''); document.querySelectorAll('.card').forEach(b=>b.onclick=()=>{selected=games.find(g=>g.id===b.dataset.id); setAccent(); renderCards(); updateSelected(); openGamePrompt(); beep(620)}); }
function thumbInner(id){return {maze:'<i class="dots"></i><i class="pac"></i><i class="ghost"></i>',speed:'<i class="trail"></i><i class="ring"></i>',platform:'<i class="cloud"></i><i class="hill"></i><i class="block"></i>',duel:'<i class="burst"></i><i class="fist left"></i><i class="fist right"></i>',tetris:'<i class="tet"></i>',zelda:'<i class="sword"></i>',donkey:'<i class="banana"></i><i class="barrel"></i>',fzero:'<i class="track"></i><i class="ship"></i>',goldeneye:'<i class="crosshair"></i>',ape:'<i class="monkey"></i><i class="net"></i>',tekken:'',oddworld:'<i class="factory"></i><i class="alien"></i>',doom:'<i class="demon"></i>',metroid:'<i class="planet"></i><i class="samus"></i>',wildarms:'<i class="cactus"></i><i class="hat"></i>'}[id]||''}
function setAccent(){document.documentElement.style.setProperty('--accent',selected.accent)}
function updateSelected(){ $('selectedTitle').textContent=`${selected.emoji} ${selected.title} (${selected.year})`; $('selectedDesc').textContent=selected.desc; }
function fallbackLevels(game){
  const worlds={maze:['Neon Maze','Ghost Subway','Candy Grid','Midnight Labyrinth','Warp Tunnel'],speed:['Emerald Coast','Chemical Highway','Sky Rail','Lava Loop','Star Speedway'],platform:['Mushroom Hills','Brick Caverns','Cloud Steps','Lava Castle','Star Road'],duel:['Downtown Dojo','Harbor Ring','Temple Arena','Neon Rooftop','Final Arcade'],tetris:['Classic Grid','Ice Matrix','Neon Stack','Gravity Core','Master Well'],zelda:['Light Forest','Desert Ruins','Dark Marsh','Mirror Castle','Sacred Peak'],donkey:['Jungle Canopy','Mine Cart Ridge','Barrel Bay','Kong Temple','Snowy Pines'],fzero:['Mute City','Big Blue','Sand Ocean','Fire Field','Silence Circuit'],goldeneye:['Dam Facility','Bunker Halls','Archive Maze','Control Room','Cradle Tower'],ape:['Time Beach','Dino Park','Cyber City','Snow Fortress','Space Circus'],tekken:['Arcade Gym','Moonlit Yard','Steel Factory','Temple Gate','King Arena'],oddworld:['Rupture Farm','Scrap Lines','Shadow Pens','Boiler Depths','Escape Portal'],doom:['Hangar Gate','Toxic Refinery','Inferno Keep','Phobos Core','Demon Citadel'],metroid:['Crateria Rain','Brinstar Vines','Norfair Heat','Wrecked Ship','Tourian Depths'],wildarms:['Dusty Trail','Canyon Town','Ancient Mine','Mirage Desert','Frontier Shrine']}[game.id]||['Retro World'];
  return Array.from({length:100},(_,i)=>{const level=i+1, world=worlds[i%worlds.length], difficultyScore=Math.min(100,8+Math.round(level*.92)); return {gameId:game.id,level,name:`Level ${level}: ${world}`,world,zone:Math.floor(i/20)+1,difficulty:level<=20?'Rookie':level<=40?'Normal':level<=60?'Hard':level<=80?'Expert':'Nightmare',difficultyScore,speedMultiplier:Number((1+level*.012).toFixed(2)),enemyMultiplier:Number((1+level*.01).toFixed(2)),targetScore:500+level*150,palette:['neon','forest','ice','lava','space'][i%5],objective:`Clear ${world} with difficulty ${difficultyScore}/100.`};});
}
async function loadLevels(){
  currentLevels=fallbackLevels(selected);
  try{const res=await fetch(`/api/games/${selected.id}/levels`); if(res.ok){const apiLevels=await res.json(); if(apiLevels.length===100) currentLevels=apiLevels;}}catch(e){}
  selectedLevel=currentLevels[0];
  const sel=$('levelSelect');
  if(sel){sel.innerHTML=currentLevels.map(l=>`<option value="${l.level}">${String(l.level).padStart(3,'0')} • ${l.world} • ${l.difficulty}</option>`).join(''); sel.value='1'; sel.onchange=()=>{selectedLevel=currentLevels.find(l=>l.level===Number(sel.value))||currentLevels[0]; updateLevelInfo();};}
  updateLevelInfo();
}
function updateLevelInfo(){
  if(!$('levelInfo')||!selectedLevel)return;
  $('levelInfo').innerHTML=`<strong>${selectedLevel.name}</strong><br>World: ${selectedLevel.world} • Zone ${selectedLevel.zone} • Difficulty ${selectedLevel.difficultyScore}/100 (${selectedLevel.difficulty})<br>Target Score: ${selectedLevel.targetScore}`;
}
function mobileControlsForGame(){
  const isShooter=['goldeneye','doom'].includes(selected?.id);
  const isFighter=['duel','tekken'].includes(selected?.id);
  const isTetris=selected?.id==='tetris';
  if(isTetris) return [['D-Pad','Move piece / soft drop'],['A','Rotate'],['B','Hard drop'],['P','Pause']];
  if(isShooter) return [['D-Pad','Move aim'],['A / B','Shoot'],['P','Pause']];
  if(isFighter) return [['← / →','Move'],['▼','Block'],['A','Punch'],['B','Kick']];
  return [['D-Pad','Move'],['A','Jump / action'],['B','Secondary action'],['P','Pause']];
}
function updateControlInstructions(){
  const isMobile=settings.controlMode==='mobile';
  $('controlHeading').textContent=isMobile?'Mobile Floating Controller':'Keyboard Controller';
  $('deviceHint').textContent=isMobile?'Mobile detected: floating touch controls are enabled in-game.':'Desktop detected: keyboard controls are selected automatically.';
  const rows=isMobile?mobileControlsForGame():selected.controls;
  $('controlList').innerHTML=rows.map(c=>`<div class="keyline"><span class="kbd">${c[0]}</span><br>${c[1]}</div>`).join('');
}
function openGamePrompt(){
  $('promptIcon').textContent=selected.emoji;
  $('promptTitle').textContent=`Start ${selected.title}?`;
  $('promptText').textContent=`${selected.tag}. ${selected.desc} Do you want to continue to controller instructions and start?`;
  $('gamePrompt').classList.remove('hidden');
}
function closeGamePrompt(){ $('gamePrompt').classList.add('hidden'); }
function setControlMode(mode, source='manual'){
  settings.controlMode=mode;
  const select=$('controlMode'); if(select) select.value=mode;
  document.body.classList.toggle('mobile-mode',mode==='mobile');
  document.body.classList.toggle('desktop-mode',mode!=='mobile');
  if($('deviceHint')) $('deviceHint').textContent=mode==='mobile'?`Mobile controls selected (${source}).`:`Desktop keyboard selected (${source}).`;
  updateMobileControls();
}
function updateMobileControls(){
  const controls=$('mobileControls'); if(!controls) return;
  const show=settings.controlMode==='mobile' && !play.classList.contains('hidden');
  controls.classList.toggle('hidden',!show);
}
function showScreen(s){[menu,inst,play].forEach(x=>x.classList.add('hidden')); s.classList.remove('hidden'); updateMobileControls();}
async function openInstructions(){closeGamePrompt();setAccent(); $('instTitle').textContent=`${selected.emoji} ${selected.title}`; $('instBrief').textContent=`${selected.brief} Campaign: 100 progressive levels with unique worlds and level difficulty.`; updateControlInstructions(); $('objectiveList').innerHTML=selected.objectives.map(o=>`<li>${o}</li>`).join('')+'<li>Complete 100-level campaign progression; every level has its own world, target score, and difficulty curve.</li>'; await loadLevels(); showScreen(inst); beep(330)}
$('randomBtn').onclick=()=>{selected=games[Math.floor(Math.random()*games.length)];setAccent();renderCards();updateSelected();openGamePrompt();beep(760)}; $('detailsBtn').onclick=openInstructions; $('startBtn').onclick=openGamePrompt; $('backMenuBtn').onclick=()=>{showScreen(menu);beep(220)}; $('playNowBtn').onclick=()=>startGame(); $('quitBtn').onclick=()=>quitGame(); $('pauseBtn').onclick=()=>togglePause(); $('resumeBtn').onclick=()=>togglePause(); $('promptClose').onclick=closeGamePrompt; $('promptNo').onclick=closeGamePrompt; $('promptDetails').onclick=openInstructions; $('promptYes').onclick=openInstructions; $('gamePrompt').addEventListener('click',e=>{if(e.target.id==='gamePrompt')closeGamePrompt();});
$('difficulty').onchange=e=>settings.difficulty=e.target.value; $('soundToggle').onchange=e=>settings.sound=e.target.checked; $('crtToggle').onchange=e=>{settings.crt=e.target.checked;document.body.classList.toggle('scanlines',settings.crt)}; $('visualMode').onchange=e=>{settings.visual=e.target.value; document.body.style.filter=e.target.value==='high'?'contrast(1.18) saturate(1.25)':e.target.value==='clean'?'none':'saturate(1.08)'}; $('controlMode').onchange=e=>{setControlMode(e.target.value,'manual'); updateControlInstructions();};
async function init(){
  const clientInfo=clientDeviceInfo();
  try{
    const [gameRes,deviceRes]=await Promise.allSettled([fetch('/api/games'),fetch('/api/device')]);
    if(gameRes.status==='fulfilled'&&gameRes.value.ok){ const apiGames=await gameRes.value.json(); games=apiGames.length>=fallbackGames.length?apiGames:mergeGames(fallbackGames,apiGames); }
    if(deviceRes.status==='fulfilled'&&deviceRes.value.ok){
      const serverInfo=await deviceRes.value.json();
      const isMobile=Boolean(serverInfo.isMobile || clientInfo.isMobile);
      deviceInfo={...serverInfo,isMobile,type:isMobile?'mobile':'desktop',controlMode:isMobile?'mobile':'desktop',source:`${serverInfo.source}+client-check`};
    } else { deviceInfo=clientInfo; }
  }catch(e){ console.warn('Using local fallback data because API is unavailable.', e); deviceInfo=clientInfo; }
  selected=games[0];
  setControlMode(deviceInfo.isMobile?'mobile':'desktop',deviceInfo.source||'auto');
  renderCards();setAccent();updateSelected();
}
function mergeGames(base,extra){const map=new Map(base.map(g=>[g.id,g])); (extra||[]).forEach(g=>map.set(g.id,{...map.get(g.id),...g})); return [...map.values()];}
function clientDeviceInfo(){const isMobile=(window.matchMedia&&matchMedia('(pointer: coarse)').matches) || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent); return {type:isMobile?'mobile':'desktop',isMobile,controlMode:isMobile?'mobile':'desktop',source:'client'};}
init();

const canvas=$('gameCanvas'), ctx=canvas.getContext('2d'); let keys={}, engine=null, raf=null, paused=false,last=0;
function bindMobileControls(){document.querySelectorAll('.vbtn').forEach(btn=>{const key=btn.dataset.key==='space'?' ':btn.dataset.key; const down=e=>{e.preventDefault();virtualKeys[key]=true;btn.classList.add('active'); if((key==='p')&&!play.classList.contains('hidden')) togglePause(); if(engine&&engine.keydown&&(key===' '||key==='enter')) engine.keydown(key);}; const up=e=>{e.preventDefault();virtualKeys[key]=false;btn.classList.remove('active'); if(engine&&engine.keyup) engine.keyup(key);}; btn.addEventListener('pointerdown',down); btn.addEventListener('pointerup',up); btn.addEventListener('pointercancel',up); btn.addEventListener('pointerleave',up);});}
bindMobileControls();
window.addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true; if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) e.preventDefault(); if(e.key.toLowerCase()==='p') togglePause(); if(e.key==='Escape' && !play.classList.contains('hidden')) quitGame(); if(engine&&engine.keydown) engine.keydown(e.key.toLowerCase());});
window.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false; if(engine&&engine.keyup) engine.keyup(e.key.toLowerCase());});
function diffMult(){const assist=settings.difficulty==='easy'?.78:settings.difficulty==='hard'?1.28:1; const levelBoost=selectedLevel?selectedLevel.speedMultiplier:1; return assist*levelBoost}
function startGame(){if(!selectedLevel) selectedLevel=fallbackLevels(selected)[0]; showScreen(play); $('playTitle').textContent=`${selected.emoji} ${selected.title} • L${selectedLevel.level}`; $('miniHelp').textContent=`World: ${selectedLevel.world} • Difficulty ${selectedLevel.difficultyScore}/100 • ${settings.controlMode==='mobile'?'Use floating controller.':'Use keyboard controls.'}`; $('pauseOverlay').innerHTML='<div class="box"><h3 class="pixel">PAUSED</h3><p>Press P or the Pause button to continue.</p><button id="resumeBtnInline" class="btn primary">Resume</button></div>'; $('pauseOverlay').classList.add('hidden'); setTimeout(()=>{const b=$('resumeBtnInline'); if(b)b.onclick=()=>togglePause();},0); paused=false; keys={}; virtualKeys={}; updateMobileControls(); if(engine&&engine.destroy)engine.destroy(); engine=makeEngine(selected.id); last=performance.now(); cancelAnimationFrame(raf); loop(last); beep(880,.08)}
function quitGame(){cancelAnimationFrame(raf); engine=null; virtualKeys={}; showScreen(menu); updateMobileControls(); beep(180,.08)}
function togglePause(){ if(play.classList.contains('hidden'))return; paused=!paused; $('pauseOverlay').classList.toggle('hidden',!paused); $('statusHud').textContent=paused?'PAUSED':'RUNNING'; beep(paused?260:520); if(!paused){last=performance.now();loop(last)} }
function loop(t){ if(paused||!engine)return; let dt=Math.min(.033,(t-last)/1000); last=t; engine.update(dt); engine.draw(ctx); raf=requestAnimationFrame(loop); }
function hud(score,lives,status){$('scoreHud').textContent='SCORE '+score; $('lifeHud').textContent='LIVES '+lives; $('statusHud').textContent=`L${selectedLevel?selectedLevel.level:1} ${status||'RUNNING'}`}
function press(...arr){return arr.some(k=>keys[k]||keys[k.toLowerCase()]||virtualKeys[k]||virtualKeys[k.toLowerCase()])}
function gameOver(msg){paused=true; $('pauseOverlay').classList.remove('hidden'); $('pauseOverlay').innerHTML=`<div class="box"><h3 class="pixel">${msg}</h3><p>Press START to retry or QUIT to return to menu.</p><button onclick="startGame()" class="btn primary">Start Again</button><button onclick="quitGame()" class="btn danger" style="margin-left:10px">Quit</button></div>`;}
function clear(){ctx.fillStyle='#05070d';ctx.fillRect(0,0,960,540)}
function makeEngine(id){return ({maze:mazeEngine,speed:speedEngine,platform:platformEngine,duel:duelEngine,tetris:tetrisEngine,zelda:mazeEngine,donkey:platformEngine,fzero:speedEngine,goldeneye:shooterEngine,ape:platformEngine,tekken:duelEngine,oddworld:platformEngine,doom:shooterEngine,metroid:platformEngine,wildarms:mazeEngine}[id]||platformEngine)()}

function drawHumanoid(x,y,body='#FF4D4D',skin='#ffd1b8',scale=1){
  ctx.fillStyle=skin; ctx.fillRect(x+10*scale,y,14*scale,14*scale);
  ctx.fillStyle=body; ctx.fillRect(x+6*scale,y+14*scale,22*scale,24*scale);
  ctx.fillStyle='#27344d'; ctx.fillRect(x+6*scale,y+38*scale,8*scale,12*scale); ctx.fillRect(x+20*scale,y+38*scale,8*scale,12*scale);
  ctx.fillStyle='#fff'; ctx.fillRect(x+19*scale,y+5*scale,4*scale,4*scale);
  ctx.fillStyle='#000'; ctx.fillRect(x+20*scale,y+6*scale,2*scale,2*scale);
}
function drawMarioLike(x,y){
  ctx.fillStyle='#d82222'; ctx.fillRect(x+7,y-8,22,8);
  drawHumanoid(x,y,'#FF4D4D','#ffd1b8',1);
  ctx.fillStyle='#2b5cff'; ctx.fillRect(x+8,y+20,18,18);
  ctx.fillStyle='#ffd93d'; ctx.fillRect(x+11,y+22,4,4); ctx.fillRect(x+21,y+22,4,4);
}

function mazeEngine(){ const tile=30, offX=180, offY=45; let map=['####################','#........#.........#','#.####.#.#.###.##..#','#......#...#.......#','#.##.#####.#.####..#','#.................#.#','###.###.#####.###.#.#','#...#.........#.....#','#.#.#.#######.#.##.#','#.#...............#.#','#.####.#####.####.#.#','#......#...#........#','#.######.#.######.#.#','#..................G#','####################']; let pellets=0; map=map.map(r=>r.split('')); for(let y=0;y<map.length;y++)for(let x=0;x<map[y].length;x++)if(map[y][x]==='.')pellets++; let p={x:1,y:1,dx:0,dy:0,t:0}, ghosts=[{x:18,y:13,c:'#ff5da2',t:0},{x:10,y:7,c:'#4DA8FF',t:0}],score=0,lives=3; const speed=7*diffMult(); function can(x,y){return map[y]&&map[y][x]&&map[y][x]!=='#'} return {update(dt){if(press('arrowleft','a')){p.dx=-1;p.dy=0} if(press('arrowright','d')){p.dx=1;p.dy=0} if(press('arrowup','w')){p.dx=0;p.dy=-1} if(press('arrowdown','s')){p.dx=0;p.dy=1} p.t+=dt*speed; if(p.t>1){p.t=0;let nx=p.x+p.dx,ny=p.y+p.dy;if(can(nx,ny)){p.x=nx;p.y=ny;if(map[ny][nx]==='.'){map[ny][nx]=' ';score+=10;pellets--;beep(900,.02)}}} ghosts.forEach(g=>{g.t+=dt*(3.2*diffMult()); if(g.t>1){g.t=0; let dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(d=>can(g.x+d[0],g.y+d[1])); dirs.sort((a,b)=>Math.abs(p.x-(g.x+a[0]))+Math.abs(p.y-(g.y+a[1]))-(Math.abs(p.x-(g.x+b[0]))+Math.abs(p.y-(g.y+b[1])))); let d=Math.random()<.68?dirs[0]:dirs[Math.floor(Math.random()*dirs.length)]; g.x+=d[0];g.y+=d[1];} if(g.x===p.x&&g.y===p.y){lives--;p.x=1;p.y=1;beep(120,.1); if(lives<=0)gameOver('GAME OVER')}}); if(pellets<=0)gameOver('YOU WIN') ; hud(score,lives,`DOTS ${pellets}`)},draw(){clear();ctx.fillStyle='#111a34';ctx.fillRect(offX-10,offY-10,620,470); for(let y=0;y<map.length;y++)for(let x=0;x<map[y].length;x++){let px=offX+x*tile,py=offY+y*tile;if(map[y][x]==='#'){ctx.fillStyle='#233bd3';ctx.fillRect(px,py,tile,tile);ctx.strokeStyle='#6aa8ff';ctx.strokeRect(px+4,py+4,tile-8,tile-8)}else if(map[y][x]==='.') {ctx.fillStyle='#fff';ctx.fillRect(px+13,py+13,5,5)}} ctx.fillStyle='#FFD93D';ctx.beginPath();ctx.arc(offX+p.x*tile+15,offY+p.y*tile+15,13,.25*Math.PI,1.75*Math.PI);ctx.lineTo(offX+p.x*tile+15,offY+p.y*tile+15);ctx.fill(); ghosts.forEach(g=>{ctx.fillStyle=g.c;ctx.fillRect(offX+g.x*tile+4,offY+g.y*tile+5,22,22);ctx.fillStyle='#fff';ctx.fillRect(offX+g.x*tile+8,offY+g.y*tile+10,5,5);ctx.fillRect(offX+g.x*tile+18,offY+g.y*tile+10,5,5)})}}}
function speedEngine(){let player={x:110,y:390,vy:0,on:true},obs=[],rings=[],spawn=0,score=0,lives=3,t=0; return {update(dt){t+=dt;spawn-=dt; let sp=(260+t*12)*diffMult(); if((press(' ','arrowup','w'))&&player.on){player.vy=-620;player.on=false;beep(520,.04)} player.vy+=1500*dt; player.y+=player.vy*dt; if(player.y>390){player.y=390;player.vy=0;player.on=true} if(spawn<=0){spawn=Math.max(.55,1.25-t*.015); obs.push({x:990,w:28,h:40+Math.random()*42}); rings.push({x:1040+Math.random()*170,y:240+Math.random()*100,taken:false})} obs.forEach(o=>o.x-=sp*dt); rings.forEach(r=>r.x-=sp*dt); obs=obs.filter(o=>o.x>-80); rings=rings.filter(r=>r.x>-80&&!r.taken); obs.forEach(o=>{if(player.x<o.x+o.w&&player.x+40>o.x&&player.y+50>430-o.h){lives--;o.x=-100;beep(110,.08);if(lives<=0)gameOver('CRASH!')}}); rings.forEach(r=>{let dx=player.x+20-r.x,dy=player.y+20-r.y;if(dx*dx+dy*dy<900){r.taken=true;score+=50;beep(900,.025)}}); score+=Math.floor(dt*10);hud(score,lives,`SPEED ${Math.floor(sp)}`)},draw(){clear();ctx.fillStyle='#56c7ff';ctx.fillRect(0,0,960,330);ctx.fillStyle='#1c6b2c';ctx.fillRect(0,430,960,110);ctx.fillStyle='#9b5c1b';for(let x=-60;x<980;x+=44){ctx.fillRect(x+(performance.now()/15%44),430,22,22);ctx.fillRect(x+22+(performance.now()/15%44),452,22,22)}ctx.fillStyle='#0c5cff';ctx.fillRect(player.x,player.y,42,48);ctx.fillStyle='#fff';ctx.fillRect(player.x+28,player.y+10,8,8);ctx.fillStyle='#ff3b45';obs.forEach(o=>{ctx.fillRect(o.x,430-o.h,o.w,o.h)});ctx.strokeStyle='#FFD93D';ctx.lineWidth=6;rings.forEach(r=>{ctx.beginPath();ctx.arc(r.x,r.y,15,0,Math.PI*2);ctx.stroke()})}}}
function platformEngine(){let p={x:40,y:400,vx:0,vy:0,on:false},coins=[160,280,470,690,840].map(x=>({x,y:300,t:false})),en=[{x:360,y:402,dir:1},{x:620,y:402,dir:-1}],score=0,lives=3,cam=0; const plats=[{x:0,y:460,w:1200,h:40},{x:220,y:360,w:160,h:24},{x:510,y:315,w:160,h:24},{x:760,y:370,w:140,h:24}]; return {update(dt){p.vx=(press('arrowleft','a')?-220:0)+(press('arrowright','d')?220:0); if(press(' ','arrowup','w')&&p.on){p.vy=-590;p.on=false;beep(520,.04)} p.vy+=1300*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.on=false;plats.forEach(pl=>{if(p.x+32>pl.x&&p.x<pl.x+pl.w&&p.y+44>pl.y&&p.y+44<pl.y+24+p.vy*dt+12&&p.vy>=0){p.y=pl.y-44;p.vy=0;p.on=true}}); if(p.y>560){lives--;p.x=40;p.y=400;p.vy=0;if(lives<=0)gameOver('TRY AGAIN')} en.forEach(e=>{e.x+=e.dir*90*dt;if(e.x<300||e.x>700)e.dir*=-1;if(p.x+32>e.x&&p.x<e.x+34&&p.y+44>e.y){ if(p.vy>150&&p.y+44<e.y+22){score+=100;e.x=-999;p.vy=-360;beep(700,.04)}else{lives--;p.x=40;p.y=400;beep(130,.08);if(lives<=0)gameOver('GAME OVER')}}}); coins.forEach(c=>{if(!c.t&&Math.abs(p.x-c.x)<32&&Math.abs(p.y-c.y)<46){c.t=true;score+=50;beep(900,.025)}}); if(p.x>1030)gameOver('STAGE CLEAR'); cam=Math.max(0,Math.min(280,p.x-360));hud(score,lives,`X ${Math.floor(p.x)}`)},draw(){clear();ctx.save();ctx.translate(-cam,0);ctx.fillStyle='#73d7ff';ctx.fillRect(cam,0,960,540);ctx.fillStyle='#4CAF50';plats.forEach(pl=>ctx.fillRect(pl.x,pl.y,pl.w,pl.h));ctx.fillStyle='#b8662c';for(let x=0;x<1200;x+=32)ctx.fillRect(x,460,30,30);ctx.fillStyle='#FFD93D';coins.forEach(c=>{if(!c.t){ctx.beginPath();ctx.arc(c.x,c.y,13,0,Math.PI*2);ctx.fill()}});ctx.fillStyle='#8b4513';en.forEach(e=>{if(e.x>0)ctx.fillRect(e.x,e.y,34,34)});if(selected&&selected.id==='platform') drawMarioLike(p.x,p.y); else drawHumanoid(p.x,p.y,selected?selected.accent:'#FF4D4D');ctx.fillStyle='#fff';ctx.fillRect(1080,330,8,130);ctx.fillStyle='#FF4D4D';ctx.fillRect(1088,330,55,36);ctx.restore()}}}
function duelEngine(){let p={x:250,hp:100,block:false,cd:0},c={x:660,hp:100,cd:0},score=0;function hit(attacker){let dist=Math.abs(p.x-c.x); if(dist<95){ if(attacker==='p'){c.hp-=press('enter','k')?14:9;score+=20;beep(630,.035)} else if(!p.block){p.hp-=8;beep(120,.05)} }} return {update(dt){p.cd-=dt;c.cd-=dt;p.block=press('arrowdown','s'); if(press('arrowleft','a'))p.x-=220*dt;if(press('arrowright','d'))p.x+=220*dt;p.x=Math.max(60,Math.min(500,p.x)); if((press(' ')||press('enter','k'))&&p.cd<=0){p.cd=.38;hit('p')} let dist=p.x-c.x; if(Math.abs(dist)>82)c.x+=Math.sign(dist)*150*dt; else if(c.cd<=0){c.cd=.7/diffMult();hit('c')} if(c.hp<=0)gameOver('K.O. YOU WIN'); if(p.hp<=0)gameOver('K.O. DEFEAT'); hud(score,Math.ceil(p.hp/34),`HP ${Math.max(0,Math.floor(p.hp))} / CPU ${Math.max(0,Math.floor(c.hp))}`)},draw(){clear();ctx.fillStyle='#11182a';ctx.fillRect(0,0,960,540);ctx.fillStyle='#26324f';ctx.fillRect(0,410,960,130);ctx.fillStyle='#FFD93D';ctx.fillRect(70,45,p.hp*3,24);ctx.fillStyle='#FF6B6B';ctx.fillRect(590,45,c.hp*3,24);ctx.fillStyle='#5DA9FF';ctx.fillRect(p.x,320,52,92);ctx.fillStyle='#ffd1b8';ctx.fillRect(p.x+10,285,32,32);ctx.fillStyle=p.block?'#00D1B2':'#fff'; if(p.cd>.23)ctx.fillRect(p.x+52,340,52,15);ctx.fillStyle='#FF6B6B';ctx.fillRect(c.x,320,52,92);ctx.fillStyle='#ffd1b8';ctx.fillRect(c.x+10,285,32,32);ctx.fillStyle='#fff'; if(c.cd>.5)ctx.fillRect(c.x-52,340,52,15);ctx.fillStyle='#fff';ctx.font='24px Courier New';ctx.fillText('PLAYER',70,35);ctx.fillText('CPU',590,35)}}}
function shooterEngine(){
  let aim={x:480,y:270}, targets=[], spawn=0, score=0, lives=5, time=60;
  function addTarget(){
    targets.push({x:80+Math.random()*800,y:80+Math.random()*360,r:18+Math.random()*18,life:1.6/diffMult(),bad:Math.random()>.18});
  }
  function fire(){
    let hit=false;
    for(let i=targets.length-1;i>=0;i--){
      const t=targets[i], dx=aim.x-t.x, dy=aim.y-t.y;
      if(dx*dx+dy*dy<t.r*t.r){
        hit=true;
        if(t.bad){ score+=100; beep(820,.035); }
        else { lives--; beep(120,.06); }
        targets.splice(i,1); break;
      }
    }
    if(!hit){ lives--; beep(90,.04); }
    if(lives<=0) gameOver('MISSION FAILED');
  }
  return {
    keydown(k){ if(k===' '||k==='enter') fire(); },
    update(dt){
      time-=dt;
      const sp=420*diffMult();
      if(press('arrowleft','a')) aim.x-=sp*dt; if(press('arrowright','d')) aim.x+=sp*dt;
      if(press('arrowup','w')) aim.y-=sp*dt; if(press('arrowdown','s')) aim.y+=sp*dt;
      aim.x=Math.max(25,Math.min(935,aim.x)); aim.y=Math.max(25,Math.min(515,aim.y));
      spawn-=dt; if(spawn<=0){ spawn=.55/diffMult(); addTarget(); }
      targets.forEach(t=>t.life-=dt);
      for(let i=targets.length-1;i>=0;i--){ if(targets[i].life<=0){ if(targets[i].bad) lives--; targets.splice(i,1); beep(140,.025); } }
      if(lives<=0) gameOver('MISSION FAILED');
      if(time<=0) gameOver('MISSION CLEAR');
      hud(score,lives,`TIME ${Math.max(0,Math.ceil(time))}`);
    },
    draw(){
      clear();
      ctx.fillStyle='#111'; ctx.fillRect(0,0,960,540);
      ctx.fillStyle='#1b2334'; for(let x=0;x<960;x+=80) ctx.fillRect(x,390,42,150);
      ctx.fillStyle='#27344d'; ctx.fillRect(0,430,960,110);
      targets.forEach(t=>{
        ctx.fillStyle=t.bad?selected.accent:'#76D7C4';
        ctx.fillRect(t.x-t.r,t.y-t.r,t.r*2,t.r*2);
        ctx.fillStyle='#000'; ctx.fillRect(t.x-5,t.y-5,10,10);
      });
      ctx.strokeStyle='#fff'; ctx.lineWidth=3;
      ctx.beginPath(); ctx.arc(aim.x,aim.y,24,0,Math.PI*2); ctx.moveTo(aim.x-36,aim.y); ctx.lineTo(aim.x+36,aim.y); ctx.moveTo(aim.x,aim.y-36); ctx.lineTo(aim.x,aim.y+36); ctx.stroke();
      ctx.fillStyle='#B8C1D1'; ctx.font='22px Courier New'; ctx.fillText('SPACE / ENTER = FIRE',24,36);
    }
  };
}

function tetrisEngine(){
  const W=10,H=20,S=24,OX=360,OY=25;
  let board=Array.from({length:H},()=>Array(W).fill(0));
  let score=0,lives=1,drop=0;
  const colors=['#000','#00D1B2','#4DA8FF','#A66CFF','#FFD93D','#FF6B6B','#4CAF50','#FF4D4D'];
  const shapes=[
    [[1,1,1,1]], [[2,0,0],[2,2,2]], [[0,0,3],[3,3,3]], [[4,4],[4,4]],
    [[0,5,5],[5,5,0]], [[0,6,0],[6,6,6]], [[7,7,0],[0,7,7]]
  ];
  let piece;
  function spawn(){
    const i=Math.floor(Math.random()*shapes.length);
    piece={x:3,y:0,m:shapes[i].map(r=>r.slice()),c:i+1};
    if(collide(piece.x,piece.y,piece.m)) gameOver('TOP OUT');
  }
  function collide(x,y,m){
    for(let r=0;r<m.length;r++){
      for(let c=0;c<m[r].length;c++){
        if(m[r][c]){
          if(x+c<0 || x+c>=W || y+r>=H) return true;
          if(y+r>=0 && board[y+r][x+c]) return true;
        }
      }
    }
    return false;
  }
  function merge(){
    piece.m.forEach((row,yy)=>row.forEach((v,xx)=>{
      if(v && board[piece.y+yy]) board[piece.y+yy][piece.x+xx]=piece.c;
    }));
    let lines=0;
    board=board.filter(row=>{
      if(row.every(Boolean)){ lines++; return false; }
      return true;
    });
    while(board.length<H) board.unshift(Array(W).fill(0));
    if(lines){ score += [0,100,300,500,800][lines]; beep(700,.05); }
    spawn();
  }
  function rotate(){
    const rotated=piece.m[0].map((_,i)=>piece.m.map(row=>row[i]).reverse());
    if(!collide(piece.x,piece.y,rotated)) piece.m=rotated;
  }
  spawn();
  return {
    keydown(k){
      if(k==='arrowleft'||k==='a') { if(!collide(piece.x-1,piece.y,piece.m)) piece.x--; }
      if(k==='arrowright'||k==='d') { if(!collide(piece.x+1,piece.y,piece.m)) piece.x++; }
      if(k==='arrowup'||k==='w'||k===' ') rotate();
      if(k==='enter') { while(!collide(piece.x,piece.y+1,piece.m)) piece.y++; merge(); }
    },
    update(dt){
      drop += dt*(settings.difficulty==='hard'?1.7:settings.difficulty==='easy'?.7:1);
      if(press('arrowdown','s')) drop += dt*8;
      if(drop>.55){
        drop=0;
        if(!collide(piece.x,piece.y+1,piece.m)) piece.y++;
        else merge();
      }
      hud(score,lives,'LINES MODE');
    },
    draw(){
      clear();
      ctx.fillStyle='#060915'; ctx.fillRect(OX-18,OY-18,W*S+36,H*S+36);
      ctx.strokeStyle='#A66CFF'; ctx.lineWidth=4; ctx.strokeRect(OX-18,OY-18,W*S+36,H*S+36);
      for(let y=0;y<H;y++) for(let x=0;x<W;x++){
        ctx.strokeStyle='#172143'; ctx.strokeRect(OX+x*S,OY+y*S,S,S);
        if(board[y][x]){ ctx.fillStyle=colors[board[y][x]]; ctx.fillRect(OX+x*S+1,OY+y*S+1,S-2,S-2); }
      }
      piece.m.forEach((row,yy)=>row.forEach((v,xx)=>{
        if(v){ ctx.fillStyle=colors[piece.c]; ctx.fillRect(OX+(piece.x+xx)*S+1,OY+(piece.y+yy)*S+1,S-2,S-2); }
      }));
      ctx.fillStyle='#B8C1D1'; ctx.font='22px Courier New';
      ctx.fillText('FALLING BLOCKS',610,90);
      ctx.fillText('ENTER = HARD DROP',610,130);
      ctx.fillText('SPACE = ROTATE',610,160);
    }
  };
}
