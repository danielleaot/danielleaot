/* app.js — Danielle Tabosa · Portfólio (interatividade) */

/* ── tema claro/escuro ── */
const THEME_KEY = 'dani-portfolio-theme';
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('iconSun').hidden = theme === 'dark';
  document.getElementById('iconMoon').hidden = theme !== 'dark';
  localStorage.setItem(THEME_KEY, theme);
}
(function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
})();
document.getElementById('themeToggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ── menu mobile ── */
const burger = document.getElementById('navBurger');
const panel = document.getElementById('mobilePanel');
function closeMobile(){
  burger.classList.remove('on'); burger.setAttribute('aria-expanded', 'false');
  panel.classList.remove('on');
}
burger.addEventListener('click', () => {
  const isOn = burger.classList.toggle('on');
  burger.setAttribute('aria-expanded', String(isOn));
  panel.classList.toggle('on', isOn);
});
panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

/* ── scroll-spy (destaca o link da seção visível) ── */
const navLinks = document.querySelectorAll('[data-nav]');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
function updateActiveNav(){
  let current = sections[0];
  const y = window.scrollY + 120;
  sections.forEach(sec => { if (sec.offsetTop <= y) current = sec; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ── reveal on scroll ── */
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── copiar e-mail ── */
const copyBtn = document.getElementById('copyEmail');
const copyLabel = document.getElementById('copyEmailLabel');
copyBtn.addEventListener('click', async () => {
  const email = copyBtn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
  } catch (e) {
    // fallback silencioso: navegador sem permissão de clipboard
  }
  const original = copyLabel.textContent;
  copyLabel.textContent = 'E-mail copiado ✓';
  setTimeout(() => { copyLabel.textContent = original; }, 1800);
});

/* ── voltar ao topo ── */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 600);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── carrossel de projetos ── */
(function initCasesCarousel(){
  const track = document.getElementById('casesTrack');
  if (!track) return;
  const viewport = document.getElementById('casesViewport');
  const slides = Array.from(track.children);
  const tabsWrap = document.getElementById('casesTabs');
  const prevBtn = document.getElementById('casesPrev');
  const nextBtn = document.getElementById('casesNext');
  const carouselEl = track.closest('.carousel');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const AUTOPLAY_MS = 5500;
  let i = 0;
  let timer = null;
  let progressStart = null;
  let progressRAF = null;
  let syncingFromScroll = false;

  tabsWrap.innerHTML = slides.map((_, idx) => `
    <button type="button" class="tab-item" data-i="${idx}" aria-label="Ir para o projeto ${idx + 1}">
      <span class="tab-num">${String(idx + 1).padStart(2, '0')}</span>
      <span class="tab-track"><span class="tab-fill"></span></span>
    </button>`).join('');
  const tabs = Array.from(tabsWrap.children);

  function updateActive(){
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    tabs.forEach((t, idx) => t.classList.toggle('on', idx === i));
  }
  function go(idx){
    i = (idx + slides.length) % slides.length;
    syncingFromScroll = true;
    viewport.scrollTo({ left: slides[i].offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
    updateActive();
    resetProgress();
    setTimeout(() => { syncingFromScroll = false; }, 500);
  }

  function resetProgress(){
    tabs.forEach(t => { t.querySelector('.tab-fill').style.width = '0%'; });
    if (progressRAF) cancelAnimationFrame(progressRAF);
    progressStart = null;
  }
  function stepProgress(ts){
    if (reduceMotion || !timer) return;
    if (progressStart === null) progressStart = ts;
    const pct = Math.min(100, ((ts - progressStart) / AUTOPLAY_MS) * 100);
    const fill = tabs[i]?.querySelector('.tab-fill');
    if (fill) fill.style.width = pct + '%';
    if (pct < 100) progressRAF = requestAnimationFrame(stepProgress);
  }

  function startAutoplay(){
    if (reduceMotion || slides.length < 2) return;
    stopAutoplay();
    resetProgress();
    progressRAF = requestAnimationFrame(stepProgress);
    timer = setInterval(() => go(i + 1), AUTOPLAY_MS);
  }
  function stopAutoplay(){
    if (timer){ clearInterval(timer); timer = null; }
    if (progressRAF){ cancelAnimationFrame(progressRAF); progressRAF = null; }
  }
  function userInteracted(action){
    stopAutoplay();
    action();
    startAutoplay();
  }

  prevBtn.addEventListener('click', () => userInteracted(() => go(i - 1)));
  nextBtn.addEventListener('click', () => userInteracted(() => go(i + 1)));
  tabs.forEach((t, idx) => t.addEventListener('click', () => userInteracted(() => go(idx))));

  carouselEl.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') userInteracted(() => go(i + 1));
    if (e.key === 'ArrowLeft') userInteracted(() => go(i - 1));
  });

  carouselEl.addEventListener('mouseenter', stopAutoplay);
  carouselEl.addEventListener('mouseleave', startAutoplay);
  carouselEl.addEventListener('focusin', stopAutoplay);
  carouselEl.addEventListener('focusout', startAutoplay);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay(); else startAutoplay();
  });

  // detecta arrasto/swipe manual (touch, trackpad, scrollbar) e sincroniza as abas
  let scrollTimeout = null;
  viewport.addEventListener('scroll', () => {
    if (syncingFromScroll) return;
    stopAutoplay();
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const center = viewport.scrollLeft + viewport.clientWidth / 2;
      let closest = 0, closestDist = Infinity;
      slides.forEach((s, idx) => {
        const dist = Math.abs((s.offsetLeft + s.offsetWidth / 2) - center);
        if (dist < closestDist){ closestDist = dist; closest = idx; }
      });
      i = closest;
      updateActive();
      startAutoplay();
    }, 120);
  }, { passive: true });

  window.addEventListener('resize', () => go(i));

  updateActive();
  startAutoplay();
})();
