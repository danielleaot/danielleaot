(function () {
  "use strict";

  var curso = window.OA_CURSO;
  var telas = curso.telas.concat([{ id: "avaliacao", rotulo: curso.avaliacao.rotulo, tipo: "avaliacao" }]);

  var estado = {
    tela: 0,
    visitadas: [],
    respostas: {},
    finalizado: false,
    nota: 0
  };

  var el = {
    trilha: document.getElementById("trilha"),
    palco: document.getElementById("palco"),
    anterior: document.getElementById("btn-anterior"),
    proximo: document.getElementById("btn-proximo"),
    barra: document.getElementById("barra-progresso"),
    progressoTexto: document.getElementById("progresso-texto"),
    status: document.getElementById("status-lms"),
    anuncio: document.getElementById("anuncio")
  };

  /* ---------- infraestrutura ---------- */

  function anunciar(texto) {
    el.anuncio.textContent = texto;
  }

  function persistir() {
    window.Scorm.salvarEstado({
      tela: estado.tela,
      visitadas: estado.visitadas,
      respostas: estado.respostas,
      finalizado: estado.finalizado,
      nota: estado.nota
    });
  }

  function restaurar() {
    var salvo = window.Scorm.lerEstado();
    if (!salvo) return;
    estado.tela = Math.min(salvo.tela || 0, telas.length - 1);
    estado.visitadas = salvo.visitadas || [];
    estado.respostas = salvo.respostas || {};
    estado.finalizado = !!salvo.finalizado;
    estado.nota = salvo.nota || 0;
  }

  function marcarVisita(i) {
    if (estado.visitadas.indexOf(i) === -1) estado.visitadas.push(i);
  }

  /* ---------- trilha lateral ---------- */

  function montarTrilha() {
    telas.forEach(function (tela, i) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "trilha__item";
      btn.dataset.indice = i;
      btn.innerHTML =
        '<span class="trilha__marca" aria-hidden="true"></span>' +
        '<span class="trilha__rotulo">' + tela.rotulo + "</span>";
      btn.addEventListener("click", function () { irPara(i); });
      li.appendChild(btn);
      el.trilha.appendChild(li);
    });
  }

  function atualizarTrilha() {
    var itens = el.trilha.querySelectorAll(".trilha__item");
    Array.prototype.forEach.call(itens, function (btn, i) {
      var atual = i === estado.tela;
      var concluida = estado.visitadas.indexOf(i) !== -1 && !atual;
      btn.classList.toggle("is-atual", atual);
      btn.classList.toggle("is-concluida", concluida);
      btn.setAttribute("aria-current", atual ? "step" : "false");
    });
  }

  function atualizarProgresso() {
    var pct = Math.round((estado.visitadas.length / telas.length) * 100);
    el.barra.style.width = pct + "%";
    el.barra.parentElement.setAttribute("aria-valuenow", pct);
    el.progressoTexto.textContent = pct + "% percorrido";
  }

  /* ---------- renderização ---------- */

  function renderConteudo(tela) {
    return (
      '<article class="tela" tabindex="-1">' +
        '<p class="tela__eyebrow">' + tela.rotulo + "</p>" +
        '<h2 class="tela__titulo">' + tela.titulo + "</h2>" +
        '<div class="tela__corpo">' + tela.corpo + "</div>" +
      "</article>"
    );
  }

  function renderAvaliacao() {
    var av = curso.avaliacao;
    var html =
      '<article class="tela" tabindex="-1">' +
        '<p class="tela__eyebrow">' + av.rotulo + "</p>" +
        '<h2 class="tela__titulo">' + av.titulo + "</h2>" +
        '<p class="tela__corpo">' + av.instrucao + "</p>" +
        '<form id="form-avaliacao" class="quiz">';

    av.questoes.forEach(function (q, qi) {
      html +=
        '<div class="quiz__questao" role="group" data-questao="' + qi + '" ' +
             'aria-labelledby="enun-' + qi + '">' +
          '<p class="quiz__enunciado" id="enun-' + qi + '">' +
            '<span class="quiz__num" aria-hidden="true">' + (qi + 1) + "</span>" +
            "<span>" + escapar(q.enunciado) + "</span></p>";

      q.alternativas.forEach(function (alt, ai) {
        var id = "q" + qi + "a" + ai;
        var marcado = estado.respostas[qi] === ai ? " checked" : "";
        html +=
          '<label class="quiz__opcao" for="' + id + '">' +
            '<input type="radio" id="' + id + '" name="q' + qi + '" value="' + ai + '"' + marcado +
            (estado.finalizado ? " disabled" : "") + ">" +
            '<span class="quiz__texto">' + escapar(alt) + "</span>" +
          "</label>";
      });

      html += '<p class="quiz__feedback" hidden></p></div>';
    });

    html +=
        '<div class="quiz__acoes">' +
          '<button type="submit" class="btn btn--primario" id="btn-enviar"' +
            (estado.finalizado ? " disabled" : "") + ">Enviar respostas</button>" +
          '<button type="button" class="btn btn--secundario" id="btn-refazer" hidden>Refazer</button>' +
        "</div>" +
        '<div class="quiz__resultado" id="resultado" role="status" hidden></div>' +
      "</form></article>";

    return html;
  }

  function escapar(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function render() {
    var tela = telas[estado.tela];
    el.palco.innerHTML = tela.tipo === "avaliacao" ? renderAvaliacao() : renderConteudo(tela);

    if (tela.tipo === "avaliacao") {
      ligarAvaliacao();
      if (estado.finalizado) mostrarResultado(estado.nota, true);
    }

    marcarVisita(estado.tela);
    atualizarTrilha();
    atualizarProgresso();

    el.anterior.disabled = estado.tela === 0;
    el.proximo.disabled = estado.tela === telas.length - 1;

    // Move o foco para a tela nova: sem isso, quem usa teclado ou leitor de tela
    // continua no botão e não percebe a troca de conteúdo.
    el.palco.querySelector(".tela").focus();
    anunciar(tela.rotulo + ". Tela " + (estado.tela + 1) + " de " + telas.length + ".");
    el.palco.scrollTop = 0;

    persistir();
  }

  function irPara(i) {
    if (i < 0 || i >= telas.length) return;
    estado.tela = i;
    render();
  }

  /* ---------- avaliação ---------- */

  function ligarAvaliacao() {
    var form = document.getElementById("form-avaliacao");
    var refazer = document.getElementById("btn-refazer");

    form.addEventListener("change", function (ev) {
      var alvo = ev.target;
      if (alvo.type !== "radio") return;
      var qi = parseInt(alvo.name.slice(1), 10);
      estado.respostas[qi] = parseInt(alvo.value, 10);
      persistir();
    });

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      corrigir();
    });

    refazer.addEventListener("click", function () {
      estado.respostas = {};
      estado.finalizado = false;
      estado.nota = 0;
      render();
    });
  }

  function corrigir() {
    var questoes = curso.avaliacao.questoes;
    var pendentes = questoes.filter(function (q, i) {
      return typeof estado.respostas[i] === "undefined";
    });

    if (pendentes.length) {
      var res = document.getElementById("resultado");
      res.hidden = false;
      res.className = "quiz__resultado quiz__resultado--alerta";
      res.textContent = "Responda todas as questões antes de enviar.";
      res.focus();
      return;
    }

    var acertos = 0;
    questoes.forEach(function (q, i) {
      var certo = estado.respostas[i] === q.correta;
      if (certo) acertos++;

      var grupo = document.querySelector('[data-questao="' + i + '"]');
      grupo.classList.add(certo ? "is-certa" : "is-errada");
      var fb = grupo.querySelector(".quiz__feedback");
      fb.hidden = false;
      fb.textContent = (certo ? "Correto. " : "Incorreto. ") + q.feedback;
      Array.prototype.forEach.call(grupo.querySelectorAll("input"), function (inp) {
        inp.disabled = true;
      });
    });

    estado.nota = (acertos / questoes.length) * 100;
    estado.finalizado = true;

    window.Scorm.concluir(estado.nota, curso.notaCorte);
    persistir();
    mostrarResultado(estado.nota, false);
  }

  function mostrarResultado(nota, silencioso) {
    var aprovado = nota >= curso.notaCorte;
    var res = document.getElementById("resultado");
    var enviar = document.getElementById("btn-enviar");
    var refazer = document.getElementById("btn-refazer");

    enviar.disabled = true;
    refazer.hidden = false;
    res.hidden = false;
    res.className = "quiz__resultado " + (aprovado ? "quiz__resultado--aprovado" : "quiz__resultado--reprovado");
    res.innerHTML =
      '<span class="quiz__nota">' + Math.round(nota) + "</span>" +
      "<span>" + (aprovado
        ? "Aproveitamento suficiente."
        : "Aproveitamento abaixo de " + curso.notaCorte + "%. Revise o conteúdo e refaça.") + "</span>";

    if (!silencioso) {
      anunciar("Avaliação corrigida. Nota " + Math.round(nota) + " de 100.");
      res.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* ---------- inicialização ---------- */

  function indicarStatus(conectado) {
    el.status.textContent = conectado ? "Conectado ao LMS" : "Modo autônomo (sem registro de nota)";
    el.status.classList.toggle("is-offline", !conectado);
  }

  document.getElementById("oa-titulo").textContent = curso.titulo;
  document.getElementById("oa-subtitulo").textContent = curso.subtitulo;
  document.title = curso.titulo;

  var conectado = window.Scorm.iniciar();
  indicarStatus(conectado);
  if (conectado) restaurar();

  montarTrilha();
  render();

  el.anterior.addEventListener("click", function () { irPara(estado.tela - 1); });
  el.proximo.addEventListener("click", function () { irPara(estado.tela + 1); });

  document.addEventListener("keydown", function (ev) {
    if (ev.target.matches("input, textarea, button")) return;
    if (ev.key === "ArrowRight") irPara(estado.tela + 1);
    if (ev.key === "ArrowLeft") irPara(estado.tela - 1);
  });
})();
