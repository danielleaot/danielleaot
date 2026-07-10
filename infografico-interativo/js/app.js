/* app.js — Panorama Digital: renderização dos blocos + modal de detalhe */

function renderCard(c){
  const spanClass = c.span.split(' ').join(' ');
  let inner = '';

  if (c.kind === 'hero'){
    inner = `
      <div class="card-icon">${ICONS[c.icon]}</div>
      <span class="card-tag">${c.tag}</span>
      <div class="card-stat">${c.stat}</div>
      <p class="card-title">${c.title}</p>`;
  } else if (c.kind === 'stat'){
    inner = `
      <div class="card-icon">${ICONS[c.icon]}</div>
      <span class="card-tag">${c.tag}</span>
      <div class="card-stat sm">${c.stat}</div>
      <p class="card-title sm">${c.title}</p>`;
  } else if (c.kind === 'timeline'){
    inner = `
      <div class="card-icon">${ICONS[c.icon]}</div>
      <span class="card-tag">${c.tag}</span>
      <p class="card-title">${c.title}</p>
      <div class="mini-steps">
        ${c.steps.map((s,i)=>`<span class="mini-step"><b>${i+1}</b>${s}</span>`).join('')}
      </div>`;
  } else if (c.kind === 'compare'){
    inner = `
      <div class="card-icon">${ICONS[c.icon]}</div>
      <span class="card-tag">${c.tag}</span>
      <p class="card-title">${c.title}</p>
      <div class="mini-compare">
        <div><span class="mc-label">${c.left.label}</span><span class="mc-val">${c.left.value}</span></div>
        <div><span class="mc-label">${c.right.label}</span><span class="mc-val">${c.right.value}</span></div>
      </div>`;
  } else if (c.kind === 'ranking'){
    inner = `
      <div class="card-icon">${ICONS[c.icon]}</div>
      <span class="card-tag">${c.tag}</span>
      <p class="card-title">${c.title}</p>
      <ol class="mini-rank">
        ${c.items.map(i=>`<li>${i}</li>`).join('')}
      </ol>`;
  } else if (c.kind === 'quote'){
    inner = `
      <div class="card-icon">${ICONS[c.icon]}</div>
      <span class="card-tag">${c.tag}</span>
      <p class="card-quote">${c.quote}</p>`;
  } else if (c.kind === 'cta'){
    inner = `
      <div class="card-icon">${ICONS[c.icon]}</div>
      <span class="card-tag">${c.tag}</span>
      <p class="card-title">${c.title}</p>
      <span class="card-cta">Abrir detalhes →</span>`;
  }

  return `<button class="card ${spanClass} c-${c.color} k-${c.kind}" data-id="${c.id}" aria-haspopup="dialog" aria-label="${(c.title || c.quote || c.tag)} — abrir detalhes">${inner}</button>`;
}

function buildBento(){
  const bento = document.getElementById('bento');
  bento.innerHTML = CARDS.map(renderCard).join('');
  bento.querySelectorAll('.card').forEach(btn =>
    btn.addEventListener('click', () => openModal(btn.dataset.id)));
}

function modalBodyFor(c){
  let extra = '';
  if (c.kind === 'timeline'){
    extra = `<div class="modal-steps">${c.steps.map((s,i)=>`<div class="modal-step"><span>${String(i+1).padStart(2,'0')}</span><p>${s}</p></div>`).join('')}</div>`;
  } else if (c.kind === 'compare'){
    extra = `<div class="modal-compare">
      <div><h4>${c.left.label}</h4><p>${c.left.value}</p></div>
      <div><h4>${c.right.label}</h4><p>${c.right.value}</p></div>
    </div>`;
  } else if (c.kind === 'ranking'){
    extra = `<ol class="modal-rank">${c.items.map(i=>`<li>${i}</li>`).join('')}</ol>`;
  } else if (c.kind === 'quote'){
    extra = `<p class="modal-quote">“${c.quote}”</p>`;
  } else if (c.stat){
    extra = `<div class="modal-stat">${c.stat}</div>`;
  }
  const paras = c.modalParas.map(p => `<p>${p}</p>`).join('');
  return extra + paras;
}

let lastTrigger = null;
function openModal(id){
  const c = CARDS.find(x => x.id === id);
  if (!c) return;
  lastTrigger = document.querySelector(`.card[data-id="${id}"]`);
  document.getElementById('modal').className = 'modal c-' + c.color;
  document.getElementById('modalIcon').innerHTML = ICONS[c.icon];
  document.getElementById('modalTag').textContent = c.tag;
  document.getElementById('modalTitle').textContent = c.title || c.quote || c.tag;
  document.getElementById('modalBody').innerHTML = modalBodyFor(c);
  const overlay = document.getElementById('modalOverlay');
  overlay.hidden = false;
  requestAnimationFrame(() => {
    overlay.classList.add('on');
    document.getElementById('modalClose').focus();
  });
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('on');
  document.body.style.overflow = '';
  setTimeout(() => { overlay.hidden = true; }, 200);
  if (lastTrigger) lastTrigger.focus();
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target.id === 'modalOverlay') closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab' && !document.getElementById('modalOverlay').hidden){
    const focusables = document.getElementById('modal').querySelectorAll('button, a, [tabindex]');
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
});

buildBento();
