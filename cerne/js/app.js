/* app.js — Cerne: navegação da trilha (menu lateral + tela de conclusão) */
const state = { current: 'intro', visited: new Set(['intro']), reels: {} };
const ORDER = ['intro', ...MODULES.map(m => m.id), 'complete'];
const LABEL = { intro: 'Visão geral', complete: 'Trilha concluída' };
MODULES.forEach(m => { LABEL[m.id] = m.title; });

/* ── menu lateral: lista de módulos com seções expandidas ── */
function buildSidebar(){
  const nav = document.getElementById('sidebarNav');
  if(!nav) return;
  const introItem = `
    <a href="#" class="side-link" data-id="intro" onclick="goTo('intro');return false;">
      <span class="side-dot"></span>Visão geral
    </a>`;
  const moduleItems = MODULES.map(m => `
    <div class="side-module">
      <a href="#" class="side-link side-module-link" data-id="${m.id}" onclick="goTo('${m.id}');return false;">
        <span class="side-num">${String(m.num).padStart(2,'0')}</span>${m.title}
      </a>
      <div class="side-sections">
        ${m.sections.map((s, i) => `
          <a href="#" class="side-sublink" data-id="${m.id}" data-i="${i}" onclick="goToSection('${m.id}',${i});return false;">
            <span class="side-subnum">${s.num}</span>${s.title}
          </a>`).join('')}
      </div>
    </div>`).join('');
  const completeItem = `
    <a href="#" class="side-link" data-id="complete" onclick="goTo('complete');return false;">
      <span class="side-dot"></span>Conclusão
    </a>`;
  nav.innerHTML = introItem + moduleItems + completeItem;
}

function buildStage(){
  const stage = document.getElementById('stage');
  if(!stage) return;
  let html = '';
  MODULES.forEach(m => {
    html += `<section class="glass-card" id="s-${m.id}"><div id="stage-${m.id}"></div></section>`;
  });
  document.getElementById('s-complete').insertAdjacentHTML('beforebegin', html);
  MODULES.forEach(m => window['buildModule' + m.num]());
}

/* ── reel (carrossel de seções dentro de um módulo) ── */
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
  if(next) next.disabled = false;
  document.querySelectorAll(`.side-sublink[data-id="${id}"]`).forEach((el, i) => el.classList.toggle('active', i === r.i));
}
function paneStep(id, dir){
  const r = state.reels[id]; if(!r){ return; }
  const track = document.getElementById('track-' + id);
  const total = track ? track.children.length : 0;
  if(dir > 0 && r.i < total - 1){ reelGo(id, r.i + 1); return; }
  if(dir < 0 && r.i > 0){ reelGo(id, r.i - 1); return; }
  navLinear(dir);
}

/* ── ir direto para uma seção específica de um módulo (a partir do menu lateral) ── */
function goToSection(moduleId, i){
  goTo(moduleId);
  setTimeout(() => reelGo(moduleId, i), 30);
}

/* ── navegação entre telas ── */
function goTo(id){
  document.getElementById('s-' + state.current)?.classList.remove('on');
  const next = document.getElementById('s-' + id);
  if(!next) return;
  next.classList.add('on');
  state.current = id;
  state.visited.add(id);
  document.querySelectorAll('.side-link').forEach(n => n.classList.toggle('active', n.dataset.id === id));
  const title = document.getElementById('topbarTitle');
  if(title) title.textContent = LABEL[id] || '';
  if(MODULES.some(m => m.id === id)) setTimeout(() => reelInit(id), 20);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateProgress();
  closeSidebar();
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

/* ── progresso ── */
function updateProgress(){
  const trackable = ORDER.filter(id => id !== 'complete');
  const done = trackable.filter(id => state.visited.has(id)).length;
  const pct = Math.round((done / trackable.length) * 100);
  const pctEl = document.getElementById('pct');
  if(pctEl) pctEl.textContent = pct + '%';
  const fill = document.getElementById('progressFill');
  if(fill) fill.style.width = pct + '%';
}

/* ── menu lateral: abrir/fechar (mobile) ── */
function openSidebar(){
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('on');
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('on');
}
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.contains('open') ? closeSidebar() : openSidebar();
});
document.getElementById('sidebarClose').addEventListener('click', closeSidebar);
document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

/* ── teclado ── */
document.addEventListener('keydown', e => {
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if(e.key === 'ArrowRight') navLinear(1);
  if(e.key === 'ArrowLeft') navLinear(-1);
  if(e.key === 'Escape') closeSidebar();
});

/* ── início ── */
(function(){
  buildSidebar();
  buildStage();
  goTo('intro');
})();
