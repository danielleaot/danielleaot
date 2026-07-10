/* content.js — Flashcards: dados dos baralhos (conteúdo placeholder) */

const LOREM = ("lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod "
  + "tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam "
  + "quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo "
  + "consequat duis aute irure in reprehenderit voluptate velit esse cillum "
  + "eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident "
  + "sunt culpa qui officia deserunt mollit anim id est laborum").split(" ");
let seed = 21;
function rnd(){ seed = (seed*16807) % 2147483647; return (seed-1)/2147483646; }
function word(){ return LOREM[Math.floor(rnd()*LOREM.length)]; }
function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
function sentence(n){ const w=[]; for(let i=0;i<n;i++) w.push(word()); w[0]=cap(w[0]); return w.join(' ')+'.'; }
function phrase(n){ const w=[]; for(let i=0;i<n;i++) w.push(word()); return cap(w.join(' ')); }

function buildDeck(n){
  const cards = [];
  for (let i = 0; i < n; i++){
    cards.push({ front: phrase(4) + '?', back: sentence(10) });
  }
  return cards;
}

const DECKS = [
  { id: 'd1', title: 'Fundamentos', emoji: '🧠', color: 'mint', cards: buildDeck(8) },
  { id: 'd2', title: 'Conceitos Avançados', emoji: '⚙️', color: 'coral', cards: buildDeck(8) },
  { id: 'd3', title: 'Revisão Geral', emoji: '📚', color: 'violet', cards: buildDeck(8) },
];
