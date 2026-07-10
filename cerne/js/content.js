/* content.js — Aurora: dados da trilha + conteúdo de exemplo (lorem ipsum)
   Projeto de portfólio construído do zero. Nenhum conteúdo educacional real é usado. */

const MODULES = [
  {
    "id": "m1",
    "num": 1,
    "title": "Módulo 01",
    "eyebrow": "Fundamentos",
    "sections": [
      {
        "key": "s1",
        "num": "1.1",
        "title": "Id Do Exercitation"
      },
      {
        "key": "s2",
        "num": "1.2",
        "title": "Minim Fugiat Veniam"
      },
      {
        "key": "s3",
        "num": "1.3",
        "title": "Elit Culpa"
      }
    ]
  },
  {
    "id": "m2",
    "num": 2,
    "title": "Módulo 02",
    "eyebrow": "Estrutura",
    "sections": [
      {
        "key": "s1",
        "num": "2.1",
        "title": "Aliquip Exercitation Excepteur"
      },
      {
        "key": "s2",
        "num": "2.2",
        "title": "Laboris Amet"
      },
      {
        "key": "s3",
        "num": "2.3",
        "title": "Minim Aute"
      }
    ]
  },
  {
    "id": "m3",
    "num": 3,
    "title": "Módulo 03",
    "eyebrow": "Prática Guiada",
    "sections": [
      {
        "key": "s1",
        "num": "3.1",
        "title": "Commodo Occaecat"
      },
      {
        "key": "s2",
        "num": "3.2",
        "title": "Ex Mollit"
      },
      {
        "key": "s3",
        "num": "3.3",
        "title": "Et Laborum"
      }
    ]
  },
  {
    "id": "m4",
    "num": 4,
    "title": "Módulo 04",
    "eyebrow": "Aplicação",
    "sections": [
      {
        "key": "s1",
        "num": "4.1",
        "title": "Lorem Amet Exercitation"
      },
      {
        "key": "s2",
        "num": "4.2",
        "title": "Dolore Sint"
      },
      {
        "key": "s3",
        "num": "4.3",
        "title": "Amet Non Mollit"
      }
    ]
  },
  {
    "id": "m5",
    "num": 5,
    "title": "Módulo 05",
    "eyebrow": "Síntese",
    "sections": [
      {
        "key": "s1",
        "num": "5.1",
        "title": "Dolore Excepteur Dolore"
      },
      {
        "key": "s2",
        "num": "5.2",
        "title": "Irure Officia Quis"
      },
      {
        "key": "s3",
        "num": "5.3",
        "title": "Commodo Nisi Tempor"
      }
    ]
  }
];

/* ── monta o carrossel de um módulo inteiro dentro do card de vidro ── */
function renderModule(cfg){
  const host = document.getElementById('stage-' + cfg.id);
  if(!host) return;
  const dots = cfg.sections.map((_,i)=>`<button class="track-dot${i===0?' on':''}" data-i="${i}" aria-label="Seção ${i+1}"></button>`).join('');
  const panes = cfg.sections.map((s,i)=>`
    <article class="pane${i===0?' on':''}">
      <div class="pane-head"><span class="pane-num">${s.num}</span><h2 class="pane-title">${s.title}</h2></div>
      <div class="pane-body">${s.body}</div>
    </article>`).join('');
  host.innerHTML = `
    <div class="module-head">
      <span class="eyebrow">${cfg.eyebrow}</span>
      <h1 class="module-title">${cfg.title}</h1>
      <p class="module-desc">${cfg.desc}</p>
    </div>
    <div class="reel" id="reel-${cfg.id}">
      <div class="reel-track" id="track-${cfg.id}">${panes}</div>
    </div>
    <div class="reel-controls">
      <button class="glass-btn ghost" id="prev-${cfg.id}" onclick="paneStep('${cfg.id}',-1)" aria-label="Seção anterior">&#8592; Anterior</button>
      <div class="track-dots" id="dots-${cfg.id}">${dots}</div>
      <button class="glass-btn" id="next-${cfg.id}" onclick="paneStep('${cfg.id}',1)" aria-label="Próxima seção">Próxima &#8594;</button>
    </div>`;
}

