/**
 * Fonte única de conteúdo do objeto de aprendizagem.
 * Entregue como JS (e não JSON + fetch) porque alguns servidores de SCORM
 * — inclusive Moodle com slasharguments desativado — retornam MIME incorreto
 * ou bloqueiam XHR para arquivos do pacote.
 */
window.OA_CURSO = {
  titulo: "Acessibilidade em conteúdos educacionais",
  subtitulo: "Objeto de aprendizagem interativo · SCORM 1.2",
  notaCorte: 70,

  telas: [
    {
      id: "abertura",
      rotulo: "Abertura",
      tipo: "conteudo",
      titulo: "Por que acessibilidade não é etapa final",
      corpo: `
        <p>Acessibilidade tratada como revisão de fim de projeto custa caro e resolve pouco.
        Tratada como restrição de partida, ela orienta decisões de estrutura, cor e interação
        desde o primeiro protótipo.</p>
        <p>Neste objeto você percorre quatro decisões que definem se um conteúdo educacional
        será utilizável por todo o público — e responde a quatro questões de fixação ao final.</p>
        <ul class="oa-lista">
          <li>Estrutura semântica antes de estilo</li>
          <li>Contraste como requisito, não preferência</li>
          <li>Navegação por teclado em todo componente interativo</li>
          <li>Mídia com alternativa textual equivalente</li>
        </ul>`
    },
    {
      id: "estrutura",
      rotulo: "Estrutura",
      tipo: "conteudo",
      titulo: "Estrutura semântica",
      corpo: `
        <p>Leitores de tela navegam por marcos e cabeçalhos. Uma página com sequência
        <code>h1 → h2 → h3</code> é percorrível; uma página feita de <code>div</code> estilizada
        é um bloco único.</p>
        <div class="oa-comparativo">
          <div class="oa-comparativo__col oa-comparativo__col--erro">
            <span class="oa-tag">Evite</span>
            <pre><code>&lt;div class="titulo-grande"&gt;
  Módulo 1
&lt;/div&gt;</code></pre>
          </div>
          <div class="oa-comparativo__col oa-comparativo__col--ok">
            <span class="oa-tag">Use</span>
            <pre><code>&lt;h2&gt;Módulo 1&lt;/h2&gt;</code></pre>
          </div>
        </div>
        <p class="oa-nota">Regra prática: nunca pule níveis de cabeçalho para obter um tamanho
        de fonte. Tamanho é CSS; hierarquia é HTML.</p>`
    },
    {
      id: "contraste",
      rotulo: "Contraste",
      tipo: "conteudo",
      titulo: "Contraste mínimo",
      corpo: `
        <p>A WCAG 2.1 exige razão de contraste de <strong>4,5:1</strong> para texto normal e
        <strong>3:1</strong> para texto grande (a partir de 24 px, ou 18,66 px em negrito).
        Componentes de interface e bordas de foco também exigem 3:1.</p>
        <p>Cor sozinha nunca pode carregar informação. Se o único indicador de erro em um
        formulário é a borda vermelha, o campo é invisível para parte do público.</p>
        <div class="oa-callout">
          <strong>Verificação rápida:</strong> DevTools do Chrome → seletor de cor →
          o valor de contraste aparece junto ao <em>color picker</em>, com as linhas de corte AA e AAA.
        </div>`
    },
    {
      id: "teclado",
      rotulo: "Teclado",
      tipo: "conteudo",
      titulo: "Operação por teclado",
      corpo: `
        <p>Todo componente clicável precisa ser alcançável por <kbd>Tab</kbd> e acionável por
        <kbd>Enter</kbd> ou <kbd>Espaço</kbd>. O foco precisa ser visível — remover
        <code>outline</code> sem substituto é a falha de acessibilidade mais comum em temas de LMS.</p>
        <p>Teste agora: pressione <kbd>Tab</kbd> nesta tela. O anel de foco deve percorrer o menu
        lateral e os botões de navegação, sempre visível.</p>
        <pre><code>/* Substituto aceitável para o outline padrão */
:focus-visible {
  outline: 3px solid var(--foco);
  outline-offset: 2px;
}</code></pre>`
    }
  ],

  avaliacao: {
    rotulo: "Avaliação",
    titulo: "Avaliação final",
    instrucao: "Quatro questões de fixação. Aproveitamento mínimo: 70%.",
    questoes: [
      {
        enunciado: "Qual é a razão mínima de contraste exigida pela WCAG 2.1 nível AA para texto normal?",
        alternativas: ["2:1", "3:1", "4,5:1", "7:1"],
        correta: 2,
        feedback: "4,5:1 para texto normal; 3:1 vale para texto grande e componentes de interface."
      },
      {
        enunciado: "Um botão foi construído com <div onclick=\"...\">. Qual é o problema principal?",
        alternativas: [
          "Nenhum, desde que tenha cursor: pointer",
          "Não recebe foco por teclado nem é anunciado como botão",
          "Não funciona em dispositivos móveis",
          "Aumenta o tempo de carregamento"
        ],
        correta: 1,
        feedback: "Sem papel semântico e sem foco, o componente não existe para teclado e leitor de tela."
      },
      {
        enunciado: "Pular de <h2> para <h4> para obter um texto menor é aceitável?",
        alternativas: [
          "Sim, hierarquia é apenas visual",
          "Sim, desde que haja ARIA no elemento",
          "Não, hierarquia é estrutura; tamanho é CSS",
          "Depende do tema do Moodle"
        ],
        correta: 2,
        feedback: "Hierarquia de cabeçalhos é o mapa de navegação do leitor de tela."
      },
      {
        enunciado: "Um gráfico sinaliza situação crítica apenas pela cor vermelha. O que falta?",
        alternativas: [
          "Aumentar a saturação do vermelho",
          "Um segundo indicador não cromático (rótulo, ícone ou padrão)",
          "Uma legenda em fonte maior",
          "Nada, vermelho é convenção universal"
        ],
        correta: 1,
        feedback: "Cor não pode ser o único meio de transmitir informação (WCAG 1.4.1)."
      }
    ]
  }
};
