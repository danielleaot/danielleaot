/* =========================================================
   COMPONENTES — cada bloco do conteúdo vira um nó do DOM.
   Sem dependências externas. Todos os controles são
   focáveis e operáveis por teclado.
   ========================================================= */

(function (global) {
  'use strict';

  const SETA =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* Converte <termo>x</termo> em botão de glossário. */
  function marcarTermos(html) {
    return html.replace(
      /<termo>(.*?)<\/termo>/g,
      (_, termo) =>
        `<button type="button" class="verbete" data-termo="${termo.toLowerCase()}">${termo}</button>`
    );
  }

  function comando(texto) {
    if (!texto) return null;
    const p = el('p', 'legenda', texto);
    p.style.marginBottom = '1rem';
    p.style.marginTop = '0';
    return p;
  }

  const ICONES = {
    conceito: 'conceito',
    analogia: 'analogia',
    aplicacao: 'aplicacao',
    refletir: 'refletir',
    saibamais: 'saibamais',
    boaspraticas: 'boaspraticas'
  };

  /* ---------------- Renderizadores ---------------- */

  const R = {
    h2: (b) => el('h2', null, marcarTermos(b.v)),
    h3: (b) => el('h3', null, marcarTermos(b.v)),
    h4: (b) => el('h4', null, marcarTermos(b.v)),
    p: (b) => el('p', null, marcarTermos(b.v)),

    lista: (b) => {
      const lista = el(b.ordenada ? 'ol' : 'ul', 'lista');
      b.itens.forEach((i) => lista.appendChild(el('li', null, marcarTermos(i))));
      return lista;
    },

    recurso: (b) => {
      const raiz = el('div', `recurso recurso--${b.tipo}`);
      raiz.innerHTML = `
        <img class="recurso__icone" src="assets/icons/${ICONES[b.tipo]}.svg" alt="" aria-hidden="true">
        <div class="recurso__caixa">
          <span class="recurso__rotulo">${b.rotulo}</span>
          ${b.titulo ? `<h4>${b.titulo}</h4>` : ''}
          ${b.paragrafos.map((p) => `<p>${marcarTermos(p)}</p>`).join('')}
        </div>`;
      return raiz;
    },

    citacao: (b) => {
      const f = el('figure', 'citacao');
      f.innerHTML = `
        <blockquote>${b.texto}</blockquote>
        <figcaption><span>${b.autor}</span></figcaption>`;
      return f;
    },

    checklist: (b) => {
      const raiz = el('div', 'checklist');
      raiz.innerHTML = `
        ${b.titulo ? `<h4>${b.titulo}</h4>` : ''}
        <ul class="checklist__lista">${b.itens.map((i) => `<li><span>${i}</span></li>`).join('')}</ul>`;
      return raiz;
    },

    figura: (b) => {
      const f = el('figure', 'figura');
      f.innerHTML = `
        <div class="figura__titulo">${b.titulo}</div>
        <div class="figura__quadro">
          <img src="${b.src}" alt="${b.alt || b.titulo}">
          <button type="button" class="figura__zoom" data-ampliar="${b.src}" data-legenda="${b.alt || b.titulo}" aria-label="Ampliar ${b.titulo}">
            <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" aria-hidden="true">
              <circle cx="42" cy="42" r="24"/><path d="M60 60l22 22M32 42h20M42 32v20"/>
            </svg>
          </button>
        </div>
        <figcaption class="legenda">${b.legenda}</figcaption>`;
      return f;
    },

    video: (b) => {
      const raiz = el('div', 'video');
      const c = comando(b.comando);
      if (c) raiz.appendChild(c);
      const quadro = el('div', 'video__quadro');
      quadro.innerHTML = `
        <img src="${b.poster}" alt="" aria-hidden="true">
        <button type="button" class="video__play" aria-label="Reproduzir videoaula"></button>`;
      // Sem URL definida, o player permanece como marcador de posição.
      quadro.querySelector('.video__play').addEventListener('click', () => {
        if (!b.src) {
          quadro.insertAdjacentHTML(
            'beforeend',
            '<p class="legenda" style="position:absolute;bottom:12px;left:16px;color:#fff;border-color:#fff">Vídeo não vinculado neste protótipo.</p>'
          );
          return;
        }
        quadro.innerHTML = `<iframe src="${b.src}" title="Videoaula" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>`;
      });
      raiz.appendChild(quadro);
      return raiz;
    },

    carrossel: (b) => {
      const raiz = el('div', 'carrossel');
      raiz.innerHTML = `
        ${b.comando ? `<p class="legenda" style="margin:0 0 16px">${b.comando}</p>` : ''}
        <div class="carrossel__palco">
          <button type="button" class="carrossel__btn" data-passo="-1" aria-label="Cartão anterior" style="transform:scaleX(-1)">${SETA}</button>
          <div class="carrossel__slides">
            ${b.slides
              .map(
                (s, i) => `
              <div class="carrossel__slide${i === 0 ? ' ativo' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} de ${b.slides.length}">
                <img src="${s.img}" alt="${s.titulo}">
                <h4>${s.titulo}</h4>
                <p>${s.texto}</p>
              </div>`
              )
              .join('')}
          </div>
          <button type="button" class="carrossel__btn" data-passo="1" aria-label="Próximo cartão">${SETA}</button>
        </div>
        <div class="carrossel__indicadores">
          ${b.slides
            .map(
              (_, i) =>
                `<button type="button" class="carrossel__ponto" data-ir="${i}" aria-current="${i === 0}" aria-label="Ir ao cartão ${i + 1}"></button>`
            )
            .join('')}
        </div>`;

      const slides = raiz.querySelectorAll('.carrossel__slide');
      const pontos = raiz.querySelectorAll('.carrossel__ponto');
      let atual = 0;

      const mostrar = (i) => {
        atual = (i + slides.length) % slides.length;
        slides.forEach((s, k) => s.classList.toggle('ativo', k === atual));
        pontos.forEach((p, k) => p.setAttribute('aria-current', String(k === atual)));
      };

      raiz.querySelectorAll('[data-passo]').forEach((btn) =>
        btn.addEventListener('click', () => mostrar(atual + Number(btn.dataset.passo)))
      );
      pontos.forEach((p) => p.addEventListener('click', () => mostrar(Number(p.dataset.ir))));

      return raiz;
    },

    sanfona: (b) => {
      const raiz = el('div', 'sanfona');
      if (b.comando) raiz.appendChild(comando(b.comando));

      b.itens.forEach((item, i) => {
        const id = `sanfona-${Math.random().toString(36).slice(2, 8)}-${i}`;
        const bloco = el('div', 'sanfona__item');
        bloco.innerHTML = `
          <button type="button" class="sanfona__botao" aria-expanded="false" aria-controls="${id}">
            <span>${item.titulo}</span>
            <span class="sanfona__sinal" aria-hidden="true">+</span>
          </button>
          <div class="sanfona__painel" id="${id}" data-aberto="false" role="region">
            <div><div class="sanfona__conteudo">${item.conteudo.map((p) => `<p>${marcarTermos(p)}</p>`).join('')}</div></div>
          </div>`;

        const botao = bloco.querySelector('.sanfona__botao');
        const painel = bloco.querySelector('.sanfona__painel');

        botao.addEventListener('click', () => {
          const abrindo = botao.getAttribute('aria-expanded') === 'false';
          // Abertura independente: mais de um item pode ficar aberto.
          botao.setAttribute('aria-expanded', String(abrindo));
          painel.dataset.aberto = String(abrindo);
          bloco.toggleAttribute('open', abrindo);
        });

        raiz.appendChild(bloco);
      });
      return raiz;
    },

    cartas: (b) => {
      const raiz = el('div');
      if (b.comando) raiz.appendChild(comando(b.comando));
      const grade = el('div', 'cartas');

      b.itens.forEach((item) => {
        const carta = el('button', 'carta');
        carta.type = 'button';
        carta.setAttribute('aria-pressed', 'false');
        carta.setAttribute('aria-label', `Carta ${item.titulo}. Ativar para ver a definição.`);
        carta.innerHTML = `
          <span class="carta__face"><img src="${item.img}" alt=""></span>
          <span class="carta__face carta__verso"><span><strong>${item.titulo}</strong>${item.texto}</span></span>`;
        carta.addEventListener('click', () =>
          carta.setAttribute('aria-pressed', String(carta.getAttribute('aria-pressed') === 'false'))
        );
        grade.appendChild(carta);
      });

      raiz.appendChild(grade);
      return raiz;
    },

    abas: (b) => {
      const raiz = el('div', 'abas');
      if (b.comando) raiz.appendChild(comando(b.comando));

      const barra = el('div', 'abas__botoes');
      barra.setAttribute('role', 'tablist');
      const paineis = el('div');

      b.itens.forEach((item, i) => {
        const idB = `aba-b-${i}-${Math.random().toString(36).slice(2, 6)}`;
        const idP = `aba-p-${i}-${Math.random().toString(36).slice(2, 6)}`;

        const botao = el('button', 'abas__botao', item.rotulo);
        botao.type = 'button';
        botao.id = idB;
        botao.setAttribute('role', 'tab');
        botao.setAttribute('aria-controls', idP);
        botao.setAttribute('aria-selected', String(i === 0));
        botao.tabIndex = i === 0 ? 0 : -1;

        const painel = el('div', 'abas__painel');
        painel.id = idP;
        painel.setAttribute('role', 'tabpanel');
        painel.setAttribute('aria-labelledby', idB);
        painel.hidden = i !== 0;
        painel.innerHTML = `<h4>${item.titulo}</h4>${item.conteudo.map((p) => `<p>${p}</p>`).join('')}`;

        botao.addEventListener('click', () => {
          barra.querySelectorAll('.abas__botao').forEach((x) => {
            x.setAttribute('aria-selected', 'false');
            x.tabIndex = -1;
          });
          paineis.querySelectorAll('.abas__painel').forEach((x) => (x.hidden = true));
          botao.setAttribute('aria-selected', 'true');
          botao.tabIndex = 0;
          painel.hidden = false;
        });

        barra.appendChild(botao);
        paineis.appendChild(painel);
      });

      // Navegação por setas, conforme padrão WAI-ARIA de abas.
      barra.addEventListener('keydown', (e) => {
        const botoes = [...barra.querySelectorAll('.abas__botao')];
        const i = botoes.indexOf(document.activeElement);
        if (i < 0) return;
        let alvo = null;
        if (e.key === 'ArrowRight') alvo = botoes[(i + 1) % botoes.length];
        if (e.key === 'ArrowLeft') alvo = botoes[(i - 1 + botoes.length) % botoes.length];
        if (alvo) {
          e.preventDefault();
          alvo.focus();
          alvo.click();
        }
      });

      raiz.appendChild(barra);
      raiz.appendChild(paineis);
      return raiz;
    },

    etapas: (b) => {
      const raiz = el('div', 'etapas');
      if (b.comando) raiz.appendChild(comando(b.comando));

      const faixa = el('div', 'etapas__faixa');
      const painel = el('div', 'etapas__painel');

      b.itens.forEach((item, i) => {
        const botao = el('button', 'etapas__btn');
        botao.type = 'button';
        botao.setAttribute('aria-current', String(i === 0));
        botao.innerHTML = `<img src="${item.img}" alt="${item.titulo}">`;

        const conteudo = el('div', null, `<h4>${item.titulo}</h4><p>${item.texto}</p>`);
        conteudo.hidden = i !== 0;

        botao.addEventListener('click', () => {
          faixa.querySelectorAll('.etapas__btn').forEach((x) => x.setAttribute('aria-current', 'false'));
          painel.querySelectorAll(':scope > div').forEach((x) => (x.hidden = true));
          botao.setAttribute('aria-current', 'true');
          conteudo.hidden = false;
        });

        faixa.appendChild(botao);
        painel.appendChild(conteudo);
      });

      raiz.appendChild(faixa);
      raiz.appendChild(painel);
      return raiz;
    },

    comparador: (b) => {
      const raiz = el('div', 'comparador');
      if (b.comando) raiz.appendChild(comando(b.comando));

      const quadro = el('div', 'comparador__quadro');
      quadro.innerHTML = `
        <img src="${b.antes}" alt="Cenário anterior">
        <div class="comparador__depois"><img src="${b.depois}" alt="Cenário posterior"></div>
        <div class="comparador__alca" role="presentation"></div>`;

      // Controle acessível equivalente à alça: um range operável por teclado.
      const intervalo = el('input', 'comparador__intervalo');
      intervalo.type = 'range';
      intervalo.min = 0;
      intervalo.max = 100;
      intervalo.value = 50;
      intervalo.setAttribute('aria-label', 'Posição da comparação entre antes e depois');

      const depois = quadro.querySelector('.comparador__depois');
      const alca = quadro.querySelector('.comparador__alca');
      const imgDepois = depois.querySelector('img');

      const aplicar = (pct) => {
        const p = Math.min(100, Math.max(0, pct));
        depois.style.width = p + '%';
        alca.style.left = p + '%';
        imgDepois.style.width = quadro.clientWidth + 'px';
        intervalo.value = p;
      };

      let arrastando = false;
      const posicionar = (clientX) => {
        const r = quadro.getBoundingClientRect();
        aplicar(((clientX - r.left) / r.width) * 100);
      };

      alca.addEventListener('pointerdown', (e) => {
        arrastando = true;
        alca.setPointerCapture(e.pointerId);
      });
      alca.addEventListener('pointermove', (e) => arrastando && posicionar(e.clientX));
      alca.addEventListener('pointerup', () => (arrastando = false));
      quadro.addEventListener('click', (e) => posicionar(e.clientX));
      intervalo.addEventListener('input', () => aplicar(Number(intervalo.value)));
      window.addEventListener('resize', () => aplicar(Number(intervalo.value)));

      raiz.appendChild(quadro);
      raiz.appendChild(intervalo);
      if (b.legenda) raiz.appendChild(el('p', 'legenda', b.legenda));

      // A largura da imagem sobreposta depende do quadro já renderizado.
      requestAnimationFrame(() => aplicar(50));
      return raiz;
    },

    passos: (b) => {
      const raiz = el('div', 'passos');
      const total = b.itens.length;
      raiz.innerHTML = `
        <div class="passos__barra"><i style="width:${100 / total}%"></i></div>
        ${b.comando ? `<p class="legenda" style="margin:0 0 16px">${b.comando}</p>` : ''}
        <div class="passos__texto">
          ${b.itens.map((p, i) => `<div${i ? ' hidden' : ''}><p>${p}</p></div>`).join('')}
        </div>
        <div class="passos__controles">
          <button type="button" class="btn-nav" data-passo="-1" disabled>
            <span style="transform:scaleX(-1);display:flex">${SETA}</span> Anterior
          </button>
          <button type="button" class="btn-nav" data-passo="1">Próximo ${SETA}</button>
        </div>`;

      const textos = raiz.querySelectorAll('.passos__texto > div');
      const barra = raiz.querySelector('.passos__barra i');
      const [prev, next] = raiz.querySelectorAll('[data-passo]');
      let i = 0;

      const ir = (delta) => {
        i = Math.min(total - 1, Math.max(0, i + delta));
        textos.forEach((t, k) => (t.hidden = k !== i));
        barra.style.width = ((i + 1) / total) * 100 + '%';
        prev.disabled = i === 0;
        next.disabled = i === total - 1;
      };

      prev.addEventListener('click', () => ir(-1));
      next.addEventListener('click', () => ir(1));
      return raiz;
    },

    sintese: (b) => {
      const raiz = el('div', 'sintese');
      raiz.innerHTML = `
        <h3>${b.titulo}</h3>
        ${b.paragrafos.map((p) => `<p>${marcarTermos(p)}</p>`).join('')}`;
      return raiz;
    },

    refs: (b) => {
      const lista = el('ul', 'referencias');
      b.itens.forEach((i) => lista.appendChild(el('li', null, i)));
      return lista;
    }
  };

  global.Componentes = {
    render(bloco) {
      const fn = R[bloco.t];
      if (!fn) {
        console.warn('Bloco desconhecido:', bloco.t);
        return el('div');
      }
      return fn(bloco);
    }
  };
})(window);
