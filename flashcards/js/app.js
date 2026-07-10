/* app.js — Flashcards: navegação e interação */

const state = { deck: null, order: [], i: 0, flipped: false, known: new Set(), unknown: new Set() };

function shuffle(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeckPicker(){
  const wrap = document.getElementById('deckPicker');
  wrap.innerHTML = DECKS.map(d => `
    <button class="deck-card c-${d.color}" data-deck="${d.id}" type="button">
      <span class="deck-emoji">${d.emoji}</span>
      <strong>${d.title}</strong>
      <span>${d.cards.length} cartões</span>
    </button>`).join('');
  wrap.querySelectorAll('.deck-card').forEach(btn =>
    btn.addEventListener('click', () => startDeck(btn.dataset.deck)));
}

function startDeck(id){
  const deck = DECKS.find(d => d.id === id);
  state.deck = deck;
  state.order = deck.cards.map((_, i) => i);
  state.i = 0;
  state.flipped = false;
  state.known = new Set();
  state.unknown = new Set();
  show('screenStudy');
  renderCard();
}

function currentCard(){
  return state.deck.cards[state.order[state.i]];
}

function renderCard(){
  const card = currentCard();
  document.getElementById('frontText').textContent = card.front;
  document.getElementById('backText').textContent = card.back;
  state.flipped = false;
  document.getElementById('flashcardInner').classList.remove('flipped');
  document.getElementById('assessRow').hidden = true;
  document.getElementById('flipHint').hidden = false;
  document.getElementById('progressLabel').textContent = `${state.i + 1} / ${state.order.length}`;
  document.getElementById('progressFill').style.width = ((state.i) / state.order.length * 100) + '%';
  document.getElementById('prevBtn').disabled = state.i === 0;
}

function flipCard(){
  state.flipped = !state.flipped;
  document.getElementById('flashcardInner').classList.toggle('flipped', state.flipped);
  document.getElementById('assessRow').hidden = !state.flipped;
  document.getElementById('flipHint').hidden = state.flipped;
}

function assess(knewIt){
  const idx = state.order[state.i];
  (knewIt ? state.known : state.unknown).add(idx);
  goNext();
}

function goNext(){
  if (state.i < state.order.length - 1){
    state.i++;
    renderCard();
  } else {
    document.getElementById('progressFill').style.width = '100%';
    finishDeck();
  }
}
function goPrev(){
  if (state.i > 0){
    state.i--;
    renderCard();
  }
}

function finishDeck(){
  document.getElementById('sumKnow').textContent = state.known.size;
  document.getElementById('sumDontKnow').textContent = state.unknown.size + (state.order.length - state.known.size - state.unknown.size);
  show('screenSummary');
}

function show(id){
  ['screenIntro', 'screenStudy', 'screenSummary'].forEach(s => {
    document.getElementById(s).hidden = s !== id;
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('flashcard').addEventListener('click', flipCard);
document.getElementById('flashcard').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); flipCard(); }
});
document.getElementById('knowBtn').addEventListener('click', () => assess(true));
document.getElementById('dontKnowBtn').addEventListener('click', () => assess(false));
document.getElementById('nextBtn').addEventListener('click', goNext);
document.getElementById('prevBtn').addEventListener('click', goPrev);
document.getElementById('backBtn').addEventListener('click', () => show('screenIntro'));
document.getElementById('shuffleBtn').addEventListener('click', () => {
  state.order = shuffle(state.order);
  state.i = 0;
  renderCard();
});
document.getElementById('restartBtn').addEventListener('click', () => startDeck(state.deck.id));
document.getElementById('otherDeckBtn').addEventListener('click', () => show('screenIntro'));

document.addEventListener('keydown', e => {
  if (document.getElementById('screenStudy').hidden) return;
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft') goPrev();
});

buildDeckPicker();
