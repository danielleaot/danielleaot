/* app.js — Aurora + Apresentação: navegação da trilha e do visualizador de slides */
const state = { current: 'intro', visited: new Set(['intro']), viewers: {} };
const ORDER = ['intro', ...MODULES.map(m => m.id)];
const LABEL = { intro: 'Visão geral' };
MODULES.forEach(m => { LABEL[m.id] = m.title; });

function moduleSlides(m){ return SLIDES.filter(s => s.n >= m.start && s.n <= m.end); }

/* ── trilha de módulos no topo ── */
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
  MODULES.forEach(m => { html += `<section class="glass-card" id="s-${m.id}"><div id="stage-${m.id}"></div></section>`; });
  stage.insertAdjacentHTML('beforeend', html);
  MODULES.forEach(m => renderModule(m));
}

/* ── monta o cabeçalho do módulo + o visualizador de slides ── */
function renderModule(m){
  const host = document.getElementById('stage-' + m.id);
  if(!host) return;
  const slides = moduleSlides(m);
  const dots = slides.map((_, i) => `<button class="track-dot${i===0?' on':''}" data-i="${i}" aria-label="Slide ${i+1}"></button>`).join('');
  host.innerHTML = `
    <div class="module-head">
      <span class="eyebrow">${m.eyebrow}</span>
      <h1 class="module-title">${m.title}</h1>
      <p class="module-desc">Apresentação de apoio deste módulo — ${slides.length} slides, navegue com as setas ou os indicadores.</p>
    </div>
    <div class="viewer-frame">
      <div class="viewer-head">
        <span class="slide-badge" id="badge-${m.id}"></span>
        <strong class="slide-title" id="title-${m.id}"></strong>
        <span class="slide-counter" id="counter-${m.id}"></span>
      </div>
      <div class="slide-stage">
        <button class="glass-arrow left" onclick="viewerStep('${m.id}',-1)" aria-label="Slide anterior">&#8249;</button>
        <img class="slide-img" id="img-${m.id}" alt="" onclick="openLightbox('${m.id}')">
        <button class="glass-arrow right" onclick="viewerStep('${m.id}',1)" aria-label="Próximo slide">&#8250;</button>
      </div>
      <div class="track-dots" id="dots-${m.id}">${dots}</div>
    </div>
    <div class="reel-controls">
      <button class="glass-btn ghost" onclick="viewerStep('${m.id}',-1)">&#8592; Anterior</button>
      <button class="glass-btn ghost" onclick="openThumbs('${m.id}')">Ver todos os slides</button>
      <button class="glass-btn ghost" onclick="openLightbox('${m.id}')">Ampliar</button>
      <button class="glass-btn" onclick="viewerStep('${m.id}',1)">Próximo &#8594;</button>
    </div>`;
}

/* ── visualizador (imagem atual + dots + contador) ── */
function viewerInit(id){
  if(state.viewers[id]) return;
  state.viewers[id] = { i: 0 };
  document.querySelectorAll(`#dots-${id} .track-dot`).forEach((d, i) =>
    d.addEventListener('click', () => viewerGo(id, i)));
  viewerRender(id);
}
function viewerGo(id, i){
  const m = MODULES.find(x => x.id === id);
  const slides = moduleSlides(m);
  const v = state.viewers[id]; if(!v) return;
  v.i = Math.max(0, Math.min(i, slides.length - 1));
  viewerRender(id);
}
function viewerRender(id){
  const m = MODULES.find(x => x.id === id);
  const slides = moduleSlides(m);
  const v = state.viewers[id]; if(!v) return;
  const s = slides[v.i];
  const img = document.getElementById('img-' + id);
  if(img){ img.src = s.img; img.alt = `Slide ${String(s.n).padStart(2,'0')} — ${s.title}`; }
  const badge = document.getElementById('badge-' + id);
  if(badge) badge.textContent = `Slide ${String(s.n).padStart(2,'0')}`;
  const ttl = document.getElementById('title-' + id);
  if(ttl) ttl.textContent = s.title;
  const counter = document.getElementById('counter-' + id);
  if(counter) counter.textContent = `${v.i + 1} / ${slides.length}`;
  document.querySelectorAll(`#dots-${id} .track-dot`).forEach((d, i) => d.classList.toggle('on', i === v.i));
}
function viewerStep(id, dir){
  const m = MODULES.find(x => x.id === id);
  const slides = moduleSlides(m);
  const v = state.viewers[id]; if(!v) return;
  if(dir > 0 && v.i < slides.length - 1){ viewerGo(id, v.i + 1); return; }
  if(dir < 0 && v.i > 0){ viewerGo(id, v.i - 1); return; }
  navLinear(dir);
}

