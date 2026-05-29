const fallbackGames=[
 {id:'maze',title:'Pac-Man',year:'1980',emoji:'🟡',accent:'#FFD93D',tag:'Maze escape madness',desc:'Ghosts get smarter fast — one wrong turn and it’s over.',thumb:'mazeThumb',brief:'A maze-chase arcade challenge inspired by classic dot-eating action. Collect every pellet while avoiding ghosts that cut off your route.',controls:[['Arrow Keys / WASD','Move through the maze'],['P','Pause'],['ESC','Quit to menu'],['Enter','Restart after game over']],objectives:['Collect dots for points.','Avoid ghosts.','Clear the maze to win the round.']},
 {id:'speed',title:'Sonic the Hedgehog 2',year:'1992',emoji:'🔵',accent:'#4DA8FF',tag:'Pure speed platforming',desc:'Fast, fluid, and packed with momentum-driven action.',thumb:'sonicThumb',brief:'A fast side-scrolling runner inspired by speed platformers. Keep momentum, jump obstacles, and grab rings.',controls:[['Space / ↑ / W','Jump'],['↓ / S','Slide / fast fall'],['P','Pause'],['ESC','Quit']],objectives:['Collect rings.','Jump over spikes and blocks.','Survive as the speed increases.']},
 {id:'platform',title:'Super Mario World',year:'1990',emoji:'🍄',accent:'#FF4D4D',tag:'Creative classic platforming',desc:'Tight controls and unforgettable level design.',thumb:'marioThumb',brief:'A compact platforming stage with coins, enemies, and chunky blocks. Precision jumping is the whole game.',controls:[['← / → or A / D','Move'],['Space / ↑ / W','Jump'],['↓ / S','Crouch / drop faster'],['ESC','Quit']],objectives:['Collect coins.','Land on enemies or avoid them.','Reach the flag at the far right.']},
 {id:'duel',title:'Street Fighter II',year:'1991',emoji:'🥊',accent:'#FF6B6B',tag:'Arcade 1v1 showdown',desc:'Pick a fighter and test your reflexes and strategy.',thumb:'fightThumb',brief:'A one-screen arcade duel inspired by old-school fighting games. Manage spacing, strike, and block the CPU.',controls:[['← / → or A / D','Move'],['Space','Punch'],['Enter / K','Kick'],['↓ / S','Block']],objectives:['Reduce CPU health to zero.','Block incoming hits.','Do not let your health hit zero.']},
 {id:'tetris',title:'Tetris',year:'1985',emoji:'🧱',accent:'#A66CFF',tag:'Simple. Hypnotic. Brutal.',desc:'Easy to learn, intense to master at higher speeds.',thumb:'tetrisThumb',brief:'A falling-block puzzle challenge. Rotate, place, and clear rows before the stack reaches the top.',controls:[['← / → or A / D','Move piece'],['↑ / W / Space','Rotate'],['↓ / S','Soft drop'],['Enter','Hard drop']],objectives:['Fill rows to clear lines.','Avoid stacking to the top.','Score rises with multi-line clears.']}
]
let games=[...fallbackGames];
let selected=null, selectedLevel=null, currentLevels=[], levelEnded=false, settings={difficulty:'normal',sound:true,crt:true,visual:'glow',controlMode:'desktop'};
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
  return Array.from({length:100},(_,i)=>{const level=i+1, baseWorld=worlds[i%worlds.length], world=`${baseWorld} Sector ${Math.floor(i/worlds.length)+1}`, difficultyScore=Math.min(100,8+Math.round(level*.92)); return {gameId:game.id,level,name:`Level ${level}: ${world}`,world,zone:Math.floor(i/20)+1,difficulty:level<=20?'Rookie':level<=40?'Normal':level<=60?'Hard':level<=80?'Expert':'Nightmare',difficultyScore,speedMultiplier:Number((1+level*.012).toFixed(2)),enemyMultiplier:Number((1+level*.01).toFixed(2)),targetScore:500+level*150,palette:['neon','forest','ice','lava','space'][i%5],objective:`Clear ${world} with difficulty ${difficultyScore}/100.`};});
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
function enemyMult(){return selectedLevel?selectedLevel.enemyMultiplier:1}
function startGame(){if(!selectedLevel) selectedLevel=fallbackLevels(selected)[0]; showScreen(play); $('playTitle').textContent=`${selected.emoji} ${selected.title} • L${selectedLevel.level}`; $('miniHelp').textContent=`World: ${selectedLevel.world} • Difficulty ${selectedLevel.difficultyScore}/100 • ${settings.controlMode==='mobile'?'Use floating controller.':'Use keyboard controls.'}`; $('pauseOverlay').innerHTML='<div class="box"><h3 class="pixel">PAUSED</h3><p>Press P or the Pause button to continue.</p><button id="resumeBtnInline" class="btn primary">Resume</button></div>'; $('pauseOverlay').classList.add('hidden'); setTimeout(()=>{const b=$('resumeBtnInline'); if(b)b.onclick=()=>togglePause();},0); paused=false; levelEnded=false; keys={}; virtualKeys={}; updateMobileControls(); if(engine&&engine.destroy)engine.destroy(); engine=makeEngine(selected.id); last=performance.now(); cancelAnimationFrame(raf); loop(last); beep(880,.08)}
function quitGame(){cancelAnimationFrame(raf); engine=null; virtualKeys={}; showScreen(menu); updateMobileControls(); beep(180,.08)}
function togglePause(){ if(play.classList.contains('hidden'))return; paused=!paused; $('pauseOverlay').classList.toggle('hidden',!paused); $('statusHud').textContent=paused?'PAUSED':'RUNNING'; beep(paused?260:520); if(!paused){last=performance.now();loop(last)} }
function loop(t){ if(paused||!engine)return; let dt=Math.min(.033,(t-last)/1000); last=t; engine.update(dt); engine.draw(ctx); drawLevelBanner(); raf=requestAnimationFrame(loop); }
function hud(score,lives,status){
  $('scoreHud').textContent='SCORE '+score;
  $('lifeHud').textContent='LIVES '+lives;
  $('statusHud').textContent=`L${selectedLevel?selectedLevel.level:1} ${status||'RUNNING'}`;
  if(selectedLevel && !levelEnded && score >= selectedLevel.targetScore){
    gameOver('LEVEL CLEAR');
  }
}
function press(...arr){return arr.some(k=>keys[k]||keys[k.toLowerCase()]||virtualKeys[k]||virtualKeys[k.toLowerCase()])}
function isWinMessage(msg){return /WIN|CLEAR|COMPLETE|STAGE CLEAR|MISSION CLEAR|LEVEL CLEAR|K\.O\. YOU WIN/i.test(msg)}
function nextLevel(){
  if(!selectedLevel) selectedLevel=fallbackLevels(selected)[0];
  if(selectedLevel.level>=100){ quitGame(); return; }
  const nextNo=selectedLevel.level+1;
  selectedLevel=currentLevels.find(l=>l.level===nextNo) || fallbackLevels(selected)[nextNo-1];
  const sel=$('levelSelect'); if(sel) sel.value=String(nextNo);
  updateLevelInfo();
  startGame();
}
function gameOver(msg){
  if(levelEnded) return;
  levelEnded=true;
  paused=true;
  const won=isWinMessage(msg);
  const levelNo=selectedLevel?selectedLevel.level:1;
  const campaignDone=won && levelNo>=100;
  $('pauseOverlay').classList.remove('hidden');
  $('pauseOverlay').innerHTML=`<div class="box"><h3 class="pixel">${campaignDone?'CAMPAIGN COMPLETE':msg}</h3>
    <p>${won ? (campaignDone?'You cleared all 100 levels. Legendary run complete!':`Level ${levelNo} finished. Continue to Level ${levelNo+1}?`) : `Level ${levelNo} failed. Try again or quit.`}</p>
    <div class="promptActions">
      ${won && !campaignDone ? '<button onclick="nextLevel()" class="btn primary">Next Level</button>' : ''}
      <button onclick="startGame()" class="btn cyan">Retry Level</button>
      <button onclick="quitGame()" class="btn danger">Quit</button>
    </div>
  </div>`;
}
function levelTheme(){
  const palette=selectedLevel?.palette || 'neon';
  const themes={
    neon:{bg:'#05070d',sky:'#11182a',ground:'#26324f',panel:'#111a34',wall:'#233bd3',accent:'#00D1B2',hazard:'#ff3b45',brick:'#9b5c1b',text:'#B8C1D1'},
    forest:{bg:'#06150c',sky:'#1f6f48',ground:'#174a25',panel:'#0d2f1b',wall:'#2f8f49',accent:'#FFD93D',hazard:'#ff6b6b',brick:'#7b4b22',text:'#d8ffd8'},
    ice:{bg:'#07131e',sky:'#88d8ff',ground:'#b8f3ff',panel:'#10283b',wall:'#4DA8FF',accent:'#ffffff',hazard:'#7ddcff',brick:'#62a6d8',text:'#e8fbff'},
    lava:{bg:'#1b0705',sky:'#3a1010',ground:'#5d1b12',panel:'#2a0b0b',wall:'#D6422B',accent:'#FFD93D',hazard:'#ff8a00',brick:'#8b2f16',text:'#ffe2c2'},
    space:{bg:'#02030d',sky:'#09091f',ground:'#24124d',panel:'#101022',wall:'#A66CFF',accent:'#00D1B2',hazard:'#FF4D4D',brick:'#44306d',text:'#e6d9ff'}
  };
  return themes[palette]||themes.neon;
}
function clear(){const t=levelTheme();ctx.fillStyle=t.bg;ctx.fillRect(0,0,960,540)}
function drawLevelBanner(){
  if(!selectedLevel) return;
  const t=levelTheme();
  ctx.save();
  ctx.globalAlpha=.92;
  ctx.fillStyle='rgba(0,0,0,.58)'; ctx.fillRect(12,492,936,36);
  ctx.strokeStyle=t.accent; ctx.lineWidth=2; ctx.strokeRect(12,492,936,36);
  ctx.fillStyle=t.text; ctx.font='18px Courier New';
  ctx.fillText(`WORLD: ${selectedLevel.world}  |  LEVEL ${selectedLevel.level}/100  |  DIFFICULTY ${selectedLevel.difficultyScore}/100`,24,516);
  ctx.restore();
}
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

