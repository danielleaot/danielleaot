/* =========================================================
   APP — casca do módulo: trilha lateral, roteamento por hash,
   progresso de leitura, modais (imagem e glossário).
   ========================================================= */

(function () {
  'use strict';

  const curso = window.CURSO;
  const unidades = curso.unidades;

  const trilha = document.getElementById('trilha');
  const nav = document.getElementById('trilha-nav');
  const palco = document.getElementById('palco');
  const cortina = document.getElementById('cortina');
  const modalImg = document.getElementById('modal-imagem');
  const modalTermo = document.getElementById('modal-termo');

  let atual = 0;

  /* ---------- Trilha lateral ---------- */

  unidades.forEach((u, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'trilha__item';
    b.dataset.i = i;
    b.setAttribute('aria-current', 'false');
    b.innerHTML = `
      <span class="trilha__num">${u.num}</span>
      <span class="trilha__rot">${u.rotulo}</span>`;
    b.addEventListener('click', () => {
      location.hash = u.id;
      if (window.matchMedia('(max-width: 900px)').matches) fecharTrilha();
    });
    nav.appendChild(b);
  });

  const abrirTrilha = () => {
    trilha.classList.add('aberta');
    if (window.matchMedia('(max-width: 900px)').matches) cortina.classList.add('ativa');
  };
  const fecharTrilha = () => {
    trilha.classList.remove('aberta');
    cortina.classList.remove('ativa');
  };

  document.getElementById('trilha-toggle').addEventListener('click', () => {
    trilha.classList.contains('aberta') ? fecharTrilha() : abrirTrilha();
  });
  document.getElementById('hamburguer').addEventListener('click', abrirTrilha);
  cortina.addEventListener('click', fecharTrilha);

  /* ---------- Renderização da unidade ---------- */

  function renderizar(i) {
    atual = i;
    const u = unidades[i];

    palco.innerHTML = `
      <header class="capa">
        <img class="capa__arte" src="assets/img/hero.svg" alt="" aria-hidden="true">
        <div class="capa__conteudo">
          <p class="eyebrow">${curso.modulo} · ${u.num} / ${String(unidades.length - 1).padStart(2, '0')}</p>
          <h1>${u.titulo}</h1>
          <p class="capa__linha">${u.chamada}</p>
          <div class="capa__meta">${curso.tags.map((t) => `<span class="capa__tag">${t}</span>`).join('')}</div>
        </div>
      </header>

      <main id="conteudo" class="container" tabindex="-1" style="padding-top:3rem">
        <div class="espinha" aria-hidden="true"><span class="espinha__preenchimento"></span></div>
      </main>

      <footer class="rodape">
        <div class="rodape__interno">
          <div class="rodape__barra"><i id="barra-modulo"></i></div>
          <p class="rodape__legenda" id="legenda-modulo"></p>
          <div class="rodape__paginacao">
            <button type="button" class="btn-nav" id="anterior">
              <span style="transform:scaleX(-1);display:flex"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>
              Anterior
            </button>
            <button type="button" class="btn-nav" id="proximo">
              Próximo
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
            </button>
          </div>
          <p class="rodape__creditos">${curso.marca} · ${curso.titulo} · Conteúdo de preenchimento (lorem ipsum) para validação de layout.</p>
        </div>
      </footer>`;

    const main = palco.querySelector('#conteudo');
    u.blocos.forEach((b) => main.appendChild(window.Componentes.render(b)));

    // Estado da trilha
    nav.querySelectorAll('.trilha__item').forEach((b, k) =>
      b.setAttribute('aria-current', String(k === i))
    );

    // Rodapé
    const barra = document.getElementById('barra-modulo');
    const legenda = document.getElementById('legenda-modulo');
    const pct = Math.round(((i + 1) / unidades.length) * 100);
    requestAnimationFrame(() => (barra.style.width = pct + '%'));
    legenda.textContent = `${u.rotulo} — seção ${i + 1} de ${unidades.length} (${pct}% do módulo)`;

    const prev = document.getElementById('anterior');
    const next = document.getElementById('proximo');
    prev.disabled = i === 0;
    next.disabled = i === unidades.length - 1;
    prev.addEventListener('click', () => (location.hash = unidades[i - 1].id));
    next.addEventListener('click', () => (location.hash = unidades[i + 1].id));

    document.title = `${u.titulo} · ${curso.titulo}`;
    window.scrollTo({ top: 0 });
    main.focus({ preventScroll: true });

    ligarEspinha(main);
  }

  /* ---------- Espinha: progresso de leitura da unidade ---------- */

  let atualizarEspinha = null;

  function ligarEspinha(main) {
    const preench = main.querySelector('.espinha__preenchimento');

    // Um único par de listeners para toda a sessão: a função é
    // reapontada a cada troca de unidade, sem acumular handlers.
    atualizarEspinha = () => {
      const r = main.getBoundingClientRect();
      const lido = Math.min(Math.max(window.innerHeight * 0.5 - r.top, 0), r.height);
      preench.style.height = (lido / r.height) * 100 + '%';
    };
    atualizarEspinha();
  }

  const aoRolar = () => atualizarEspinha && atualizarEspinha();
  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRolar);

  /* ---------- Modais ---------- */

  function abrirModal(modal) {
    modal.classList.add('ativo');
    modal.querySelector('.modal__fechar').focus();
    document.body.style.overflow = 'hidden';
  }

  function fecharModais() {
    [modalImg, modalTermo].forEach((m) => m.classList.remove('ativo'));
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.modal').forEach((m) => {
    m.addEventListener('click', (e) => {
      if (e.target === m || e.target.closest('.modal__fechar')) fecharModais();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fecharModais();
      if (window.matchMedia('(max-width: 900px)').matches) fecharTrilha();
    }
  });

  // Delegação: ampliação de figuras e verbetes de glossário.
  document.addEventListener('click', (e) => {
    const zoom = e.target.closest('[data-ampliar]');
    if (zoom) {
      const img = modalImg.querySelector('img');
      img.src = zoom.dataset.ampliar;
      img.alt = zoom.dataset.legenda || 'Figura ampliada';
      abrirModal(modalImg);
      return;
    }

    const verbete = e.target.closest('.verbete');
    if (verbete) {
      const chave = verbete.dataset.termo;
      const def = curso.glossario[chave];
      if (!def) return;
      modalTermo.querySelector('.modal__termo').textContent = verbete.textContent.replace('+', '');
      modalTermo.querySelector('.modal__texto').innerHTML = def;
      abrirModal(modalTermo);
    }
  });

  /* ---------- Roteamento ---------- */

  function rotear() {
    const id = location.hash.replace('#', '');
    const i = Math.max(0, unidades.findIndex((u) => u.id === id));
    renderizar(i);
  }

  window.addEventListener('hashchange', rotear);
  rotear();

  // Navegação por teclado entre unidades (Alt + setas).
  document.addEventListener('keydown', (e) => {
    if (!e.altKey) return;
    if (e.key === 'ArrowRight' && atual < unidades.length - 1) location.hash = unidades[atual + 1].id;
    if (e.key === 'ArrowLeft' && atual > 0) location.hash = unidades[atual - 1].id;
  });
})();