/* ── navegação entre telas ── */
function goTo(id){
  document.getElementById('s-' + state.current)?.classList.remove('on');
  const next = document.getElementById('s-' + id);
  if(!next) return;
  next.classList.add('on');
  state.current = id;
  state.visited.add(id);
  document.querySelectorAll('.path-node').forEach(n => n.classList.toggle('active', n.dataset.id === id));
  if(MODULES.some(m => m.id === id)) setTimeout(() => viewerInit(id), 20);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateProgress();
}
function navLinear(dir){
  const idx = ORDER.indexOf(state.current);
  const next = ORDER[idx + dir];
  if(!next) return;
  goTo(next);
  setTimeout(() => {
    if(MODULES.some(m => m.id === next)){
      const slides = moduleSlides(MODULES.find(m => m.id === next));
      viewerGo(next, dir < 0 ? slides.length - 1 : 0);
    }
  }, 30);
}

/* ── diálogo de miniaturas ── */
function openThumbs(id){
  const m = MODULES.find(x => x.id === id);
  const slides = moduleSlides(m);
  document.getElementById('thumbTitle').textContent = `${m.title} — ${m.eyebrow}`;
  const grid = document.getElementById('thumbGrid');
  grid.innerHTML = slides.map((s, i) => `
    <button type="button" onclick="viewerGo('${id}',${i}); document.getElementById('thumbsDialog').close();">
      <img src="${s.img}" alt="Slide ${String(s.n).padStart(2,'0')} — ${s.title}" loading="lazy">
      <span>Slide ${String(s.n).padStart(2,'0')}</span>
    </button>`).join('');
  document.getElementById('thumbsDialog').showModal();
}

/* ── lightbox ── */
function openLightbox(id){
  const m = MODULES.find(x => x.id === id);
  const slides = moduleSlides(m);
  const v = state.viewers[id]; if(!v) return;
  const s = slides[v.i];
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = s.img; img.alt = `Slide ${String(s.n).padStart(2,'0')} — ${s.title}`;
  lb.hidden = false;
}
function closeLightbox(){ document.getElementById('lightbox').hidden = true; }

/* ── progresso ── */
function updateProgress(){
  const done = ORDER.filter(id => state.visited.has(id)).length;
  const pct = Math.round((done / ORDER.length) * 100);
  const pctEl = document.getElementById('pct');
  if(pctEl) pctEl.textContent = pct + '%';
  const line = document.getElementById('pathLine');
  if(line) line.style.setProperty('--fill', pct + '%');
}

/* ── teclado e diálogos ── */
document.addEventListener('keydown', e => {
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const dialogOpen = document.getElementById('thumbsDialog')?.open;
  const lbOpen = !document.getElementById('lightbox')?.hidden;
  if(e.key === 'Escape'){
    document.getElementById('thumbsDialog')?.close();
    closeLightbox();
    return;
  }
  if(dialogOpen || lbOpen) return;
  if(e.key === 'ArrowRight') navLinear(1);
  if(e.key === 'ArrowLeft') navLinear(-1);
});

/* ── início ── */
(function(){
  buildPath();
  buildStage();
  goTo('intro');

  document.getElementById('closeLightbox')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox')?.addEventListener('click', e => {
    if(e.target.id === 'lightbox') closeLightbox();
  });
  document.querySelectorAll('[data-close]').forEach(b =>
    b.addEventListener('click', () => b.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(d => {
    d.addEventListener('click', e => {
      const r = d.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if(!inside) d.close();
    });
  });
})();