function buildModule1(){
  renderModule({
    "id": "m1",
    "eyebrow": "Fundamentos",
    "title": "Módulo 01",
    "desc": "Veniam non esse consectetur sunt cillum elit mollit nostrud cupidatat nulla sint incididunt. Officia tempor laboris cupidatat velit minim consectetur non id laborum pariatur.",
    "sections": [
        {
            "num": "1.1",
            "title": "Id Do Exercitation",
            "body": "<div class=\"objectives\"><span class=\"objectives-label\">Objetivos</span><ul><li>Amet proident duis adipiscing quis.</li><li>Mollit commodo ut dolor consectetur.</li><li>Ullamco amet et consectetur aute laboris sit proident.</li></ul></div>\n        <p>Velit velit in id sit irure in exercitation sit laborum labore dolor aute. Aliqua ullamco do duis elit irure enim aute proident eu tempor adipiscing.</p>\n        <p>Adipiscing aute nulla amet irure sit voluptate ut ea eu duis laboris occaecat ad aliquip. Quis enim et cupidatat tempor fugiat occaecat et consectetur irure enim consequat ea officia minim pariatur nisi.</p>\n        <pre class=\"code-block\"><code>contador = 0\nenquanto contador < 3:\n    exibir(\"lorem\", contador)\n    contador = contador + 1</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Lorem ipsum dolor sit amet</span></div>\n        <p>Ullamco eiusmod sint minim do anim ea ullamco dolor est cillum amet sint aute irure cupidatat officia proident.</p>"
        },
        {
            "num": "1.2",
            "title": "Minim Fugiat Veniam",
            "body": "<p>Amet sunt consectetur id magna ex fugiat cillum amet sit pariatur fugiat enim esse irure eu proident. Aliqua nulla nostrud officia cillum veniam ipsum id aliquip veniam eiusmod voluptate elit ea sit ut occaecat. Sed excepteur et exercitation exercitation mollit qui ea consectetur eiusmod nisi exercitation aute magna.</p>\n        <p>Magna nulla ullamco veniam eu officia nostrud est labore do consectetur tempor do labore cillum labore lorem ea. Dolore aliqua lorem do ullamco duis quis voluptate irure ad id sed. Id voluptate esse eu excepteur sit aliquip deserunt qui occaecat id qui eu non aute exercitation exercitation exercitation.</p>\n        <pre class=\"code-block\"><code>funcao exemplo(a, b):\n    retornar a + b\n\nexibir(exemplo(2, 3))</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Lorem ipsum dolor sit amet</span></div>\n        <p>Sit incididunt amet ut nisi eiusmod elit minim reprehenderit sit adipiscing lorem irure do duis adipiscing. Voluptate ipsum amet qui ut voluptate nostrud do velit dolore est veniam reprehenderit quis ex.</p>"
        },
        {
            "num": "1.3",
            "title": "Elit Culpa",
            "body": "<p>Ex ex enim consectetur do adipiscing excepteur minim excepteur dolore ex sunt fugiat eiusmod consequat ipsum ut. Quis do fugiat duis mollit ipsum sint consequat enim laborum esse qui consectetur fugiat culpa dolore consequat quis. Veniam occaecat labore duis duis occaecat commodo minim velit labore voluptate non.</p>\n        <p>Proident exercitation excepteur non labore incididunt consequat ea veniam pariatur ipsum ipsum cupidatat. Ex dolore incididunt fugiat reprehenderit est veniam nisi non anim pariatur veniam est laborum.</p>\n        <pre class=\"code-block\"><code>contador = 0\nenquanto contador < 3:\n    exibir(\"lorem\", contador)\n    contador = contador + 1</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Lorem ipsum dolor sit amet</span></div>\n        <p>Labore ex incididunt minim ut ex voluptate deserunt voluptate sunt lorem.</p>"
        }
    ]
});
}

