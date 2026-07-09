const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat, convertInchesToTwip
} = require("docx");

const PAGE_W = 12240, PAGE_H = 15840; // US Letter

const brand = "2E5C8A";
const brandLight = "EAF1F8";
const gray = "595959";

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 160 } });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } });
}
function p(text, opts = {}) {
  return new Paragraph({ children: [new TextRun({ text, ...opts })], spacing: { after: 160 } });
}
function bullet(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts })],
    bullet: { level: 0 },
    spacing: { after: 80 },
  });
}
function bold(text) {
  return new TextRun({ text, bold: true });
}

function cell(text, { header = false, width, bold: b = false, shade } = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: shade ? { type: ShadingType.CLEAR, color: "auto", fill: shade } : undefined,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: header || b, color: header ? "FFFFFF" : "000000", size: 20 })],
      }),
    ],
  });
}

// Hosting comparison table
const hostingHeaders = ["Opção", "Custo", "Facilidade", "Aparência profissional", "Indicado quando..."];
const hostingRows = [
  ["Carrd", "Grátis (com marca) / US$ 9/ano (Pro)", "Muito alta — sem código", "Boa, layout de página única", "Quer algo simples, rápido e elegante, sem mexer em código"],
  ["Notion (público)", "Grátis", "Muito alta", "Baixa — parece um documento", "Já usa Notion e quer algo provisório, não é o ideal como cartão de visitas"],
  ["GitHub Pages", "Grátis (domínio próprio ~US$ 12/ano opcional)", "Baixa — exige HTML/CSS/Git", "Alta se bem feito", "Houver conforto técnico ou apoio (ex: você, Fabio, mantém)"],
  ["WordPress.com", "Grátis (com anúncios) / a partir de US$ 4/mês sem anúncios", "Média", "Alta, muitos temas prontos", "Quiser blog integrado e crescer o conteúdo com o tempo"],
  ["Wix", "Grátis (com marca Wix) / a partir de US$ 16/mês", "Alta — drag-and-drop", "Muito alta", "Tiver orçamento e quiser máxima personalização visual"],
  ["LinkedIn (seção Destaque/Featured)", "Grátis", "Muito alta", "Depende do PDF/imagem anexada", "Como complemento — nunca como portfólio único"],
];

