/* app.js — protótipo de página de curso: renderização + alternador de tema + acordeão */

function renderModules(){
  const grid = document.getElementById('modulesGrid');
  const theme = THEMES[document.documentElement.dataset.theme];
  grid.innerHTML = MODULES_BASE.map(m => `
    <article class="module-card">
      <div class="module-head pattern-${((m.num - 1) % 3) + 1}">
        <span class="module-num">MÓDULO ${m.num}</span>
      </div>
      <div class="module-body">
        <p class="module-subtitle">${theme.moduleSubtitles[m.num - 1]}</p>
        <button class="mod-btn primary" type="button">📘 Conteúdo — Módulo ${m.num}</button>
        <button class="mod-btn secondary" type="button">📝 Exercício Avaliativo — Módulo ${m.num}</button>
      </div>
    </article>`).join('');
}

function renderAccordion(){
  const wrap = document.getElementById('accordion');
  wrap.innerHTML = ACCORDION_ITEMS.map((it, i) => `
    <div class="acc-item">
      <button class="acc-trigger" type="button" data-i="${i}" aria-expanded="false">
        <span class="acc-chevron">›</span>
        <span class="acc-icon">${ICONS[it.icon]}</span>
        <span class="acc-label">${it.label}</span>
      </button>
      <div class="acc-panel" id="acc-panel-${i}" hidden>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit — conteúdo de exemplo para esta seção, usado apenas para fins de demonstração do comportamento de abrir e fechar.</p>
      </div>
    </div>`).join('');

  wrap.querySelectorAll('.acc-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById('acc-panel-' + btn.dataset.i);
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.closest('.acc-item').classList.toggle('open', !open);
      panel.hidden = open;
    });
  });
}

function applyTheme(key){
  const theme = THEMES[key];
  document.documentElement.dataset.theme = key;
  document.getElementById('courseTitle').textContent = theme.courseTitle;
  document.getElementById('greetSub').textContent = theme.greetSub;
  document.getElementById('heroIcon').innerHTML = ICONS[theme.heroIcon];
  document.querySelectorAll('[data-icon]').forEach(el => {
    el.innerHTML = ICONS[el.dataset.icon];
  });
  document.querySelectorAll('.theme-btn').forEach(b =>
    b.classList.toggle('on', b.dataset.themeBtn === key));
  renderModules();
}

document.querySelectorAll('.theme-btn').forEach(btn =>
  btn.addEventListener('click', () => applyTheme(btn.dataset.themeBtn)));

/* ── início ── */
(function(){
  applyTheme('a');
  renderAccordion();
})();