function buildModule2(){
  renderModule({
    "id": "m2",
    "eyebrow": "Estrutura",
    "title": "Módulo 02",
    "desc": "Tempor lorem minim nostrud consectetur ex magna commodo esse incididunt.",
    "sections": [
        {
            "num": "2.1",
            "title": "Aliquip Exercitation Excepteur",
            "body": "<div class=\"objectives\"><span class=\"objectives-label\">Objetivos</span><ul><li>Pariatur eiusmod eiusmod sed ipsum.</li><li>In deserunt aliquip non esse do.</li><li>Cillum anim veniam do aute aute sed ipsum.</li></ul></div>\n        <p>Consequat excepteur anim sed laboris qui incididunt proident qui ut ipsum. Ut aliqua commodo et sint in ad dolore duis ullamco sunt sed sit mollit.</p>\n        <p>Ullamco proident mollit officia commodo sed duis do consequat commodo ipsum qui nisi occaecat tempor reprehenderit lorem occaecat. Tempor do ex voluptate pariatur elit aute sit ad eu consequat consequat. Ex cupidatat occaecat adipiscing officia aute sit et incididunt magna dolor occaecat adipiscing commodo nisi aute ipsum sint.</p>\n        <pre class=\"code-block\"><code>variavel = \"lorem ipsum\"\nexibir(variavel)</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Status: concluído</span></div>\n        <p>Reprehenderit commodo incididunt fugiat magna nisi commodo duis non ex commodo id et fugiat consequat officia officia id. Anim aute deserunt id incididunt sunt nisi sed ullamco elit exercitation nisi ad amet.</p>"
        },
        {
            "num": "2.2",
            "title": "Laboris Amet",
            "body": "<p>Cupidatat elit deserunt occaecat do id nulla esse cillum quis do dolore officia sed. Labore excepteur id adipiscing exercitation officia ea eiusmod cillum sunt labore eiusmod nulla laboris commodo exercitation minim.</p>\n        <h3 class=\"sub-heading\">Ad Consectetur Pariatur</h3>\n        <p>Minim aute aliquip nisi nulla ipsum nostrud minim consequat voluptate. Commodo est amet elit mollit cupidatat labore laborum officia adipiscing consectetur dolore magna dolor. Magna sint sed proident laboris culpa mollit eu proident id dolore exercitation.</p>\n        <pre class=\"code-block\"><code>lista = [\"lorem\", \"ipsum\", \"dolor\"]\npara item em lista:\n    exibir(item)</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Status: concluído</span></div>\n        <p>Magna sit non fugiat tempor laboris deserunt amet magna id ipsum. Non dolore consectetur reprehenderit culpa labore amet dolore qui elit aliquip.</p>"
        },
        {
            "num": "2.3",
            "title": "Minim Aute",
            "body": "<p>Voluptate sed dolor consequat nulla et id elit laborum eiusmod dolore sit tempor incididunt. Velit enim consequat sint ut aliqua nisi commodo eu tempor magna veniam non ipsum. Dolor lorem ipsum pariatur commodo aute laborum incididunt commodo ex et anim nisi adipiscing.</p>\n        <p>Duis sunt officia exercitation laborum commodo enim fugiat ut laborum labore minim incididunt sunt officia nulla pariatur. Exercitation veniam laborum sit sunt sed lorem amet velit excepteur officia dolore. Eiusmod sit consectetur cillum sunt nostrud qui commodo cillum laborum aliqua reprehenderit et fugiat aliqua dolor.</p>\n        <pre class=\"code-block\"><code>funcao exemplo(a, b):\n    retornar a + b\n\nexibir(exemplo(2, 3))</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">lorem\nipsum\ndolor</span></div>\n        <p>Nisi lorem dolore quis est minim laborum aute ad et dolor est officia enim.</p>"
        }
    ]
});
}

function buildModule3(){
  renderModule({
    "id": "m3",
    "eyebrow": "Prática Guiada",
    "title": "Módulo 03",
    "desc": "Esse nisi laboris est enim culpa proident qui est ipsum sed. Laboris nulla sint deserunt non ex est in.",
    "sections": [
        {
            "num": "3.1",
            "title": "Commodo Occaecat",
            "body": "<div class=\"objectives\"><span class=\"objectives-label\">Objetivos</span><ul><li>Consectetur dolore proident consectetur do.</li><li>In dolor exercitation ipsum enim enim velit labore.</li><li>In est consequat culpa sint.</li></ul></div>\n        <p>Sint ad pariatur ea do aliqua pariatur voluptate esse do dolor proident sunt nulla deserunt commodo. Pariatur fugiat non commodo sed mollit consequat sint commodo irure sunt proident non ipsum proident eu.</p>\n        <p>Ipsum dolor sed velit quis est adipiscing nostrud sunt nisi aute. Velit ipsum velit duis eu et ea dolore lorem aliquip.</p>\n        <pre class=\"code-block\"><code>variavel = \"lorem ipsum\"\nexibir(variavel)</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Lorem ipsum dolor sit amet</span></div>\n        <p>Dolore non amet culpa dolore et pariatur sint ut labore excepteur esse laborum aliquip ea culpa nostrud.</p>"
        },
        {
            "num": "3.2",
            "title": "Ex Mollit",
            "body": "<p>Voluptate velit esse incididunt amet reprehenderit do minim dolore esse. Voluptate irure sed lorem ex sit ea magna laborum eu adipiscing fugiat ut eu. Aliqua nulla consequat aliqua aliquip aliquip aliquip occaecat elit deserunt aute incididunt enim laborum consectetur anim ex.</p>\n        <h3 class=\"sub-heading\">Amet Proident Commodo</h3>\n        <p>Nostrud ut mollit id anim ut amet in consectetur do excepteur consequat dolore id. Sed reprehenderit proident velit commodo magna officia elit nulla quis labore ea deserunt officia ea. Ipsum eiusmod lorem id ea eu nisi exercitation enim pariatur do ullamco veniam nostrud ad elit.</p>\n        <pre class=\"code-block\"><code>contador = 0\nenquanto contador < 3:\n    exibir(\"lorem\", contador)\n    contador = contador + 1</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Lorem ipsum dolor sit amet</span></div>\n        <p>Sunt exercitation elit id anim incididunt nulla lorem deserunt excepteur aliqua dolore quis amet exercitation. Qui in amet quis anim laboris sint magna culpa sit magna adipiscing sit sunt cillum aliqua.</p>"
        },
        {
            "num": "3.3",
            "title": "Et Laborum",
            "body": "<p>Commodo ad incididunt occaecat quis cupidatat est laboris officia ipsum non sint velit exercitation mollit officia. Aute ut pariatur consectetur sit anim pariatur ullamco nisi voluptate sint sed esse qui aliqua ea sit mollit. Sed eiusmod ex ullamco minim aliqua enim dolore excepteur excepteur laborum esse dolore exercitation esse et enim ex.</p>\n        <p>Eiusmod esse eiusmod amet ut commodo deserunt non ea aute labore. Mollit minim sint nisi laboris sed aute incididunt et consectetur tempor minim aute consectetur ad et quis. Non irure incididunt officia ipsum excepteur qui ullamco nostrud ullamco excepteur consequat ut nostrud.</p>\n        <pre class=\"code-block\"><code>contador = 0\nenquanto contador < 3:\n    exibir(\"lorem\", contador)\n    contador = contador + 1</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Lorem: 42</span></div>\n        <p>Magna irure est quis sed eu commodo consequat velit cupidatat qui culpa ut consectetur magna deserunt et.</p>"
        }
    ]
});
}

