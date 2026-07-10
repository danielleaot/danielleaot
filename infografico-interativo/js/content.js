/* content.js — Panorama Digital: dados dos blocos do bento grid (conteúdo placeholder) */

const LOREM = ("lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod "
  + "tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam "
  + "quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo "
  + "consequat duis aute irure in reprehenderit voluptate velit esse cillum "
  + "eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident "
  + "sunt culpa qui officia deserunt mollit anim id est laborum").split(" ");
let seed = 11;
function rnd(){ seed = (seed*16807) % 2147483647; return (seed-1)/2147483646; }
function word(){ return LOREM[Math.floor(rnd()*LOREM.length)]; }
function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
function sentence(n){ const w=[]; for(let i=0;i<n;i++) w.push(word()); w[0]=cap(w[0]); return w.join(' ')+'.'; }
function paragraph(nSent, wRange){
  const out=[]; for(let i=0;i<nSent;i++) out.push(sentence(wRange[0]+Math.floor(rnd()*(wRange[1]-wRange[0]))));
  return out.join(' ');
}

/* ── ícones (SVG próprios, estilo geométrico/linear, usam currentColor) ── */
const ICONS = {
  pulse: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 12h4l2-7 4 14 2-7h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M2 16l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cluster: `<svg viewBox="0 0 24 24" fill="none"><circle cx="7" cy="8" r="3" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="8" r="3" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="17" r="3" stroke="currentColor" stroke-width="2"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M15 9l-2 6-4 2 2-6 4-2Z" fill="currentColor"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 8c-2 0-3.5 1.6-3.5 4S5 16 7 16c0-3 1-5 3-6V8H7Zm10 0c-2 0-3.5 1.6-3.5 4s1.5 4 3.5 4c0-3 1-5 3-6V8h-3Z" fill="currentColor"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 17c-2 0-3-1-3-3l3-1 1 3-1 1Z" fill="currentColor"/><path d="M12 3c3 1 6 4 6 8 0 4-3 7-6 9-3-2-6-5-6-9 0-4 3-7 6-8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="10" r="2" stroke="currentColor" stroke-width="2"/></svg>`,
  bars: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 17 17 6M17 6H8M17 6v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/* ── conteúdo dos blocos ── */
const CARDS = [
  {
    id: 'c1', span: 'w2 h1', kind: 'hero', color: 'primary', icon: 'pulse', tag: 'Indicador principal',
    stat: '73%', title: 'Lorem ipsum dolor sit amet consectetur',
    modalParas: [paragraph(3, [10,16]), paragraph(2, [9,14])],
  },
  {
    id: 'c2', span: 'w1 h1', kind: 'stat', color: 'secondary', icon: 'cluster', tag: 'Categoria A',
    stat: '×2.4', title: sentence(4),
    modalParas: [paragraph(3, [9,15])],
  },
  {
    id: 'c3', span: 'w1 h1', kind: 'stat', color: 'lime', icon: 'grid', tag: 'Categoria B',
    stat: '18%', title: sentence(4),
    modalParas: [paragraph(3, [9,15])],
  },
  {
    id: 'c4', span: 'w1 h1', kind: 'stat', color: 'orange', icon: 'layers', tag: 'Categoria C',
    stat: '4.1k', title: sentence(4),
    modalParas: [paragraph(3, [9,15])],
  },
  {
    id: 'c5', span: 'w2 h1', kind: 'timeline', color: 'primary', icon: 'compass', tag: 'Linha do tempo',
    title: 'Consectetur adipiscing elit sed do',
    steps: [sentence(3), sentence(3), sentence(3), sentence(3)],
    modalParas: [paragraph(2, [10,15])],
  },
  {
    id: 'c6', span: 'w2 h1', kind: 'compare', color: 'secondary', icon: 'bars', tag: 'Comparativo',
    title: 'Antes e depois do cenário observado',
    left: { label: 'Cenário A', value: sentence(5) },
    right: { label: 'Cenário B', value: sentence(5) },
    modalParas: [paragraph(3, [9,14])],
  },
  {
    id: 'c7', span: 'w1 h1', kind: 'ranking', color: 'orange', icon: 'grid', tag: 'Ranking',
    title: 'Top itens observados',
    items: [sentence(3), sentence(3), sentence(3)],
    modalParas: [paragraph(2, [9,14])],
  },
  {
    id: 'c8', span: 'w1 h1', kind: 'quote', color: 'dark', icon: 'quote', tag: 'Citação',
    quote: paragraph(1, [12,18]),
    modalParas: [paragraph(2, [9,13])],
  },
  {
    id: 'c9', span: 'w1 h1', kind: 'cta', color: 'gradient', icon: 'rocket', tag: 'Resumo',
    title: 'Ver panorama completo',
    modalParas: [paragraph(3, [10,15]), paragraph(2, [9,13])],
  },
];