function mazeEngine(){ const tile=30, offX=180, offY=45; let map=['####################','#........#.........#','#.####.#.#.###.##..#','#......#...#.......#','#.##.#####.#.####..#','#.................#.#','###.###.#####.###.#.#','#...#.........#.....#','#.#.#.#######.#.##.#','#.#...............#.#','#.####.#####.####.#.#','#......#...#........#','#.######.#.######.#.#','#..................G#','####################']; let pellets=0; map=map.map(r=>r.split('')); for(let y=0;y<map.length;y++)for(let x=0;x<map[y].length;x++)if(map[y][x]==='.')pellets++; let p={x:1,y:1,dx:0,dy:0,t:0}, ghosts=[{x:18,y:13,c:'#ff5da2',t:0},{x:10,y:7,c:'#4DA8FF',t:0}],score=0,lives=3; const speed=7*diffMult(); function can(x,y){return map[y]&&map[y][x]&&map[y][x]!=='#'} return {update(dt){if(press('arrowleft','a')){p.dx=-1;p.dy=0} if(press('arrowright','d')){p.dx=1;p.dy=0} if(press('arrowup','w')){p.dx=0;p.dy=-1} if(press('arrowdown','s')){p.dx=0;p.dy=1} p.t+=dt*speed; if(p.t>1){p.t=0;let nx=p.x+p.dx,ny=p.y+p.dy;if(can(nx,ny)){p.x=nx;p.y=ny;if(map[ny][nx]==='.'){map[ny][nx]=' ';score+=10;pellets--;beep(900,.02)}}} ghosts.forEach(g=>{g.t+=dt*(3.2*diffMult()); if(g.t>1){g.t=0; let dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(d=>can(g.x+d[0],g.y+d[1])); dirs.sort((a,b)=>Math.abs(p.x-(g.x+a[0]))+Math.abs(p.y-(g.y+a[1]))-(Math.abs(p.x-(g.x+b[0]))+Math.abs(p.y-(g.y+b[1])))); let d=Math.random()<.68?dirs[0]:dirs[Math.floor(Math.random()*dirs.length)]; g.x+=d[0];g.y+=d[1];} if(g.x===p.x&&g.y===p.y){lives--;p.x=1;p.y=1;beep(120,.1); if(lives<=0)gameOver('GAME OVER')}}); if(pellets<=0)gameOver('YOU WIN') ; hud(score,lives,`DOTS ${pellets}`)},draw(){clear();const t=levelTheme();ctx.fillStyle=t.panel;ctx.fillRect(offX-10,offY-10,620,470); for(let y=0;y<map.length;y++)for(let x=0;x<map[y].length;x++){let px=offX+x*tile,py=offY+y*tile;if(map[y][x]==='#'){ctx.fillStyle=t.wall;ctx.fillRect(px,py,tile,tile);ctx.strokeStyle=t.accent;ctx.strokeRect(px+4,py+4,tile-8,tile-8)}else if(map[y][x]==='.') {ctx.fillStyle='#fff';ctx.fillRect(px+13,py+13,5,5)}} ctx.fillStyle='#FFD93D';ctx.beginPath();ctx.arc(offX+p.x*tile+15,offY+p.y*tile+15,13,.25*Math.PI,1.75*Math.PI);ctx.lineTo(offX+p.x*tile+15,offY+p.y*tile+15);ctx.fill(); ghosts.forEach(g=>{ctx.fillStyle=g.c;ctx.fillRect(offX+g.x*tile+4,offY+g.y*tile+5,22,22);ctx.fillStyle='#fff';ctx.fillRect(offX+g.x*tile+8,offY+g.y*tile+10,5,5);ctx.fillRect(offX+g.x*tile+18,offY+g.y*tile+10,5,5)})}}}
function speedEngine(){let player={x:110,y:390,vy:0,on:true},obs=[],rings=[],spawn=0,score=0,lives=3,t=0; return {update(dt){t+=dt;spawn-=dt; let sp=(260+t*12)*diffMult(); if((press(' ','arrowup','w'))&&player.on){player.vy=-620;player.on=false;beep(520,.04)} player.vy+=1500*dt; player.y+=player.vy*dt; if(player.y>390){player.y=390;player.vy=0;player.on=true} if(spawn<=0){spawn=Math.max(.35,(1.25-t*.015)/diffMult()); obs.push({x:990,w:28,h:40+Math.random()*42}); rings.push({x:1040+Math.random()*170,y:240+Math.random()*100,taken:false})} obs.forEach(o=>o.x-=sp*dt); rings.forEach(r=>r.x-=sp*dt); obs=obs.filter(o=>o.x>-80); rings=rings.filter(r=>r.x>-80&&!r.taken); obs.forEach(o=>{if(player.x<o.x+o.w&&player.x+40>o.x&&player.y+50>430-o.h){lives--;o.x=-100;beep(110,.08);if(lives<=0)gameOver('CRASH!')}}); rings.forEach(r=>{let dx=player.x+20-r.x,dy=player.y+20-r.y;if(dx*dx+dy*dy<900){r.taken=true;score+=50;beep(900,.025)}}); score+=Math.floor(dt*10);hud(score,lives,`SPEED ${Math.floor(sp)}`)},draw(){clear();const t=levelTheme();ctx.fillStyle=t.sky;ctx.fillRect(0,0,960,330);ctx.fillStyle=t.ground;ctx.fillRect(0,430,960,110);ctx.fillStyle=t.brick;for(let x=-60;x<980;x+=44){ctx.fillRect(x+(performance.now()/15%44),430,22,22);ctx.fillRect(x+22+(performance.now()/15%44),452,22,22)}ctx.fillStyle='#0c5cff';ctx.fillRect(player.x,player.y,42,48);ctx.fillStyle='#fff';ctx.fillRect(player.x+28,player.y+10,8,8);ctx.fillStyle=t.hazard;obs.forEach(o=>{ctx.fillRect(o.x,430-o.h,o.w,o.h)});ctx.strokeStyle='#FFD93D';ctx.lineWidth=6;rings.forEach(r=>{ctx.beginPath();ctx.arc(r.x,r.y,15,0,Math.PI*2);ctx.stroke()})}}}
function platformEngine(){let p={x:40,y:400,vx:0,vy:0,on:false},coins=[160,280,470,690,840].map(x=>({x,y:300,t:false})),en=[{x:360,y:402,dir:1},{x:620,y:402,dir:-1}],score=0,lives=3,cam=0; const plats=[{x:0,y:460,w:1200,h:40},{x:220,y:360,w:160,h:24},{x:510,y:315,w:160,h:24},{x:760,y:370,w:140,h:24}]; return {update(dt){p.vx=(press('arrowleft','a')?-220:0)+(press('arrowright','d')?220:0); if(press(' ','arrowup','w')&&p.on){p.vy=-590;p.on=false;beep(520,.04)} p.vy+=1300*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.on=false;plats.forEach(pl=>{if(p.x+32>pl.x&&p.x<pl.x+pl.w&&p.y+44>pl.y&&p.y+44<pl.y+24+p.vy*dt+12&&p.vy>=0){p.y=pl.y-44;p.vy=0;p.on=true}}); if(p.y>560){lives--;p.x=40;p.y=400;p.vy=0;if(lives<=0)gameOver('TRY AGAIN')} en.forEach(e=>{e.x+=e.dir*90*enemyMult()*dt;if(e.x<300||e.x>700)e.dir*=-1;if(p.x+32>e.x&&p.x<e.x+34&&p.y+44>e.y){ if(p.vy>150&&p.y+44<e.y+22){score+=100;e.x=-999;p.vy=-360;beep(700,.04)}else{lives--;p.x=40;p.y=400;beep(130,.08);if(lives<=0)gameOver('GAME OVER')}}}); coins.forEach(c=>{if(!c.t&&Math.abs(p.x-c.x)<32&&Math.abs(p.y-c.y)<46){c.t=true;score+=50;beep(900,.025)}}); if(p.x>1030)gameOver('STAGE CLEAR'); cam=Math.max(0,Math.min(280,p.x-360));hud(score,lives,`X ${Math.floor(p.x)}`)},draw(){clear();const t=levelTheme();ctx.save();ctx.translate(-cam,0);ctx.fillStyle=t.sky;ctx.fillRect(cam,0,960,540);ctx.fillStyle=t.ground;plats.forEach(pl=>ctx.fillRect(pl.x,pl.y,pl.w,pl.h));ctx.fillStyle=t.brick;for(let x=0;x<1200;x+=32)ctx.fillRect(x,460,30,30);ctx.fillStyle='#FFD93D';coins.forEach(c=>{if(!c.t){ctx.beginPath();ctx.arc(c.x,c.y,13,0,Math.PI*2);ctx.fill()}});ctx.fillStyle='#8b4513';en.forEach(e=>{if(e.x>0)ctx.fillRect(e.x,e.y,34,34)});if(selected&&selected.id==='platform') drawMarioLike(p.x,p.y); else drawHumanoid(p.x,p.y,t.accent);ctx.fillStyle='#fff';ctx.fillRect(1080,330,8,130);ctx.fillStyle='#FF4D4D';ctx.fillRect(1088,330,55,36);ctx.restore()}}}
function duelEngine(){let p={x:250,hp:100,block:false,cd:0},c={x:660,hp:100,cd:0},score=0;function hit(attacker){let dist=Math.abs(p.x-c.x); if(dist<95){ if(attacker==='p'){c.hp-=press('enter','k')?14:9;score+=20;beep(630,.035)} else if(!p.block){p.hp-=8;beep(120,.05)} }} return {update(dt){p.cd-=dt;c.cd-=dt;p.block=press('arrowdown','s'); if(press('arrowleft','a'))p.x-=220*dt;if(press('arrowright','d'))p.x+=220*dt;p.x=Math.max(60,Math.min(500,p.x)); if((press(' ')||press('enter','k'))&&p.cd<=0){p.cd=.38;hit('p')} let dist=p.x-c.x; if(Math.abs(dist)>82)c.x+=Math.sign(dist)*150*enemyMult()*dt; else if(c.cd<=0){c.cd=.7/diffMult();hit('c')} if(c.hp<=0)gameOver('K.O. YOU WIN'); if(p.hp<=0)gameOver('K.O. DEFEAT'); hud(score,Math.ceil(p.hp/34),`HP ${Math.max(0,Math.floor(p.hp))} / CPU ${Math.max(0,Math.floor(c.hp))}`)},draw(){clear();const t=levelTheme();ctx.fillStyle=t.sky;ctx.fillRect(0,0,960,540);ctx.fillStyle=t.ground;ctx.fillRect(0,410,960,130);ctx.fillStyle='#FFD93D';ctx.fillRect(70,45,p.hp*3,24);ctx.fillStyle='#FF6B6B';ctx.fillRect(590,45,c.hp*3,24);ctx.fillStyle='#5DA9FF';ctx.fillRect(p.x,320,52,92);ctx.fillStyle='#ffd1b8';ctx.fillRect(p.x+10,285,32,32);ctx.fillStyle=p.block?'#00D1B2':'#fff'; if(p.cd>.23)ctx.fillRect(p.x+52,340,52,15);ctx.fillStyle='#FF6B6B';ctx.fillRect(c.x,320,52,92);ctx.fillStyle='#ffd1b8';ctx.fillRect(c.x+10,285,32,32);ctx.fillStyle='#fff'; if(c.cd>.5)ctx.fillRect(c.x-52,340,52,15);ctx.fillStyle='#fff';ctx.font='24px Courier New';ctx.fillText('PLAYER',70,35);ctx.fillText('CPU',590,35)}}}
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
      const t=levelTheme();
      ctx.fillStyle=t.sky; ctx.fillRect(0,0,960,540);
      ctx.fillStyle=t.panel; for(let x=0;x<960;x+=80) ctx.fillRect(x,390,42,150);
      ctx.fillStyle=t.ground; ctx.fillRect(0,430,960,110);
      targets.forEach(t=>{
        ctx.fillStyle=t.bad?selected.accent:'#76D7C4';
        ctx.fillRect(t.x-t.r,t.y-t.r,t.r*2,t.r*2);
        ctx.fillStyle='#000'; ctx.fillRect(t.x-5,t.y-5,10,10);
      });
      ctx.strokeStyle='#fff'; ctx.lineWidth=3;
      ctx.beginPath(); ctx.arc(aim.x,aim.y,24,0,Math.PI*2); ctx.moveTo(aim.x-36,aim.y); ctx.lineTo(aim.x+36,aim.y); ctx.moveTo(aim.x,aim.y-36); ctx.lineTo(aim.x,aim.y+36); ctx.stroke();
      ctx.fillStyle=t.text; ctx.font='22px Courier New'; ctx.fillText('SPACE / ENTER = FIRE',24,36);
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
      const t=levelTheme();
      ctx.fillStyle=t.panel; ctx.fillRect(OX-18,OY-18,W*S+36,H*S+36);
      ctx.strokeStyle=t.accent; ctx.lineWidth=4; ctx.strokeRect(OX-18,OY-18,W*S+36,H*S+36);
      for(let y=0;y<H;y++) for(let x=0;x<W;x++){
        ctx.strokeStyle=t.wall; ctx.strokeRect(OX+x*S,OY+y*S,S,S);
        if(board[y][x]){ ctx.fillStyle=colors[board[y][x]]; ctx.fillRect(OX+x*S+1,OY+y*S+1,S-2,S-2); }
      }
      piece.m.forEach((row,yy)=>row.forEach((v,xx)=>{
        if(v){ ctx.fillStyle=colors[piece.c]; ctx.fillRect(OX+(piece.x+xx)*S+1,OY+(piece.y+yy)*S+1,S-2,S-2); }
      }));
      ctx.fillStyle=t.text; ctx.font='22px Courier New';
      ctx.fillText('FALLING BLOCKS',610,90);
      ctx.fillText('ENTER = HARD DROP',610,130);
      ctx.fillText('SPACE = ROTATE',610,160);
    }
  };
}