function buildModule4(){
  renderModule({
    "id": "m4",
    "eyebrow": "Aplicação",
    "title": "Módulo 04",
    "desc": "Duis culpa occaecat cillum sint elit occaecat sunt aliqua aliqua magna irure magna.",
    "sections": [
        {
            "num": "4.1",
            "title": "Lorem Amet Exercitation",
            "body": "<div class=\"objectives\"><span class=\"objectives-label\">Objetivos</span><ul><li>Laborum nisi et cupidatat adipiscing labore do do.</li><li>Id proident pariatur fugiat esse.</li><li>Consectetur aute occaecat dolor lorem cupidatat sed labore.</li></ul></div>\n        <p>Est sed velit dolore consequat velit laboris fugiat sint elit adipiscing amet enim consequat. Nostrud dolore labore cupidatat reprehenderit lorem lorem duis enim aliquip magna est ad.</p>\n        <p>Consequat et aute et ipsum est ullamco nulla esse enim sit ipsum incididunt ea officia eu esse. Consectetur dolore labore cillum laboris anim quis labore ea dolor fugiat minim nulla ullamco quis eu.</p>\n        <pre class=\"code-block\"><code>funcao exemplo(a, b):\n    retornar a + b\n\nexibir(exemplo(2, 3))</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">lorem\nipsum\ndolor</span></div>\n        <p>Excepteur culpa commodo amet ut ea laborum incididunt enim occaecat proident incididunt labore aliquip.</p>"
        },
        {
            "num": "4.2",
            "title": "Dolore Sint",
            "body": "<p>Id voluptate ea voluptate tempor deserunt labore ea ullamco mollit cillum. Id reprehenderit do anim exercitation sit ut ipsum laborum reprehenderit. Ullamco sit nulla sit tempor exercitation nisi deserunt nulla officia ad pariatur.</p>\n        <h3 class=\"sub-heading\">Anim Eiusmod</h3>\n        <p>Tempor esse anim consequat excepteur aliquip dolor enim cillum pariatur nostrud sunt quis. Nisi eiusmod adipiscing lorem consectetur magna consectetur veniam ullamco est officia elit aute est sint. Nostrud veniam occaecat proident enim proident non laboris consectetur sit nulla ex incididunt.</p>\n        <pre class=\"code-block\"><code>contador = 0\nenquanto contador < 3:\n    exibir(\"lorem\", contador)\n    contador = contador + 1</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Status: concluído</span></div>\n        <p>Quis excepteur deserunt ex ipsum velit ullamco et non velit occaecat exercitation dolor nostrud dolor.</p>"
        },
        {
            "num": "4.3",
            "title": "Amet Non Mollit",
            "body": "<p>Incididunt excepteur amet deserunt reprehenderit minim quis magna minim est est voluptate dolor dolore. Anim magna enim lorem pariatur sint reprehenderit mollit non velit id id amet ipsum proident.</p>\n        <h3 class=\"sub-heading\">Nulla Est Aliquip</h3>\n        <p>Mollit laboris proident ea sed anim ea tempor lorem non anim excepteur enim proident. Reprehenderit et ad qui ad aliquip quis cupidatat cupidatat reprehenderit consectetur commodo. Exercitation sint eiusmod et ullamco amet esse dolor ex aute duis ad eiusmod.</p>\n        <pre class=\"code-block\"><code>funcao exemplo(a, b):\n    retornar a + b\n\nexibir(exemplo(2, 3))</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Lorem ipsum dolor sit amet</span></div>\n        <p>Voluptate consectetur ut adipiscing ullamco ea nulla laborum nisi tempor labore sed ullamco aliquip.</p>"
        }
    ]
});
}

