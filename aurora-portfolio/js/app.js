/* app.js — Aurora: navegação da trilha (construído do zero) */
const state = { current: 'intro', visited: new Set(['intro']), reels: {} };
const ORDER = ['intro', ...MODULES.map(m => m.id)];
const LABEL = { intro: 'Visão geral' };
MODULES.forEach(m => { LABEL[m.id] = m.title; });

/* ── trilha de módulos no topo (nós conectados por uma linha) ── */
function buildPath(){
  const path = document.getElementById('path');
  if(!path) return;
  const nodes = MODULES.map(m => `
    <button class="path-node" data-id="${m.id}" onclick="goTo('${m.id}')" aria-label="${m.title}">
      <span class="path-dot"></span>
      <span class="path-label">${String(m.num).padStart(2,'0')}</span>
    </button>`).join('');
  path.innerHTML = `<span class="path-line" id="pathLine"></span>${nodes}`;
}

function buildStage(){
  const stage = document.getElementById('stage');
  if(!stage) return;
  let html = '';
  MODULES.forEach(m => {
    html += `<section class="glass-card" id="s-${m.id}"><div id="stage-${m.id}"></div></section>`;
  });
  stage.insertAdjacentHTML('beforeend', html);
  MODULES.forEach(m => window['buildModule' + m.num]());
}

/* ── reel (carrossel horizontal de seções dentro de um módulo) ── */
function reelInit(id){
  if(state.reels[id]) return;
  state.reels[id] = { i: 0 };
  document.querySelectorAll(`#dots-${id} .track-dot`).forEach((d, i) =>
    d.addEventListener('click', () => reelGo(id, i)));
  reelRender(id);
}
function reelGo(id, i){
  const r = state.reels[id]; if(!r) return;
  const track = document.getElementById('track-' + id); if(!track) return;
  r.i = Math.max(0, Math.min(i, track.children.length - 1));
  reelRender(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function reelRender(id){
  const r = state.reels[id]; if(!r) return;
  const track = document.getElementById('track-' + id); if(!track) return;
  const total = track.children.length;
  Array.from(track.children).forEach((p, i) => p.classList.toggle('on', i === r.i));
  document.querySelectorAll(`#dots-${id} .track-dot`).forEach((d, i) => d.classList.toggle('on', i === r.i));
  const prev = document.getElementById('prev-' + id), next = document.getElementById('next-' + id);
  const idx = ORDER.indexOf(id);
  if(prev) prev.disabled = (r.i === 0 && idx <= 0);
  if(next) next.disabled = (r.i === total - 1 && idx >= ORDER.length - 1);
}
function paneStep(id, dir){
  const r = state.reels[id]; if(!r){ return; }
  const track = document.getElementById('track-' + id);
  const total = track ? track.children.length : 0;
  if(dir > 0 && r.i < total - 1){ reelGo(id, r.i + 1); return; }
  if(dir < 0 && r.i > 0){ reelGo(id, r.i - 1); return; }
  navLinear(dir);
}

/* ── navegação entre telas (visão geral / módulos) ── */
function goTo(id){
  document.getElementById('s-' + state.current)?.classList.remove('on');
  const next = document.getElementById('s-' + id);
  if(!next) return;
  next.classList.add('on');
  state.current = id;
  state.visited.add(id);
  document.querySelectorAll('.path-node').forEach(n => n.classList.toggle('active', n.dataset.id === id));
  if(MODULES.some(m => m.id === id)) setTimeout(() => reelInit(id), 20);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateProgress();
}
function navLinear(dir){
  const r = state.reels[state.current];
  if(r){
    const track = document.getElementById('track-' + state.current);
    const total = track ? track.children.length : 0;
    if(dir > 0 && r.i < total - 1){ reelGo(state.current, r.i + 1); return; }
    if(dir < 0 && r.i > 0){ reelGo(state.current, r.i - 1); return; }
  }
  const idx = ORDER.indexOf(state.current);
  const next = ORDER[idx + dir];
  if(!next) return;
  goTo(next);
  setTimeout(() => {
    const rr = state.reels[next];
    if(rr){
      const track = document.getElementById('track-' + next);
      const total = track ? track.children.length : 0;
      reelGo(next, dir < 0 ? total - 1 : 0);
    }
  }, 30);
}

/* ── progresso: percentual + preenchimento da linha da trilha ── */
function updateProgress(){
  const done = ORDER.filter(id => state.visited.has(id)).length;
  const pct = Math.round((done / ORDER.length) * 100);
  const pctEl = document.getElementById('pct');
  if(pctEl) pctEl.textContent = pct + '%';
  const line = document.getElementById('pathLine');
  if(line) line.style.setProperty('--fill', pct + '%');
}

/* ── teclado ── */
document.addEventListener('keydown', e => {
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if(e.key === 'ArrowRight') navLinear(1);
  if(e.key === 'ArrowLeft') navLinear(-1);
});

/* ── início ── */
(function(){
  buildPath();
  buildStage();
  goTo('intro');
})();