/* ------------------------------------------------------------------
   ENHANCED PLAYABLE GAME ENGINES
   These override the earlier MVP engines. Level selection now changes
   real layouts, enemy counts, stage length, hazards, AI, speed, and
   win conditions for the 5 working games.
-------------------------------------------------------------------*/
function levelSeed(offset=0){
  const id=(selected?.id||'game').split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  return id*100000 + (selectedLevel?.level||1)*997 + offset;
}
function makeRng(seed){
  let s=seed>>>0;
  return function(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; };
}
function levelNumber(){return selectedLevel?.level||1}
function levelDifficulty(){return selectedLevel?.difficultyScore||10}
function drawWorldSky(){
  const t=levelTheme();
  clear();
  ctx.fillStyle=t.sky; ctx.fillRect(0,0,960,540);
  ctx.fillStyle='rgba(255,255,255,.08)';
  for(let i=0;i<8;i++) ctx.fillRect((i*137+levelNumber()*23)%960,40+(i%4)*42,42,6);
}

function mazeEngine(){
  const lvl=levelNumber(), rng=makeRng(levelSeed(1));
  const cols=23, rows=17, tile=28, offX=158, offY=34;
  let map=Array.from({length:rows},(_,y)=>Array.from({length:cols},(_,x)=> (x===0||y===0||x===cols-1||y===rows-1)?'#':'.'));
  // Generate a different but navigable maze per level: patterned walls with openings.
  for(let y=2;y<rows-2;y+=2){
    for(let x=2;x<cols-2;x+=2){
      map[y][x]='#';
      if(rng()<0.55+Math.min(.25,lvl/180)){
        const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
        const d=dirs[Math.floor(rng()*dirs.length)];
        const wx=x+d[0], wy=y+d[1];
        if(wx>1&&wy>1&&wx<cols-2&&wy<rows-2) map[wy][wx]='#';
      }
    }
  }
  // Open safe spawn corridors.
  for(let y=1;y<4;y++)for(let x=1;x<5;x++)map[y][x]='.';
  for(let y=rows-4;y<rows-1;y++)for(let x=cols-5;x<cols-1;x++)map[y][x]='.';
  let pellets=0; for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)if(map[y][x]==='.')pellets++;
  let p={x:1,y:1,dx:1,dy:0,t:0,inv:0};
  const ghostCount=Math.min(6,2+Math.floor(lvl/18));
  let ghosts=Array.from({length:ghostCount},(_,i)=>({x:cols-2-i%3,y:rows-2-Math.floor(i/3),c:['#ff5da2','#4DA8FF','#FF6B6B','#00D1B2','#A66CFF','#FFD93D'][i%6],t:0,panic:0}));
  let score=0,lives=3;
  const moveSpeed=6.5*diffMult();
  function can(x,y){return map[y]&&map[y][x]&&map[y][x]!=='#'}
  function resetPlayer(){p.x=1;p.y=1;p.dx=1;p.dy=0;p.inv=1.2}
  return {
    update(dt){
      if(press('arrowleft','a')){p.dx=-1;p.dy=0} if(press('arrowright','d')){p.dx=1;p.dy=0}
      if(press('arrowup','w')){p.dx=0;p.dy=-1} if(press('arrowdown','s')){p.dx=0;p.dy=1}
      p.t+=dt*moveSpeed; p.inv=Math.max(0,p.inv-dt);
      if(p.t>1){p.t=0; const nx=p.x+p.dx, ny=p.y+p.dy; if(can(nx,ny)){p.x=nx;p.y=ny;if(map[ny][nx]==='.'){map[ny][nx]=' ';score+=10+lvl;pellets--;beep(880,.015)}}}
      ghosts.forEach((g,idx)=>{
        g.t+=dt*(2.2+lvl*.035)*enemyMult();
        if(g.t>1){g.t=0; let dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(d=>can(g.x+d[0],g.y+d[1]));
          dirs.sort((a,b)=>Math.abs(p.x-(g.x+a[0]))+Math.abs(p.y-(g.y+a[1]))-(Math.abs(p.x-(g.x+b[0]))+Math.abs(p.y-(g.y+b[1]))));
          const smart=.45+Math.min(.45,lvl/130); const d=rng()<smart?dirs[0]:dirs[Math.floor(rng()*dirs.length)]; if(d){g.x+=d[0];g.y+=d[1];}
        }
        if(g.x===p.x&&g.y===p.y&&p.inv<=0){lives--;beep(100,.08); if(lives<=0)gameOver('GAME OVER'); else resetPlayer();}
      });
      if(pellets<=0)gameOver('LEVEL CLEAR');
      hud(score,lives,`DOTS ${pellets}`);
    },
    draw(){
      const t=levelTheme(); clear(); ctx.fillStyle=t.panel;ctx.fillRect(offX-12,offY-12,cols*tile+24,rows*tile+24);
      for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const px=offX+x*tile,py=offY+y*tile;if(map[y][x]==='#'){ctx.fillStyle=t.wall;ctx.fillRect(px,py,tile,tile);ctx.strokeStyle=t.accent;ctx.strokeRect(px+4,py+4,tile-8,tile-8)}else if(map[y][x]==='.'){ctx.fillStyle='#fff';ctx.fillRect(px+12,py+12,5,5)}}
      ctx.fillStyle='#FFD93D';ctx.beginPath();ctx.arc(offX+p.x*tile+14,offY+p.y*tile+14,12,.18*Math.PI,1.82*Math.PI);ctx.lineTo(offX+p.x*tile+14,offY+p.y*tile+14);ctx.fill();
      ghosts.forEach(g=>{ctx.fillStyle=g.c;ctx.fillRect(offX+g.x*tile+4,offY+g.y*tile+5,20,22);ctx.fillStyle='#fff';ctx.fillRect(offX+g.x*tile+8,offY+g.y*tile+10,5,5);ctx.fillRect(offX+g.x*tile+17,offY+g.y*tile+10,5,5)});
    }
  };
}