function buildModule5(){
  renderModule({
    "id": "m5",
    "eyebrow": "Síntese",
    "title": "Módulo 05",
    "desc": "Sunt veniam voluptate sint dolore eiusmod ad deserunt.",
    "sections": [
        {
            "num": "5.1",
            "title": "Dolore Excepteur Dolore",
            "body": "<div class=\"objectives\"><span class=\"objectives-label\">Objetivos</span><ul><li>Nisi et tempor et et do.</li><li>Officia mollit in incididunt ad amet exercitation.</li><li>Et commodo consequat labore esse non adipiscing.</li></ul></div>\n        <p>Adipiscing lorem ex officia proident labore sunt nisi mollit quis. Officia aliqua labore elit sit incididunt reprehenderit laborum proident in. Anim amet quis commodo qui tempor nisi reprehenderit dolore occaecat occaecat cillum id.</p>\n        <h3 class=\"sub-heading\">Ut Dolor Quis</h3>\n        <p>Dolor ut dolore dolor reprehenderit pariatur esse mollit ut proident lorem proident. Ullamco eu quis tempor voluptate enim amet ut dolor cupidatat ea aute ex amet ullamco. Cupidatat exercitation cillum aute do velit duis consectetur esse eiusmod exercitation.</p>\n        <pre class=\"code-block\"><code>contador = 0\nenquanto contador < 3:\n    exibir(\"lorem\", contador)\n    contador = contador + 1</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Status: concluído</span></div>\n        <p>Ullamco est sit enim excepteur irure officia veniam ullamco ullamco ipsum qui occaecat non. Esse incididunt exercitation pariatur exercitation ut id lorem laboris deserunt eiusmod laboris elit proident consectetur.</p>"
        },
        {
            "num": "5.2",
            "title": "Irure Officia Quis",
            "body": "<p>Sed lorem sit aute do esse non mollit exercitation consectetur irure voluptate. Excepteur commodo eiusmod do veniam aliqua eiusmod consequat eiusmod anim amet adipiscing nostrud ea sint. Enim sed sunt id dolor laborum mollit ex ad sit reprehenderit anim velit.</p>\n        <h3 class=\"sub-heading\">Velit Cupidatat</h3>\n        <p>Voluptate culpa incididunt sunt ex tempor irure ut dolor exercitation id consequat eiusmod nostrud veniam elit. Et laborum pariatur proident deserunt incididunt dolor officia aute sunt sint eu.</p>\n        <pre class=\"code-block\"><code>variavel = \"lorem ipsum\"\nexibir(variavel)</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Lorem: 42</span></div>\n        <p>Reprehenderit aliquip aute culpa velit occaecat enim esse ullamco enim in et laboris nostrud cillum quis.</p>"
        },
        {
            "num": "5.3",
            "title": "Commodo Nisi Tempor",
            "body": "<p>Voluptate ea aliquip et nisi sint voluptate occaecat proident aliquip. Non ex exercitation adipiscing amet sed veniam laboris quis consectetur non nisi.</p>\n        <p>Velit sed consectetur anim pariatur ad occaecat pariatur commodo consectetur. Sint commodo deserunt nostrud esse id cupidatat sed ipsum culpa.</p>\n        <pre class=\"code-block\"><code>variavel = \"lorem ipsum\"\nexibir(variavel)</code></pre>\n        <div class=\"output-block\"><span class=\"output-label\">Saída</span><span class=\"output-text\">Lorem ipsum dolor sit amet</span></div>\n        <p>Laborum officia ea aliqua est non mollit cupidatat eiusmod eu cupidatat pariatur.</p>"
        }
    ]
});
}
