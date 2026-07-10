/* app.js — Aurora + Apresentação: menu lateral, visualizador de slides, tela de conclusão */
const state = { current: 'intro', visited: new Set(['intro']), viewers: {} };
const ORDER = ['intro', ...MODULES.map(m => m.id), 'complete'];
const LABEL = { intro: 'Visão geral', complete: 'Trilha concluída' };
MODULES.forEach(m => { LABEL[m.id] = m.title; });

function moduleSlides(m){ return SLIDES.filter(s => s.n >= m.start && s.n <= m.end); }

/* ── menu lateral: módulos + lista de slides de cada um ── */
function buildSidebar(){
  const nav = document.getElementById('sidebarNav');
  if(!nav) return;
  const introItem = `
    <a href="#" class="side-link" data-id="intro" onclick="goTo('intro');return false;">
      <span class="side-dot"></span>Visão geral
    </a>`;
  const moduleItems = MODULES.map(m => {
    const slides = moduleSlides(m);
    return `
    <div class="side-module">
      <a href="#" class="side-link side-module-link" data-id="${m.id}" onclick="goTo('${m.id}');return false;">
        <span class="side-num">${String(m.num).padStart(2,'0')}</span>${m.title}
      </a>
      <div class="side-sections">
        ${slides.map((s, i) => `
          <a href="#" class="side-sublink" data-id="${m.id}" data-i="${i}" onclick="goToSlide('${m.id}',${i});return false;">
            <span class="side-subnum">${String(s.n).padStart(2,'0')}</span>${s.title}
          </a>`).join('')}
      </div>
    </div>`;
  }).join('');
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
  MODULES.forEach(m => { html += `<section class="glass-card" id="s-${m.id}"><div id="stage-${m.id}"></div></section>`; });
  document.getElementById('s-complete').insertAdjacentHTML('beforebegin', html);
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
  document.querySelectorAll(`.side-sublink[data-id="${id}"]`).forEach((el, i) => el.classList.toggle('active', i === v.i));
}
function viewerStep(id, dir){
  const m = MODULES.find(x => x.id === id);
  const slides = moduleSlides(m);
  const v = state.viewers[id]; if(!v) return;
  if(dir > 0 && v.i < slides.length - 1){ viewerGo(id, v.i + 1); return; }
  if(dir < 0 && v.i > 0){ viewerGo(id, v.i - 1); return; }
  navLinear(dir);
}

/* ── ir direto para um slide específico (a partir do menu lateral) ── */
function goToSlide(moduleId, i){
  goTo(moduleId);
  setTimeout(() => viewerGo(moduleId, i), 30);
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
  if(MODULES.some(m => m.id === id)) setTimeout(() => viewerInit(id), 20);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateProgress();
  closeSidebar();
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

/* ── teclado e diálogos ── */
document.addEventListener('keydown', e => {
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const dialogOpen = document.getElementById('thumbsDialog')?.open;
  const lbOpen = !document.getElementById('lightbox')?.hidden;
  if(e.key === 'Escape'){
    if(dialogOpen || lbOpen){
      document.getElementById('thumbsDialog')?.close();
      closeLightbox();
      return;
    }
    closeSidebar();
    return;
  }
  if(dialogOpen || lbOpen) return;
  if(e.key === 'ArrowRight') navLinear(1);
  if(e.key === 'ArrowLeft') navLinear(-1);
});

/* ── início ── */
(function(){
  buildSidebar();
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