function speedEngine(){
  const lvl=levelNumber(), rng=makeRng(levelSeed(2));
  let player={x:110,y:390,vy:0,on:true}, obstacles=[], rings=[], ramps=[], spawn=0, score=0,lives=3,t=0,dist=0;
  const finish=2600+lvl*120;
  return {
    update(dt){
      t+=dt; const sp=(260+lvl*7+t*8)*diffMult(); dist+=sp*dt;
      if((press(' ','arrowup','w'))&&player.on){player.vy=-620;player.on=false;beep(520,.04)}
      if(press('arrowdown','s')&&!player.on) player.vy+=900*dt;
      player.vy+=1500*dt; player.y+=player.vy*dt; if(player.y>390){player.y=390;player.vy=0;player.on=true}
      spawn-=dt; if(spawn<=0){spawn=Math.max(.35,(1.15-rng()*.25)/diffMult()); const type=rng(); if(type<.55) obstacles.push({x:990,w:28+rng()*18,h:38+rng()*55}); else if(type<.78) ramps.push({x:990,w:70,h:34}); else rings.push({x:1000,y:235+rng()*115,taken:false});}
      obstacles.forEach(o=>o.x-=sp*dt); rings.forEach(r=>r.x-=sp*dt); ramps.forEach(r=>r.x-=sp*dt);
      obstacles=obstacles.filter(o=>o.x>-80); rings=rings.filter(r=>r.x>-80&&!r.taken); ramps=ramps.filter(r=>r.x>-100);
      ramps.forEach(r=>{if(player.x+42>r.x&&player.x<r.x+r.w&&player.y+48>430-r.h&&player.vy>=0){player.vy=-520;player.on=false;score+=10}});
      obstacles.forEach(o=>{if(player.x<o.x+o.w&&player.x+40>o.x&&player.y+50>430-o.h){lives--;o.x=-100;beep(110,.08);if(lives<=0)gameOver('CRASH!')}});
      rings.forEach(r=>{let dx=player.x+20-r.x,dy=player.y+20-r.y;if(dx*dx+dy*dy<1000){r.taken=true;score+=50+lvl;beep(900,.025)}});
      score+=Math.floor(dt*12); if(dist>=finish)gameOver('LEVEL CLEAR'); hud(score,lives,`DIST ${Math.floor(dist/finish*100)}%`);
    },
    draw(){const t=levelTheme();drawWorldSky();ctx.fillStyle=t.ground;ctx.fillRect(0,430,960,110);ctx.fillStyle=t.brick;for(let x=-60;x<980;x+=44){ctx.fillRect(x+(performance.now()/15%44),430,22,22);ctx.fillRect(x+22+(performance.now()/15%44),452,22,22)}ctx.fillStyle='#0c5cff';ctx.fillRect(player.x,player.y,42,48);ctx.fillStyle='#fff';ctx.fillRect(player.x+28,player.y+10,8,8);ctx.fillStyle=t.hazard;obstacles.forEach(o=>ctx.fillRect(o.x,430-o.h,o.w,o.h));ctx.fillStyle=t.accent;ramps.forEach(r=>{ctx.beginPath();ctx.moveTo(r.x,430);ctx.lineTo(r.x+r.w,430);ctx.lineTo(r.x+r.w,430-r.h);ctx.fill()});ctx.strokeStyle='#FFD93D';ctx.lineWidth=6;rings.forEach(r=>{ctx.beginPath();ctx.arc(r.x,r.y,15,0,Math.PI*2);ctx.stroke()});ctx.fillStyle='#fff';ctx.fillRect(900-(dist/finish)*780,56,12,45)}
  };
}

