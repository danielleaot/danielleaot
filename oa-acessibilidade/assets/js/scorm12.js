/**
 * Wrapper SCORM 1.2 — descoberta de API, leitura/escrita de CMI e encerramento seguro.
 * Degradação: se nenhuma API for encontrada (preview local, iframe fora do LMS),
 * o objeto continua funcionando e apenas registra em console.
 */
(function (global) {
  "use strict";

  var API = null;
  var iniciado = false;
  var encerrado = false;
  var LIMITE_SUSPEND = 4096; // limite do cmi.suspend_data em SCORM 1.2

  // Sobe até 500 níveis de janelas-pai procurando o objeto API.
  function procurarNaJanela(win) {
    var tentativas = 0;
    while (win && !win.API && win.parent && win.parent !== win && tentativas < 500) {
      tentativas++;
      win = win.parent;
    }
    return win ? win.API || null : null;
  }

  function localizarAPI() {
    var api = procurarNaJanela(window);
    // Moodle abre o SCO em nova janela/popup em alguns modos de exibição.
    if (!api && window.opener && !window.opener.closed) {
      api = procurarNaJanela(window.opener);
    }
    if (!api && window.top && window.top.opener && !window.top.opener.closed) {
      api = procurarNaJanela(window.top.opener);
    }
    return api;
  }

  function log(msg) {
    if (global.console && console.info) console.info("[SCORM] " + msg);
  }

  var Scorm = {
    conectado: function () { return !!API && iniciado; },

    iniciar: function () {
      if (iniciado) return true;
      API = localizarAPI();
      if (!API) { log("API não encontrada — modo autônomo."); return false; }
      iniciado = API.LMSInitialize("") === "true";
      if (iniciado) {
        // Entrar em 'incomplete' evita que o LMS mantenha 'not attempted'
        // caso o aluno abandone o SCO antes de concluir.
        if (this.ler("cmi.core.lesson_status") === "not attempted") {
          this.gravar("cmi.core.lesson_status", "incomplete");
        }
        this.gravar("cmi.core.score.min", "0");
        this.gravar("cmi.core.score.max", "100");
        this.commit();
      }
      return iniciado;
    },

    ler: function (chave) {
      if (!this.conectado()) return "";
      return API.LMSGetValue(chave);
    },

    gravar: function (chave, valor) {
      if (!this.conectado()) return false;
      return API.LMSSetValue(chave, String(valor)) === "true";
    },

    commit: function () {
      if (!this.conectado()) return false;
      return API.LMSCommit("") === "true";
    },

    /** Marca de retomada. Trunca com segurança no limite do padrão. */
    salvarEstado: function (obj) {
      var dados = JSON.stringify(obj);
      if (dados.length > LIMITE_SUSPEND) {
        log("suspend_data excede 4096 caracteres — estado não salvo.");
        return false;
      }
      this.gravar("cmi.suspend_data", dados);
      this.gravar("cmi.core.lesson_location", String(obj.tela || 0));
      return this.commit();
    },

    lerEstado: function () {
      var bruto = this.ler("cmi.suspend_data");
      if (!bruto) return null;
      try { return JSON.parse(bruto); } catch (e) { return null; }
    },

    /**
     * Envia nota (0–100) e status. Em SCORM 1.2 o status é decidido pelo SCO:
     * o Moodle respeita o masteryscore do manifesto, mas gravar explicitamente
     * evita divergência entre LMSs.
     */
    concluir: function (nota, notaCorte) {
      if (!this.conectado()) return false;
      var valor = Math.round(nota);
      this.gravar("cmi.core.score.raw", valor);
      this.gravar("cmi.core.lesson_status", valor >= notaCorte ? "passed" : "failed");
      return this.commit();
    },

    finalizar: function () {
      if (!this.conectado() || encerrado) return;
      encerrado = true;
      API.LMSFinish("");
    }
  };

  // Encerramento resiliente: pagehide cobre iOS/Safari, onde unload não dispara.
  window.addEventListener("pagehide", function () { Scorm.finalizar(); });
  window.addEventListener("beforeunload", function () { Scorm.finalizar(); });

  global.Scorm = Scorm;
})(window);