const doc = new Document({
  sections: [
    {
      properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } },
      children: [
        new Paragraph({
          children: [new TextRun({ text: "Estratégia de Portfólio Profissional", bold: true, size: 40, color: brand })],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Gestão Moodle & Design Instrucional", size: 28, color: gray })],
          spacing: { after: 40 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Preparado para Dani  ·  Julho de 2026", size: 20, italics: true, color: gray })],
          spacing: { after: 320 },
          border: { bottom: { color: brand, space: 8, style: BorderStyle.SINGLE, size: 6 } },
        }),

        h1("1. Objetivo e público-alvo"),
        p("Objetivo: portfólio para busca de vagas CLT/PJ como gestora Moodle e designer instrucional, mostrando o ciclo completo de trabalho — do desenho pedagógico até a configuração e administração da plataforma."),
        p("Público-alvo: recrutadores de RH e gestores de EAD/T&D que avaliam candidatos rapidamente (poucos minutos por perfil). O portfólio precisa comunicar competência de forma visual e objetiva, sem exigir muita leitura."),
        p("Dado de mercado: pesquisas com recrutadores de design instrucional mostram que cerca de 25% das vagas exigem portfólio e outros 39% o consideram fator relevante na decisão — e que profissionais com portfólio tendem a conseguir propostas ~15% melhores do que quem não tem um.", { italics: true, color: gray, size: 20 }),

        h1("2. Estrutura recomendada do portfólio"),
        p("Uma página única (one-page), com navegação por âncoras, nesta ordem:"),
        bullet("Header / Sobre — foto, nome, título profissional (\"Gestora Moodle & Designer Instrucional\") e uma frase de valor (o que ela resolve para quem contrata)."),
        bullet("Competências — dividir em dois blocos claros: Design Instrucional (ADDIE, storyboard, roteirização, Articulate/Captivate, avaliação de aprendizagem) e Administração Moodle (criação de cursos, cadastro de usuários e papéis, relatórios/logs, plugins, SCORM/H5P, backup e restauração, integração com outras plataformas)."),
        bullet("Cases / Projetos — 4 a 8 projetos reais, cada um com: contexto/problema, papel dela no projeto, o que foi feito (do desenho ao Moodle), e resultado (nº de alunos, conclusão do curso, redução de tempo de suporte, etc.). Prints de tela do Moodle configurado contam muito."),
        bullet("Ferramentas — lista visual de ícones/logos (Moodle, Articulate, H5P, Canva, Excel/Planilhas, etc.)."),
        bullet("Depoimentos (se houver) — de colegas, chefias ou clientes anteriores."),
        bullet("Contato — e-mail, LinkedIn, WhatsApp, botão de download do currículo em PDF."),

        h1("3. Conteúdo a priorizar (ela já tem bastante material)"),
        p("Como já existem cursos, prints e relatórios prontos, o trabalho principal é curadoria, não produção do zero:"),
        bullet("Selecionar de 4 a 8 projetos mais fortes (qualidade > quantidade)."),
        bullet("Para cada um, montar um mini-case de 4 a 6 linhas + 2-3 imagens (tela do curso, relatório de conclusão, configuração de papéis/permissões)."),
        bullet("Anonimizar dados sensíveis de empresas/alunos quando necessário (nomes, notas individuais)."),
        bullet("Traduzir tarefas técnicas em resultados de negócio: em vez de \"configurei o Moodle\", usar \"implantei ambiente Moodle para 300 colaboradores, reduzindo tempo de onboarding em X%\"."),

        h1("4. Comparação de opções de hospedagem"),
        new Table({
          width: { size: 10040, type: WidthType.DXA },
          columnWidths: [1600, 2200, 1700, 2200, 2340],
          rows: [
            new TableRow({
              tableHeader: true,
              children: hostingHeaders.map((t, i) => cell(t, { header: true, width: [1600, 2200, 1700, 2200, 2340][i], shade: brand })),
            }),
            ...hostingRows.map((row, idx) =>
              new TableRow({
                children: row.map((t, i) => cell(t, { width: [1600, 2200, 1700, 2200, 2340][i], shade: idx % 2 === 0 ? brandLight : undefined })),
              })
            ),
          ],
        }),
        new Paragraph({ text: "", spacing: { after: 200 } }),

        h1("5. Recomendação final"),
        p("Estratégia em duas camadas, para publicar rápido e sem custo, com espaço para evoluir depois:", {}),
        h2("Camada 1 — Agora (custo zero)"),
        bullet("Site em página única no Carrd (plano grátis) ou HTML estático hospedado gratuitamente (ex.: Netlify/GitHub Pages) — já preparamos um protótipo pronto para publicar."),
        bullet("Reforçar a seção \"Destaque\" do LinkedIn apontando para o link do portfólio."),
        h2("Camada 2 — Quando estiver buscando ativamente ou fechando contratos PJ"),
        bullet("Registrar domínio próprio (ex.: danisobrenome.com.br, ~R$ 40/ano) e apontar para o mesmo site — passa mais credibilidade que um subdomínio grátis."),
        bullet("Se o volume de conteúdo crescer (blog, novos cases com frequência), migrar para WordPress.com para ganhar SEO e facilidade de atualização."),
        p("Por que não Wix/Notion como primeira opção: Wix tem melhor custo-benefício só com plano pago, e Notion não passa a imagem profissional necessária para recrutadores de RH. Ambos podem ser válidos depois, mas não são o melhor ponto de partida.", { italics: true, color: gray, size: 20 }),

        h1("6. Próximos passos"),
        bullet("Revisar e aprovar o protótipo HTML entregue junto com este documento."),
        bullet("Levantar e organizar os 4-8 projetos que entrarão como cases (prints + texto curto)."),
        bullet("Publicar no Carrd ou em hospedagem estática gratuita (posso ajudar no passo a passo)."),
        bullet("Adicionar o link no LinkedIn e no currículo."),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  require("fs").writeFileSync("Estrategia_Portfolio_Dani.docx", buf);
  console.log("done");
});