function platformEngine(){
  const lvl=levelNumber(), rng=makeRng(levelSeed(3));
  const length=1300+lvl*55; let p={x:40,y:400,vx:0,vy:0,on:false}; let score=0,lives=3,cam=0;
  let plats=[{x:0,y:460,w:220,h:40}], coins=[], enemies=[]; let x=250;
  while(x<length-160){const gap=60+rng()*80, w=100+rng()*120, y=300+rng()*115; plats.push({x:x+gap,y,w,h:24}); if(rng()<.75) coins.push({x:x+gap+w/2,y:y-42,t:false}); if(rng()<.45+lvl/180) enemies.push({x:x+gap+w/2,y:y-34,dir:rng()<.5?-1:1,min:x+gap,max:x+gap+w-34}); x+=gap+w;}
  plats.push({x:length,y:430,w:260,h:70}); coins.push({x:length+80,y:360,t:false});
  return {update(dt){p.vx=(press('arrowleft','a')?-235:0)+(press('arrowright','d')?235:0);if(press(' ','arrowup','w')&&p.on){p.vy=-610;p.on=false;beep(520,.04)}p.vy+=1350*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.on=false;plats.forEach(pl=>{if(p.x+32>pl.x&&p.x<pl.x+pl.w&&p.y+44>pl.y&&p.y+44<pl.y+28+p.vy*dt+14&&p.vy>=0){p.y=pl.y-44;p.vy=0;p.on=true}});if(p.y>600){lives--;p.x=40;p.y=400;p.vy=0;if(lives<=0)gameOver('GAME OVER')}enemies.forEach(e=>{e.x+=e.dir*(75+lvl*2)*dt;if(e.x<e.min||e.x>e.max)e.dir*=-1;if(p.x+32>e.x&&p.x<e.x+34&&p.y+44>e.y){if(p.vy>150&&p.y+44<e.y+24){score+=100;e.x=-999;p.vy=-360;beep(700,.04)}else{lives--;p.x=Math.max(40,p.x-180);p.y=260;beep(130,.08);if(lives<=0)gameOver('GAME OVER')}}});coins.forEach(c=>{if(!c.t&&Math.abs(p.x-c.x)<34&&Math.abs(p.y-c.y)<50){c.t=true;score+=50+lvl;beep(900,.025)}});if(p.x>length+160)gameOver('STAGE CLEAR');cam=Math.max(0,Math.min(length-740,p.x-340));hud(score,lives,`X ${Math.floor(p.x)}/${length}`)},draw(){const t=levelTheme();drawWorldSky();ctx.save();ctx.translate(-cam,0);ctx.fillStyle=t.ground;plats.forEach(pl=>ctx.fillRect(pl.x,pl.y,pl.w,pl.h));ctx.fillStyle=t.brick;plats.filter(pl=>pl.y>420).forEach(pl=>{for(let bx=pl.x;bx<pl.x+pl.w;bx+=32)ctx.fillRect(bx,pl.y,30,30)});ctx.fillStyle='#FFD93D';coins.forEach(c=>{if(!c.t){ctx.beginPath();ctx.arc(c.x,c.y,13,0,Math.PI*2);ctx.fill()}});ctx.fillStyle=t.hazard;enemies.forEach(e=>{if(e.x>0)ctx.fillRect(e.x,e.y,34,34)});if(selected&&selected.id==='platform')drawMarioLike(p.x,p.y);else drawHumanoid(p.x,p.y,t.accent);ctx.fillStyle='#fff';ctx.fillRect(length+170,300,8,130);ctx.fillStyle=t.accent;ctx.fillRect(length+178,300,55,36);ctx.restore()}}
}

function duelEngine(){
  const lvl=levelNumber(); let p={x:230,hp:100,block:false,cd:0},c={x:680,hp:100+lvl*1.4,cd:0,mode:0},score=0;
  function hit(att){let dist=Math.abs(p.x-c.x); if(dist<105){if(att==='p'){const dmg=press('enter','k')?14:9;c.hp-=dmg;score+=20;beep(630,.035)}else if(!p.block){p.hp-=7+lvl*.08;beep(120,.05)}else score+=3}}
  return {update(dt){p.cd-=dt;c.cd-=dt;p.block=press('arrowdown','s');if(press('arrowleft','a'))p.x-=235*dt;if(press('arrowright','d'))p.x+=235*dt;p.x=Math.max(50,Math.min(560,p.x));if((press(' ')||press('enter','k'))&&p.cd<=0){p.cd=.34;hit('p')}let dist=p.x-c.x;const ai=150+lvl*2.5;if(Math.abs(dist)>82)c.x+=Math.sign(dist)*ai*dt;else if(c.cd<=0){c.cd=Math.max(.28,.85-lvl*.006);hit('c')}if(c.hp<=0)gameOver('K.O. YOU WIN');if(p.hp<=0)gameOver('K.O. DEFEAT');hud(score,Math.max(0,Math.ceil(p.hp/34)),`HP ${Math.floor(p.hp)} / CPU ${Math.floor(c.hp)}`)},draw(){const t=levelTheme();drawWorldSky();ctx.fillStyle=t.ground;ctx.fillRect(0,410,960,130);ctx.fillStyle='#FFD93D';ctx.fillRect(70,45,Math.max(0,p.hp*3),24);ctx.fillStyle=t.hazard;ctx.fillRect(590,45,Math.max(0,c.hp*2.1),24);drawHumanoid(p.x,320,'#5DA9FF');drawHumanoid(c.x,320,t.hazard);ctx.fillStyle=p.block?'#00D1B2':'#fff';if(p.cd>.18)ctx.fillRect(p.x+40,346,64,12);ctx.fillStyle='#fff';if(c.cd>.42)ctx.fillRect(c.x-62,346,64,12);ctx.fillStyle='#fff';ctx.font='24px Courier New';ctx.fillText('PLAYER',70,35);ctx.fillText('CPU LV '+lvl,590,35)}}
}

function tetrisEngine(){
  const lvl=levelNumber(); const W=10,H=20,S=24,OX=360,OY=25; let board=Array.from({length:H},()=>Array(W).fill(0)); let score=0,lives=1,drop=0;
  const colors=['#000','#00D1B2','#4DA8FF','#A66CFF','#FFD93D','#FF6B6B','#4CAF50','#FF4D4D']; const shapes=[[[1,1,1,1]],[[2,0,0],[2,2,2]],[[0,0,3],[3,3,3]],[[4,4],[4,4]],[[0,5,5],[5,5,0]],[[0,6,0],[6,6,6]],[[7,7,0],[0,7,7]]]; let piece; const rng=makeRng(levelSeed(4));
  const garbage=Math.min(8,Math.floor(lvl/13)); for(let y=H-garbage;y<H;y++){board[y]=Array.from({length:W},(_,x)=>rng()<.75?Math.floor(1+rng()*7):0);board[y][Math.floor(rng()*W)]=0}
  function spawn(){const i=Math.floor(rng()*shapes.length);piece={x:3,y:0,m:shapes[i].map(r=>r.slice()),c:i+1};if(collide(piece.x,piece.y,piece.m))gameOver('TOP OUT')}
  function collide(x,y,m){for(let r=0;r<m.length;r++)for(let c=0;c<m[r].length;c++)if(m[r][c]&&(x+c<0||x+c>=W||y+r>=H||(y+r>=0&&board[y+r][x+c])))return true;return false}
  function merge(){piece.m.forEach((row,yy)=>row.forEach((v,xx)=>{if(v&&board[piece.y+yy])board[piece.y+yy][piece.x+xx]=piece.c}));let lines=0;board=board.filter(row=>{if(row.every(Boolean)){lines++;return false}return true});while(board.length<H)board.unshift(Array(W).fill(0));if(lines){score+=[0,100,300,500,800][lines]*(1+lvl/20);beep(700,.05)}spawn()}
  function rotate(){const r=piece.m[0].map((_,i)=>piece.m.map(row=>row[i]).reverse());if(!collide(piece.x,piece.y,r))piece.m=r} spawn();
  return {keydown(k){if(k==='arrowleft'||k==='a'){if(!collide(piece.x-1,piece.y,piece.m))piece.x--}if(k==='arrowright'||k==='d'){if(!collide(piece.x+1,piece.y,piece.m))piece.x++}if(k==='arrowup'||k==='w'||k===' ')rotate();if(k==='enter'){while(!collide(piece.x,piece.y+1,piece.m))piece.y++;merge()}},update(dt){drop+=dt*(.8+lvl*.045)*diffMult();if(press('arrowdown','s'))drop+=dt*9;if(drop>.55){drop=0;if(!collide(piece.x,piece.y+1,piece.m))piece.y++;else merge()}hud(Math.floor(score),lives,'LINES MODE')},draw(){const t=levelTheme();clear();ctx.fillStyle=t.panel;ctx.fillRect(OX-18,OY-18,W*S+36,H*S+36);ctx.strokeStyle=t.accent;ctx.lineWidth=4;ctx.strokeRect(OX-18,OY-18,W*S+36,H*S+36);for(let y=0;y<H;y++)for(let x=0;x<W;x++){ctx.strokeStyle=t.wall;ctx.strokeRect(OX+x*S,OY+y*S,S,S);if(board[y][x]){ctx.fillStyle=colors[board[y][x]];ctx.fillRect(OX+x*S+1,OY+y*S+1,S-2,S-2)}}piece.m.forEach((row,yy)=>row.forEach((v,xx)=>{if(v){ctx.fillStyle=colors[piece.c];ctx.fillRect(OX+(piece.x+xx)*S+1,OY+(piece.y+yy)*S+1,S-2,S-2)}}));ctx.fillStyle=t.text;ctx.font='22px Courier New';ctx.fillText('GARBAGE ROWS: '+garbage,610,90);ctx.fillText('GRAVITY LV: '+lvl,610,130);ctx.fillText('ENTER = HARD DROP',610,170)}}
}

