/* content.js — dados e ícones do protótipo de página de curso (Moodle) */

const ICONS = {
  target: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.8" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>`,
  guide: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="5" height="14" rx="1" transform="rotate(-6 4 5)" fill="currentColor" opacity=".35"/><rect x="9.5" y="4" width="5" height="15" rx="1" fill="currentColor" opacity=".65"/><rect x="15" y="5" width="5" height="14" rx="1" transform="rotate(6 15 5)" fill="currentColor"/></svg>`,
  pdf: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v4h4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 13h8M8 16.5h5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  survey: `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M9 3.5h6a1 1 0 0 1 1 1V6H8V4.5a1 1 0 0 1 1-1Z" fill="currentColor"/><path d="m8.5 12 2 2 4-4.2M8.5 17h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cap: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 4 2 9l10 5 10-5-10-5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M21 9v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V10M11 20V4M18 20v-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M3 20h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  forum: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 5h13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H10l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  tutor: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" stroke-width="1.8"/><path d="M5 20c0-3.6 3.1-6.4 7-6.4s7 2.8 7 6.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  task: `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 9h7M8.5 12.5h7M8.5 16h4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  project: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="13" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.8" opacity=".55"/><rect x="3" y="14" width="8" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8" opacity=".55"/><rect x="13" y="14" width="8" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg>`,
  puzzle: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 4h4v2.2a1.6 1.6 0 0 0 2.8 1H18v4h-2.2a1.6 1.6 0 0 0-1 2.8V16h-4v-2.2a1.6 1.6 0 0 0-2.8-1H6v-4h2.2A1.6 1.6 0 0 0 9 6.2V4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
};

const THEMES = {
  a: {
    label: 'Humanidades',
    courseTitle: 'Cidadania e Direitos — Curso Introdutório',
    greetSub: 'Aqui separamos algumas informações básicas sobre o seu curso:',
    heroIcon: 'cap',
    moduleSubtitles: ['Fundamentos e conceitos', 'Contexto histórico', 'Estudos de caso', 'Encerramento e avaliação'],
  },
  b: {
    label: 'Dados & BI',
    courseTitle: 'Dashboards e Indicadores — Fundamentos',
    greetSub: 'Aqui separamos algumas informações básicas sobre o seu curso de análise de dados:',
    heroIcon: 'chart',
    moduleSubtitles: ['Introdução a dados', 'Construção de dashboards', 'Storytelling visual', 'Projeto final'],
  },
};

const MODULES_BASE = [
  { num: 1, key: 'm1' },
  { num: 2, key: 'm2' },
  { num: 3, key: 'm3' },
  { num: 4, key: 'm4' },
];

const ACCORDION_ITEMS = [
  { icon: 'target', label: 'Informações sobre o curso' },
  { icon: 'forum', label: 'Fórum de avisos e dúvidas' },
  { icon: 'tutor', label: 'Fale com o tutor' },
  { icon: 'book', label: 'Conteúdo do Módulo 1' },
  { icon: 'task', label: 'Atividade de Fixação' },
  { icon: 'project', label: 'Projeto da aula do módulo 1' },
  { icon: 'puzzle', label: 'Desafios' },
  { icon: 'folder', label: 'Materiais de apoio' },
];
