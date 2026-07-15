/* =========================================================
   CONTEÚDO DO MÓDULO — texto de preenchimento (lorem ipsum)
   Fonte única de dados: o renderizador não conhece o texto,
   só os tipos de bloco. Trocar de curso = trocar este arquivo.
   ========================================================= */

const L1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const L2 =
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const L3 =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.';
const L4 =
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.';
const L5 =
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.';

window.CURSO = {
  marca: 'Lorem Academy',
  titulo: 'Fundamentos de Ipsum Aplicado',
  modulo: 'Módulo 01',
  linha: 'Percurso introdutório em três unidades. Conteúdo de preenchimento para validação de layout, navegação e componentes.',
  tags: ['Carga horária: 8h', 'Autoinstrucional', 'SCORM 1.2'],

  glossario: {
    'consectetur':
      'Consectetur adipiscing elit: definição de preenchimento usada para demonstrar a abertura do verbete em janela modal, sem sair do fluxo de leitura.',
    'voluptatem':
      'Voluptatem accusantium: segundo verbete de exemplo. O termo é marcado no texto e permanece acessível pelo teclado.',
    'architecto':
      'Architecto beatae vitae: terceiro verbete. Serve para verificar textos longos dentro do modal, com rolagem interna quando necessário.'
  },

  unidades: [
    /* ---------------- Apresentação ---------------- */
    {
      id: 'apresentacao',
      rotulo: 'Apresentação',
      num: '00',
      titulo: 'Apresentação do módulo',
      chamada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      blocos: [
        { t: 'p', v: L1 },
        { t: 'p', v: 'Neste módulo, você vai percorrer <termo>consectetur</termo> e os demais elementos de preenchimento. ' + L2 },
        { t: 'h3', v: 'Objetivos de aprendizagem' },
        {
          t: 'lista',
          ordenada: true,
          itens: [
            'Reconhecer lorem ipsum dolor sit amet em contextos diversos.',
            'Aplicar consectetur adipiscing elit na rotina de trabalho.',
            'Analisar tempor incididunt ut labore et dolore magna aliqua.',
            'Avaliar quis nostrud exercitation ullamco laboris nisi.'
          ]
        },
        {
          t: 'recurso',
          tipo: 'conceito',
          rotulo: 'Conceito-chave',
          titulo: 'Lorem ipsum',
          paragrafos: [L3]
        },
        {
          t: 'figura',
          src: 'assets/img/figura-01.svg',
          titulo: 'Figura 1 — Estrutura do módulo',
          legenda: '<b>Figura 1.</b> Composição geométrica ilustrativa. Elaboração própria, 2026.'
        },
        {
          t: 'video',
          poster: 'assets/img/figura-02.svg',
          comando: 'Assista à videoaula de abertura (3 min).',
          src: ''
        },
        { t: 'p', v: L4 }
      ]
    },

    /* ---------------- Unidade 1 ---------------- */
    {
      id: 'unidade-1',
      rotulo: 'Dolor sit amet',
      num: '01',
      titulo: 'Dolor sit amet: princípios gerais',
      chamada: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      blocos: [
        { t: 'h2', v: '1.1 Consectetur adipiscing' },
        { t: 'p', v: L1 },
        { t: 'p', v: L2 },
        {
          t: 'recurso',
          tipo: 'analogia',
          rotulo: 'Analogia',
          paragrafos: [
            'Pense em <strong>lorem ipsum</strong> como um andaime: sustenta a obra enquanto a estrutura definitiva não chega. ' + L5
          ]
        },
        {
          t: 'carrossel',
          comando: 'Navegue pelos cartões para ver cada etapa do processo.',
          slides: [
            { img: 'assets/img/figura-03.svg', titulo: 'Etapa 1 — Sed ut perspiciatis', texto: L3 },
            { img: 'assets/img/figura-04.svg', titulo: 'Etapa 2 — Nemo enim ipsam', texto: L4 },
            { img: 'assets/img/figura-05.svg', titulo: 'Etapa 3 — At vero eos', texto: L5 }
          ]
        },
        { t: 'h3', v: '1.2 Tempor incididunt' },
        { t: 'p', v: 'A leitura de <termo>voluptatem</termo> exige atenção. ' + L3 },
        {
          t: 'sanfona',
          comando: 'Clique em cada faixa para abrir o detalhamento.',
          itens: [
            { titulo: 'Ut labore et dolore', conteudo: [L1, L2] },
            { titulo: 'Magna aliqua enim', conteudo: [L3] },
            { titulo: 'Minim veniam quis', conteudo: [L4, L5] }
          ]
        },
        {
          t: 'recurso',
          tipo: 'refletir',
          rotulo: 'Para refletir',
          paragrafos: ['Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?']
        },
        {
          t: 'citacao',
          texto: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
          autor: 'Sobrenome, Nome (2026, p. 42)'
        },
        {
          t: 'figura',
          src: 'assets/img/figura-06.svg',
          titulo: 'Figura 2 — Fluxo de trabalho',
          legenda: '<b>Figura 2.</b> Diagrama de preenchimento. Elaboração própria, 2026.'
        },
        {
          t: 'sintese',
          titulo: 'Síntese da unidade',
          paragrafos: [L2]
        }
      ]
    },

    /* ---------------- Unidade 2 ---------------- */
    {
      id: 'unidade-2',
      rotulo: 'Eiusmod tempor',
      num: '02',
      titulo: 'Eiusmod tempor: aplicação prática',
      chamada: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
      blocos: [
        { t: 'h2', v: '2.1 Excepteur sint occaecat' },
        { t: 'p', v: L4 },
        {
          t: 'passos',
          comando: 'Avance pelos passos para acompanhar o raciocínio.',
          itens: [
            'Passo 1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Passo 2 — Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Passo 3 — Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            'Passo 4 — Duis aute irure dolor in reprehenderit in voluptate velit.'
          ]
        },
        {
          t: 'recurso',
          tipo: 'aplicacao',
          rotulo: 'Aplicação prática',
          titulo: 'Caso de preenchimento',
          paragrafos: [L5, 'Sunt in culpa qui officia deserunt mollit anim id est laborum.']
        },
        { t: 'h3', v: '2.2 Cupidatat non proident' },
        {
          t: 'cartas',
          comando: 'Clique em cada carta para revelar a definição.',
          itens: [
            { img: 'assets/img/carta-01.svg', titulo: 'Aperiam', texto: L1 },
            { img: 'assets/img/carta-02.svg', titulo: 'Inventore', texto: L2 },
            { img: 'assets/img/carta-03.svg', titulo: 'Veritatis', texto: L3 }
          ]
        },
        {
          t: 'abas',
          comando: 'Compare as três abordagens.',
          itens: [
            { rotulo: 'Abordagem A', titulo: 'Sed ut perspiciatis', conteudo: [L3] },
            { rotulo: 'Abordagem B', titulo: 'Nemo enim ipsam', conteudo: [L4] },
            { rotulo: 'Abordagem C', titulo: 'At vero eos', conteudo: [L5] }
          ]
        },
        {
          t: 'comparador',
          antes: 'assets/img/comparador-a.svg',
          depois: 'assets/img/comparador-b.svg',
          comando: 'Arraste a alça para comparar o antes e o depois.',
          legenda: '<b>Figura 3.</b> Comparação de cenários. Elaboração própria, 2026.'
        },
        {
          t: 'recurso',
          tipo: 'boaspraticas',
          rotulo: 'Boas práticas',
          paragrafos: ['Excepteur sint occaecat cupidatat non proident. ' + L2]
        },
        {
          t: 'checklist',
          titulo: 'Lista de verificação',
          itens: [
            'Lorem ipsum dolor sit amet foi identificado.',
            'Consectetur adipiscing elit está documentado.',
            'Tempor incididunt foi validado com a equipe.',
            'Magna aliqua consta no registro final.'
          ]
        },
        {
          t: 'sintese',
          titulo: 'Síntese da unidade',
          paragrafos: [L1]
        }
      ]
    },

    /* ---------------- Unidade 3 ---------------- */
    {
      id: 'unidade-3',
      rotulo: 'Ut labore',
      num: '03',
      titulo: 'Ut labore: consolidação',
      chamada: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
      blocos: [
        { t: 'h2', v: '3.1 Totam rem aperiam' },
        { t: 'p', v: 'O termo <termo>architecto</termo> encerra o percurso. ' + L3 },
        {
          t: 'etapas',
          comando: 'Selecione uma etapa da linha do tempo.',
          itens: [
            { img: 'assets/img/etapa-01.svg', titulo: 'Etapa 1 — Diagnóstico', texto: L1 },
            { img: 'assets/img/etapa-02.svg', titulo: 'Etapa 2 — Desenho', texto: L2 },
            { img: 'assets/img/etapa-03.svg', titulo: 'Etapa 3 — Execução', texto: L3 },
            { img: 'assets/img/etapa-04.svg', titulo: 'Etapa 4 — Avaliação', texto: L4 }
          ]
        },
        {
          t: 'recurso',
          tipo: 'saibamais',
          rotulo: 'Saiba mais',
          paragrafos: [
            'Aprofunde o tema em: SOBRENOME, Nome. <em>Lorem ipsum dolor sit amet</em>. Cidade: Editora, 2026. Disponível em: exemplo.org/lorem. Acesso em: 13 jul. 2026.'
          ]
        },
        { t: 'h3', v: '3.2 Eaque ipsa quae' },
        { t: 'p', v: L5 },
        {
          t: 'lista',
          itens: [
            'Voluptatem accusantium doloremque laudantium.',
            'Totam rem aperiam, eaque ipsa quae ab illo.',
            'Inventore veritatis et quasi architecto beatae.'
          ]
        },
        {
          t: 'sintese',
          titulo: 'Encerramento do módulo',
          paragrafos: [L2, 'Neste módulo, percorremos lorem ipsum dolor sit amet em três unidades.']
        }
      ]
    },

    /* ---------------- Referências ---------------- */
    {
      id: 'referencias',
      rotulo: 'Referências',
      num: '04',
      titulo: 'Referências',
      chamada: 'Fontes citadas ao longo do módulo (preenchimento).',
      blocos: [
        {
          t: 'refs',
          itens: [
            'SOBRENOME, Nome. <em>Lorem ipsum dolor sit amet</em>. 2. ed. Cidade: Editora Exemplo, 2024.',
            'SOBRENOME, Nome; SOBRENOME, Nome. Consectetur adipiscing elit. <em>Revista de Preenchimento</em>, v. 12, n. 3, p. 45-67, 2025.',
            'INSTITUIÇÃO EXEMPLO. <em>Manual de tempor incididunt</em>. Cidade: Instituição Exemplo, 2026.',
            'SOBRENOME, Nome. Ut enim ad minim veniam. <em>Anais do Congresso de Exemplo</em>, Cidade, 2023, p. 101-118.'
          ]
        }
      ]
    }
  ]
};