/* ------------------------------------------------------------------
   LONGER, FEATURE-RICH MARIO + SONIC UPGRADES + EASIER PAC-MAN
   Appended as final overrides so these are the engines actually used.
-------------------------------------------------------------------*/
function mazeEngine(){
  const lvl=levelNumber(), rng=makeRng(levelSeed(11));
  const cols=23, rows=17, tile=28, offX=158, offY=34;
  let map=Array.from({length:rows},(_,y)=>Array.from({length:cols},(_,x)=>(x===0||y===0||x===cols-1||y===rows-1)?'#':'.'));
  // Easier maze: fewer dead-end walls, more open lanes.
  for(let y=2;y<rows-2;y+=2){
    for(let x=2;x<cols-2;x+=2){
      if(rng()<0.46+Math.min(.12,lvl/250)) map[y][x]='#';
      if(rng()<0.24+Math.min(.10,lvl/300)){
        const d=[[1,0],[-1,0],[0,1],[0,-1]][Math.floor(rng()*4)];
        const wx=x+d[0], wy=y+d[1]; if(wx>1&&wy>1&&wx<cols-2&&wy<rows-2) map[wy][wx]='#';
      }
    }
  }
  for(let y=1;y<4;y++)for(let x=1;x<5;x++)map[y][x]='.';
  for(let y=rows-4;y<rows-1;y++)for(let x=cols-5;x<cols-1;x++)map[y][x]='.';
  // Power pellets
  [[1,1],[cols-2,1],[1,rows-2],[cols-2,rows-2]].forEach(([x,y])=>map[y][x]='o');
  let pellets=0; for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)if(map[y][x]==='.'||map[y][x]==='o')pellets++;
  let p={x:1,y:1,dx:1,dy:0,t:0,inv:1.5,power:0};
  const ghostCount=Math.min(4,1+Math.floor(lvl/30));
  let ghosts=Array.from({length:ghostCount},(_,i)=>({x:cols-2-i%2,y:rows-2-Math.floor(i/2),homeX:cols-2-i%2,homeY:rows-2-Math.floor(i/2),c:['#ff5da2','#4DA8FF','#FF6B6B','#00D1B2'][i%4],t:0}));
  let score=0,lives=3;
  const moveSpeed=5.4*Math.min(1.35,diffMult());
  function can(x,y){return map[y]&&map[y][x]&&map[y][x]!=='#'}
  function resetPlayer(){p.x=1;p.y=1;p.dx=1;p.dy=0;p.inv=1.6}
  return {update(dt){
    if(press('arrowleft','a')){p.dx=-1;p.dy=0} if(press('arrowright','d')){p.dx=1;p.dy=0}
    if(press('arrowup','w')){p.dx=0;p.dy=-1} if(press('arrowdown','s')){p.dx=0;p.dy=1}
    p.t+=dt*moveSpeed; p.inv=Math.max(0,p.inv-dt); p.power=Math.max(0,p.power-dt);
    if(p.t>1){p.t=0; const nx=p.x+p.dx,ny=p.y+p.dy; if(can(nx,ny)){p.x=nx;p.y=ny; if(map[ny][nx]==='.'||map[ny][nx]==='o'){if(map[ny][nx]==='o'){p.power=7;score+=50;beep(300,.05)}else score+=10; map[ny][nx]=' ';pellets--;beep(880,.012)}}}
    ghosts.forEach((g)=>{g.t+=dt*(1.65+lvl*.018)*enemyMult(); if(g.t>1){g.t=0; let dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(d=>can(g.x+d[0],g.y+d[1])); dirs.sort((a,b)=>{const ax=g.x+a[0],ay=g.y+a[1],bx=g.x+b[0],by=g.y+b[1]; const target=p.power>0?[g.homeX,g.homeY]:[p.x,p.y]; return Math.abs(target[0]-ax)+Math.abs(target[1]-ay)-(Math.abs(target[0]-bx)+Math.abs(target[1]-by));}); const smart=.28+Math.min(.28,lvl/250); const d=rng()<smart?dirs[0]:dirs[Math.floor(rng()*dirs.length)]; if(d){g.x+=d[0];g.y+=d[1];}} if(g.x===p.x&&g.y===p.y&&p.inv<=0){if(p.power>0){score+=200;g.x=g.homeX;g.y=g.homeY;beep(950,.04)}else{lives--;beep(100,.08);if(lives<=0)gameOver('GAME OVER');else resetPlayer();}}});
    if(pellets<=0)gameOver('LEVEL CLEAR'); hud(score,lives,`DOTS ${pellets}`);
  },draw(){const t=levelTheme();clear();ctx.fillStyle=t.panel;ctx.fillRect(offX-12,offY-12,cols*tile+24,rows*tile+24);for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const px=offX+x*tile,py=offY+y*tile;if(map[y][x]==='#'){ctx.fillStyle=t.wall;ctx.fillRect(px,py,tile,tile);ctx.strokeStyle=t.accent;ctx.strokeRect(px+4,py+4,tile-8,tile-8)}else if(map[y][x]==='.'||map[y][x]==='o'){ctx.fillStyle=map[y][x]==='o'?'#FFD93D':'#fff';ctx.beginPath();ctx.arc(px+14,py+14,map[y][x]==='o'?6:3,0,Math.PI*2);ctx.fill()}}ctx.fillStyle=p.power>0?'#fff27a':'#FFD93D';ctx.beginPath();ctx.arc(offX+p.x*tile+14,offY+p.y*tile+14,12,.18*Math.PI,1.82*Math.PI);ctx.lineTo(offX+p.x*tile+14,offY+p.y*tile+14);ctx.fill();ghosts.forEach(g=>{ctx.fillStyle=p.power>0?'#2b56ff':g.c;ctx.fillRect(offX+g.x*tile+4,offY+g.y*tile+5,20,22);ctx.fillStyle='#fff';ctx.fillRect(offX+g.x*tile+8,offY+g.y*tile+10,5,5);ctx.fillRect(offX+g.x*tile+17,offY+g.y*tile+10,5,5)})}}
}

function platformEngine(){
  const lvl=levelNumber(), rng=makeRng(levelSeed(22));
  const worldIndex=Math.floor((lvl-1)/12)%8;
  const worldNames=['Overworld','Underground','Underwater','Castle Lava','Sky Platforms','Pipe Valley','Bullet Hills','Bowser Castle'];
  const world=worldNames[worldIndex];
  const underwater=world==='Underwater', castle=world.includes('Castle')||world.includes('Lava');
  const length=3600+lvl*95; let score=0, coins=0, lives=3, time=260-Math.min(90,lvl), cam=0;
  let p={x:50,y:350,vx:0,vy:0,on:false,big:false,fire:false,star:0,crouch:false,face:1,shootCd:0};
  let plats=[{x:0,y:460,w:360,h:60,type:'ground'}], blocks=[], enemies=[], powerups=[], fireballs=[], pipes=[], platforms=[];
  let x=420;
  while(x<length-300){
    const themeY=castle?380:underwater?330:300;
    const gap=underwater?40+rng()*55:75+rng()*105, w=140+rng()*180, y=themeY+rng()*95;
    plats.push({x:x+gap,y,w,h:28,type:'ground'});
    if(rng()<.42) platforms.push({x:x+gap+40,y:y-90,w:100,h:18,base:y-90,phase:rng()*6});
    if(rng()<.78) blocks.push({x:x+gap+w*.35,y:y-92,w:28,h:28,type:rng()<.55?'question':rng()<.75?'brick':'hidden',used:false,item:rng()<.38?'mushroom':rng()<.58?'fire':rng()<.72?'star':rng()<.82?'1up':'coin'});
    if(rng()<.62) enemies.push({x:x+gap+w*.55,y:y-34,dir:rng()<.5?-1:1,min:x+gap,max:x+gap+w-34,type:['goomba','koopa','buzzy','hammer','piranha','bullet'][Math.min(5,Math.floor(rng()*Math.min(6,2+lvl/14)))]});
    if(rng()<.36) pipes.push({x:x+gap+w-36,y:y-64,w:56,h:64,secret:rng()<.25,warp:rng()<.08&&lvl<85});
    x+=gap+w;
  }
  plats.push({x:length,y:430,w:420,h:90,type:'finish'}); pipes.push({x:length-180,y:366,w:58,h:64,secret:false});
  function solidList(){return plats.concat(platforms.map(m=>({...m,y:m.y||m.base})),blocks.filter(b=>b.type!=='hidden'||b.used),pipes)}
  function rects(a,b){return a.x<a.x+a.w&&a.x+a.w>b.x&&a.x<b.x+b.w&&a.y+a.h>b.y&&a.y<b.y+b.h}
  function bumpBlock(b){if(b.used&&b.type==='question')return; b.used=true; if(b.type==='brick'&&p.big){score+=50;b.dead=true;beep(180,.03);return} if(b.item==='coin'){coins++;score+=100;if(coins>=100){coins=0;lives++;}beep(900,.03)} else powerups.push({x:b.x,y:b.y-28,vy:-80,type:b.item,dir:1});}
  function collectPower(u){if(u.type==='mushroom')p.big=true; if(u.type==='fire'){p.big=true;p.fire=true} if(u.type==='star')p.star=9; if(u.type==='1up')lives++; score+=1000; u.dead=true; beep(1000,.05)}
  function hurt(){if(p.star>0)return; if(p.fire){p.fire=false;p.big=true;return} if(p.big){p.big=false;return} lives--; p.x=Math.max(50,p.x-220); p.y=180; p.vy=0; if(lives<=0)gameOver('GAME OVER')}
  return {update(dt){
    time-=dt; if(time<=0)gameOver('TIME UP'); p.star=Math.max(0,p.star-dt); p.shootCd=Math.max(0,p.shootCd-dt);
    const sprint=press('shift','x')?1.45:1, accel=underwater?420:900, max=underwater?150:260*sprint; p.crouch=press('arrowdown','s');
    if(press('arrowleft','a')){p.vx-=accel*dt;p.face=-1} if(press('arrowright','d')){p.vx+=accel*dt;p.face=1} if(!press('arrowleft','a')&&!press('arrowright','d'))p.vx*=underwater?.94:.84; p.vx=Math.max(-max,Math.min(max,p.vx));
    if((press(' ','arrowup','w'))&&(p.on||underwater)){p.vy=underwater?-260:-620;p.on=false;beep(520,.04)}
    if(p.fire&&press('enter','k')&&p.shootCd<=0){fireballs.push({x:p.x+18,y:p.y+18,vx:p.face*410,vy:-120});p.shootCd=.35;beep(740,.03)}
    p.vy+=(underwater?620:castle?1450:1350)*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; p.on=false;
    platforms.forEach(m=>m.y=m.base+Math.sin(performance.now()/700+m.phase)*45);
    solidList().forEach(o=>{if(o.dead)return; const body={x:p.x,y:p.y,w:32,h:p.big?54:42}; if(rects(body,o)){ if(p.vy>=0&&p.y+(p.big?54:42)-p.vy*dt<=o.y+12){p.y=o.y-(p.big?54:42);p.vy=0;p.on=true}else if(p.vy<0&&p.y-p.vy*dt>=o.y+o.h-8){p.y=o.y+o.h;p.vy=40;if(o.type==='question'||o.type==='brick'||o.type==='hidden')bumpBlock(o)}else{p.x+=p.vx>0?-8:8;p.vx=0} }});
    blocks=blocks.filter(b=>!b.dead);
    powerups.forEach(u=>{u.vy+=900*dt;u.x+=(u.dir||1)*80*dt;u.y+=u.vy*dt;solidList().forEach(o=>{if(rects({x:u.x,y:u.y,w:24,h:24},o)&&u.vy>0){u.y=o.y-24;u.vy=0}});if(rects({x:p.x,y:p.y,w:32,h:p.big?54:42},{x:u.x,y:u.y,w:24,h:24}))collectPower(u)}); powerups=powerups.filter(u=>!u.dead&&u.y<600);
    fireballs.forEach(f=>{f.vy+=620*dt;f.x+=f.vx*dt;f.y+=f.vy*dt;solidList().forEach(o=>{if(rects({x:f.x,y:f.y,w:10,h:10},o)){f.vy=-260}});enemies.forEach(e=>{if(!e.dead&&rects({x:f.x,y:f.y,w:10,h:10},{x:e.x,y:e.y,w:34,h:34})){e.dead=true;f.dead=true;score+=200}})}); fireballs=fireballs.filter(f=>!f.dead&&f.x>cam-50&&f.x<cam+1050);
    enemies.forEach(e=>{if(e.dead)return; e.x+=e.dir*(55+lvl*1.4)*dt; if(e.x<e.min||e.x>e.max)e.dir*=-1; const body={x:p.x,y:p.y,w:32,h:p.big?54:42}; if(rects(body,{x:e.x,y:e.y,w:34,h:34})){ if(p.vy>120&&p.y+(p.big?54:42)<e.y+25){e.dead=true;p.vy=-360;score+=150;beep(700,.04)}else hurt(); }});
    pipes.forEach(pipe=>{if(pipe.secret&&Math.abs(p.x-pipe.x)<34&&press('arrowdown','s')&&p.on){score+=500;coins+=12;p.x+=220;beep(880,.08)} if(pipe.warp&&Math.abs(p.x-pipe.x)<34&&press('arrowdown','s')&&p.on){selectedLevel=currentLevels[Math.min(99,(selectedLevel.level+7)-1)]||selectedLevel;gameOver('WARP ZONE')}});
    if(castle && p.y>500)hurt(); if(p.y>650)hurt(); if(p.x>length+220){score+=Math.floor(time)*10;gameOver('STAGE CLEAR')}
    cam=Math.max(0,Math.min(length-690,p.x-300)); hud(score,lives,`COINS ${coins} TIME ${Math.ceil(time)}`);
  },draw(){const t=levelTheme();drawWorldSky();ctx.save();ctx.translate(-cam,0);if(castle){ctx.fillStyle='#ff4d00';ctx.fillRect(cam,495,960,80)}ctx.fillStyle=t.ground;plats.forEach(pl=>ctx.fillRect(pl.x,pl.y,pl.w,pl.h));ctx.fillStyle=t.accent;platforms.forEach(m=>ctx.fillRect(m.x,m.y,m.w,m.h));pipes.forEach(pipe=>{ctx.fillStyle='#1fb94a';ctx.fillRect(pipe.x,pipe.y,pipe.w,pipe.h);ctx.fillStyle='#34e86a';ctx.fillRect(pipe.x-6,pipe.y,pipe.w+12,14)});blocks.forEach(b=>{if(b.type==='hidden'&&!b.used)return;ctx.fillStyle=b.used?'#8b5a2b':b.type==='question'?'#f3a12d':'#b5622b';ctx.fillRect(b.x,b.y,b.w,b.h);ctx.fillStyle='#fff';if(b.type==='question'&&!b.used)ctx.fillText('?',b.x+9,b.y+20)});ctx.fillStyle='#FFD93D';powerups.forEach(u=>ctx.fillRect(u.x,u.y,24,24));ctx.fillStyle='#ff6b2b';fireballs.forEach(f=>ctx.fillRect(f.x,f.y,10,10));enemies.forEach(e=>{if(!e.dead){ctx.fillStyle=e.type==='koopa'?'#4CAF50':e.type==='hammer'?'#7d4bff':e.type==='bullet'?'#111':'#8b4513';ctx.fillRect(e.x,e.y,34,34);ctx.fillStyle='#fff';ctx.fillText(e.type[0].toUpperCase(),e.x+10,e.y+23)}});drawMarioLike(p.x,p.y+(p.big?-10:0));if(p.fire){ctx.fillStyle='#ff8a00';ctx.fillRect(p.x+5,p.y+18,22,10)}if(p.star>0){ctx.strokeStyle='#FFD93D';ctx.strokeRect(p.x-4,p.y-4,42,p.big?62:50)}ctx.fillStyle='#fff';ctx.fillRect(length+170,300,8,130);ctx.fillStyle=t.accent;ctx.fillRect(length+178,300,55,36);ctx.restore();ctx.fillStyle='#fff';ctx.font='18px Courier New';ctx.fillText(`${world} • SHIFT sprint • ENTER fire`,18,82)}}
}

function speedEngine(){
  const lvl=levelNumber(), rng=makeRng(levelSeed(33));
  const zones=['Emerald Hill','Chemical Plant','Aquatic Ruin','Casino Night','Hill Top','Mystic Cave','Oil Ocean','Metropolis','Sky Chase','Wing Fortress','Death Egg'];
  const zone=zones[Math.floor((lvl-1)/9)%zones.length], underwater=zone.includes('Aquatic'), casino=zone.includes('Casino'), bossAct=lvl%9===0;
  const finish=6200+lvl*170; let player={x:120,y:390,vx:0,vy:0,on:true,roll:false,charge:0,shield:false,inv:0,shoes:0}, rings=25, lives=3, score=0, dist=0, spawn=0, boss=bossAct?{x:850,y:300,hp:5+Math.floor(lvl/8),cd:0}:null;
  let obs=[], ringItems=[], springs=[], monitors=[], loops=[];
  function damage(){if(player.inv>0)return;if(rings>0){rings=0;player.inv=2;beep(120,.08)}else{lives--;player.inv=2;if(lives<=0)gameOver('GAME OVER')}}
  return {update(dt){
    player.inv=Math.max(0,player.inv-dt);player.shoes=Math.max(0,player.shoes-dt);
    const accel=(player.shoes>0?950:700)*diffMult(), max=(player.shoes>0?760:560)*diffMult();
    if(press('arrowleft','a'))player.vx-=accel*dt;if(press('arrowright','d'))player.vx+=accel*dt;if(!press('arrowleft','a')&&!press('arrowright','d'))player.vx*=.985;
    if(press('arrowdown','s')&&player.on){player.roll=true;player.charge+=dt;if(press(' ','arrowup','w')){player.vx=720*Math.sign(player.vx||1)*(1+Math.min(1.2,player.charge));player.charge=0;beep(500,.04)}}else{player.charge=0;if(Math.abs(player.vx)<80)player.roll=false}
    if((press(' ','arrowup','w'))&&player.on&&!press('arrowdown','s')){player.vy=-620;player.on=false;player.roll=true;beep(650,.035)}
    player.vx=Math.max(-max,Math.min(max,player.vx)); player.vy+=(underwater?850:1500)*dt; player.y+=player.vy*dt; dist+=Math.max(160,Math.abs(player.vx))*dt; if(player.y>390){player.y=390;player.vy=0;player.on=true}
    spawn-=dt; if(spawn<=0&&dist<finish-800){spawn=Math.max(.22,(.9-rng()*.25)/diffMult()); const kind=rng(); const x=980; if(kind<.35)obs.push({x,w:32,h:38+rng()*52,type:'badnik'}); else if(kind<.58)springs.push({x,y:410,type:'spring'}); else if(kind<.75)monitors.push({x,y:330,type:['rings','shield','inv','shoes','life'][Math.floor(rng()*5)]}); else if(kind<.9)loops.push({x,w:130,h:120}); else ringItems.push({x,y:230+rng()*140,t:false});}
    const scroll=Math.max(300,Math.abs(player.vx)+260)*dt; obs.forEach(o=>o.x-=scroll); ringItems.forEach(r=>r.x-=scroll); springs.forEach(s=>s.x-=scroll); monitors.forEach(m=>m.x-=scroll); loops.forEach(l=>l.x-=scroll);
    ringItems.forEach(r=>{if(!r.t&&Math.hypot(150-r.x,player.y+20-r.y)<36){r.t=true;rings++;score+=10;beep(900,.015)}});
    springs.forEach(s=>{if(150<s.x+34&&190>s.x&&player.y+50>s.y){player.vy=-780;player.on=false;score+=20;beep(800,.04)}});
    monitors.forEach(m=>{if(!m.dead&&150<m.x+34&&190>m.x&&player.y+50>m.y&&player.y<m.y+34){m.dead=true;score+=100;if(m.type==='rings')rings+=10;if(m.type==='shield')player.shield=true;if(m.type==='inv')player.inv=8;if(m.type==='shoes')player.shoes=8;if(m.type==='life')lives++;beep(1000,.05)}});
    obs.forEach(o=>{if(!o.dead&&150<o.x+o.w&&190>o.x&&player.y+50>430-o.h){if(player.roll||player.vy>100){o.dead=true;score+=100;player.vy=-280;beep(700,.03)}else damage()}});
    if(boss){boss.cd-=dt;if(boss.cd<=0){boss.cd=Math.max(.55,1.4-lvl*.01);obs.push({x:boss.x-40,w:34,h:34,type:'bossShot'})} if(press(' ','arrowup','w')&&Math.abs(player.y-boss.y)<70&&boss.x<210){boss.hp--;score+=500;beep(900,.04)}}
    obs=obs.filter(o=>o.x>-100&&!o.dead); ringItems=ringItems.filter(r=>r.x>-80&&!r.t); springs=springs.filter(s=>s.x>-80); monitors=monitors.filter(m=>m.x>-80&&!m.dead); loops=loops.filter(l=>l.x>-160);
    if(dist>=finish){if(boss&&boss.hp>0){boss.x-=120*dt; if(boss.x<210)damage()}else gameOver('LEVEL CLEAR')}
    score+=Math.floor(Math.abs(player.vx)*dt/30); hud(score,lives,`RINGS ${rings} ${Math.floor(dist/finish*100)}%`);
  },draw(){const t=levelTheme();drawWorldSky();ctx.fillStyle=underwater?'rgba(30,130,220,.35)':casino?'rgba(255,217,61,.12)':'rgba(255,255,255,.04)';ctx.fillRect(0,0,960,430);ctx.fillStyle=t.ground;ctx.fillRect(0,430,960,110);ctx.fillStyle=t.brick;for(let x=-60;x<980;x+=44){ctx.fillRect(x+(performance.now()/15%44),430,22,22);ctx.fillRect(x+22+(performance.now()/15%44),452,22,22)}loops.forEach(l=>{ctx.strokeStyle=t.accent;ctx.lineWidth=10;ctx.beginPath();ctx.arc(l.x+65,405,58,0,Math.PI*2);ctx.stroke()});ctx.strokeStyle='#FFD93D';ctx.lineWidth=5;ringItems.forEach(r=>{ctx.beginPath();ctx.arc(r.x,r.y,13,0,Math.PI*2);ctx.stroke()});ctx.fillStyle=t.accent;springs.forEach(s=>ctx.fillRect(s.x,s.y,34,20));monitors.forEach(m=>{ctx.fillStyle='#222';ctx.fillRect(m.x,m.y,34,34);ctx.fillStyle=t.accent;ctx.fillText(m.type[0].toUpperCase(),m.x+10,m.y+23)});obs.forEach(o=>{ctx.fillStyle=o.type==='bossShot'?'#ff2222':t.hazard;ctx.fillRect(o.x,430-o.h,o.w,o.h)});ctx.fillStyle='#0c5cff';ctx.fillRect(player.x,player.y,42,48);ctx.fillStyle='#fff';ctx.fillRect(player.x+28,player.y+10,8,8);if(player.shield){ctx.strokeStyle='#7ee8ff';ctx.beginPath();ctx.arc(player.x+21,player.y+24,35,0,Math.PI*2);ctx.stroke()}if(boss){ctx.fillStyle='#ff4d4d';ctx.fillRect(boss.x,boss.y,70,70);ctx.fillStyle='#fff';ctx.fillText('BOT '+boss.hp,boss.x-5,boss.y-10)}ctx.fillStyle='#fff';ctx.font='18px Courier New';ctx.fillText(`${zone} • DOWN+JUMP spin dash • Rings protect you`,18,82)}}
}
