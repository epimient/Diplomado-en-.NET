/* landing.js — SPA logic */

const navStack = [];
const LABELS = { slides: 'Slides', doc: 'Documento', example: 'Ejemplo guiado', exercises: 'Ejercicios', faq: 'Dudas' };
const FILES = { slides: 'html/slides.html', doc: 'clase-{id}.md', example: 'ejemplo-guiado/README.md', exercises: 'ejercicios/ejercicio-01-basico.md', faq: 'dudas/dudas.md' };

const sidebar = document.getElementById('sidebar');
const sidebarNav = document.getElementById('sidebarNav');
const sidebarToggle = document.getElementById('sidebarToggle');
const homeBtn = document.getElementById('homeBtn');
const pathIndicator = document.getElementById('pathIndicator');

const landingView = document.getElementById('landing-view');
const markdownView = document.getElementById('markdown-view');
const mdToolbar = document.getElementById('mdToolbar');
const mdContent = document.getElementById('mdContent');
const iframeView = document.getElementById('iframe-view');
const iframeContent = document.getElementById('iframeContent');

let currentCls = null;
let currentAction = null;

function uColor(u) { return `var(--${u.color})`; }

/* === SIDEBAR === */
function buildSidebar() {
  let html = '';

  // Unidades
  UNITS.forEach(u => {
    html += `<details class="tree-unit" open><summary><span class="dot" style="background:${uColor(u)}"></span>${u.title}</summary>`;
    u.classes.forEach(c => {
      html += `<div class="tree-item" data-cls="${c.id}" data-dir="${c.dir}" onclick="navigateTo('${c.id}','doc')">`;
      html += `<span class="num">${c.id}</span><span>${c.title}</span></div>`;
      html += `<div class="tree-subs" data-cls="${c.id}">`;
      Object.keys(LABELS).forEach(action => {
        html += `<a href="#/clase-${c.id}/${action}" onclick="event.preventDefault();navigateTo('${c.id}','${action}')">${LABELS[action]}</a>`;
      });
      html += `</div>`;
    });
    html += `</details>`;
  });

  // Separador
  html += `<div class="sidebar-divider"></div>`;

  // Evaluacion
  html += `<div class="tree-item tree-item--special" onclick="showLanding();setTimeout(()=>document.getElementById('eval-section')?.scrollIntoView({behavior:'smooth'}),50)"><span class="num">E</span><span>Evaluacion</span></div>`;

  // Ejercicios
  html += `<details class="tree-unit" open><summary><span class="dot" style="background:var(--orange)"></span>Ejercicios Formativos</summary>`;
  EXERCISES.forEach(e => {
    html += `<div class="tree-item" onclick="navigateToExercise('${e.id}')">`;
    html += `<span class="num">${e.icon}</span><span>${e.title}</span></div>`;
  });
  html += `</details>`;

  // Proyecto Final
  html += `<div class="tree-item tree-item--special" onclick="navigateToProject()"><span class="num">PF</span><span>Proyecto Final</span></div>`;

  sidebarNav.innerHTML = html;
}

function highlightSidebar(cls, action) {
  document.querySelectorAll('.tree-item').forEach(el => {
    el.classList.toggle('active', el.dataset.cls === cls);
  });
  document.querySelectorAll('.tree-subs').forEach(el => {
    el.classList.toggle('active', el.dataset.cls === cls);
  });
  document.querySelectorAll('.tree-subs a').forEach(el => {
    el.classList.remove('active');
    if (el.getAttribute('href') === `#/clase-${cls}/${action}`) el.classList.add('active');
  });
}

sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('hidden'));

/* === EXERCISE & PROJECT VIEWS === */
function navigateToExercise(id) {
  sidebar.classList.remove('hidden');
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return;

  history.replaceState(null, '', `#/ejercicio-${id}`);
  document.querySelectorAll('.tree-item, .tree-subs').forEach(el => el.classList.remove('active'));
  showMarkdownView();
  pathIndicator.textContent = `Ejercicios / ${ex.title}`;
  mdToolbar.innerHTML = `<a href="#/" onclick="event.preventDefault();showLanding()">← Volver</a><span class="sep">/</span><span>Ejercicios</span><span class="sep">/</span><span>${ex.title}</span>`;

  fetch(`${ex.dir}/README.md`)
    .then(res => { if (!res.ok) throw new Error(); return res.text(); })
    .then(md => {
      let html = preprocessMarkdown(md);
      html = marked.parse(html, { breaks: true, gfm: true });
      mdContent.innerHTML = html;
      mdContent.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
    })
    .catch(() => {
      mdContent.innerHTML = `<div class="callout--error" style="padding:1rem;margin-top:1rem"><p>No se pudo cargar el enunciado del ejercicio.</p></div>`;
    });
}

function navigateToProject() {
  sidebar.classList.remove('hidden');
  history.replaceState(null, '', `#/proyecto`);
  document.querySelectorAll('.tree-item, .tree-subs').forEach(el => el.classList.remove('active'));
  showMarkdownView();
  pathIndicator.textContent = `Proyecto Final`;
  mdToolbar.innerHTML = `<a href="#/" onclick="event.preventDefault();showLanding()">← Volver</a><span class="sep">/</span><span>Proyecto Final</span>`;

  fetch(`proyecto-final-guia.md`)
    .then(res => { if (!res.ok) throw new Error(); return res.text(); })
    .then(md => {
      let html = preprocessMarkdown(md);
      html = marked.parse(html, { breaks: true, gfm: true });
      mdContent.innerHTML = html;
      mdContent.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
    })
    .catch(() => {
      mdContent.innerHTML = `<div class="callout--error" style="padding:1rem;margin-top:1rem"><p>No se pudo cargar la guia del proyecto final.</p></div>`;
    });
}

/* === NAVIGATION === */
function navigateTo(cls, action) {
  sidebar.classList.remove('hidden');
  currentCls = cls;
  currentAction = action;

  const unit = UNITS.find(u => u.classes.some(c => c.id === cls));
  const classData = unit ? unit.classes.find(c => c.id === cls) : null;
  if (!classData) return;

  history.replaceState(null, '', `#/clase-${cls}/${action}`);
  highlightSidebar(cls, action);

  if (action === 'slides') {
    showIframeView();
    pathIndicator.textContent = `${unit.title} / ${classData.title} / Slides`;
    const slidePath = `${classData.dir}/${FILES.slides}`;
    iframeContent.src = slidePath;
  } else {
    showMarkdownView();
    pathIndicator.textContent = `${unit.title} / ${classData.title} / ${LABELS[action]}`;

    const filePath = FILES[action].replace('{id}', cls);
    const fullPath = `${classData.dir}/${filePath}`;

    let toolbarHtml = `<a href="#/" onclick="event.preventDefault();showLanding()">← Volver</a><span class="sep">/</span>`;
    toolbarHtml += `<span>${unit.title}</span><span class="sep">/</span>`;
    toolbarHtml += `<span>${classData.title}</span>`;
    toolbarHtml += `<span class="sep">/</span>`;

    Object.keys(LABELS).forEach(a => {
      const active = a === action ? ' style="color:var(--cyan);font-weight:600"' : '';
      toolbarHtml += `<a href="#/clase-${cls}/${a}" onclick="event.preventDefault();navigateTo('${cls}','${a}')"${active}>${LABELS[a]}</a>`;
      if (a !== 'faq') toolbarHtml += `<span class="sep">|</span>`;
    });
    mdToolbar.innerHTML = toolbarHtml;

    fetch(fullPath)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(md => {
        let html = preprocessMarkdown(md);
        html = marked.parse(html, { breaks: true, gfm: true });
        mdContent.innerHTML = html;
        mdContent.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
      })
      .catch(() => {
        mdContent.innerHTML = `<div class="callout--error" style="padding:1rem;margin-top:1rem"><p>No se pudo cargar el documento. El archivo podria no existir aun.</p></div>`;
      });
  }

  navStack.push({ cls, action });
  homeBtn.disabled = false;
}

function preprocessMarkdown(md) {
  return md
    .replace(/:::(info|success|warning|error)/g, '<div class="callout--$1">')
    .replace(/:::/g, '</div>');
}

/* === VIEWS === */
function showLanding() {
  landingView.style.display = 'block';
  markdownView.classList.remove('show');
  iframeView.classList.remove('show');
  pathIndicator.textContent = '';
  currentCls = null;
  currentAction = null;
  document.querySelectorAll('.tree-item, .tree-subs').forEach(el => el.classList.remove('active', 'show'));
  navStack.length = 0;
  homeBtn.disabled = true;
  history.replaceState(null, '', '#/');
}

function showMarkdownView() {
  landingView.style.display = 'none';
  iframeView.classList.remove('show');
  markdownView.classList.add('show');
}

function showIframeView() {
  landingView.style.display = 'none';
  markdownView.classList.remove('show');
  iframeView.classList.add('show');
}

homeBtn.addEventListener('click', e => {
  e.preventDefault();
  showLanding();
});

/* === LANDING RENDER === */
function renderLanding() {
  let html = '<div class="landing">';

  // Hero
  html += `<section class="hero">`;
  html += `<div class="hero__badge">Curso practico · .NET 8 LTS</div>`;
  html += `<h1 class="hero__title">${TITLE}</h1>`;
  html += `<p class="hero__subtitle">${SUBTITLE}</p>`;
  html += `<p class="hero__desc">${DESCRIPTION}</p>`;
  html += `<div class="hero-stats">`;
  html += `<div class="hero-stats__item"><div class="hero-stats__num">${UNITS.length}</div><div class="hero-stats__label">Modulos</div></div>`;
  const totalClasses = UNITS.reduce((s, u) => s + u.classes.length, 0);
  html += `<div class="hero-stats__item"><div class="hero-stats__num">${totalClasses}</div><div class="hero-stats__label">Clases</div></div>`;
  html += `<div class="hero-stats__item"><div class="hero-stats__num">4</div><div class="hero-stats__label">Semanas</div></div>`;
  html += `</div></section>`;

  // Units
  html += `<div class="units-grid">`;
  UNITS.forEach(u => {
    html += `<div class="unit-card ${u.id}" onclick="navigateTo('${u.classes[0].id}','doc')">`;
    html += `<div class="unit-card__num">${u.id.replace('u', 'Mod. ')}</div>`;
    html += `<div class="unit-card__title">${u.title}</div>`;
    html += `<div class="unit-card__desc">${u.desc}</div>`;
    html += `<div class="unit-card__tags">`;
    html += `<span class="unit-card__tag">${u.classes.length} clases</span>`;
    html += `<span class="unit-card__tag">${u.product}</span>`;
    html += `</div></div>`;
  });
  html += `</div>`;

  // Evaluacion
  html += `<section class="section" id="eval-section">`;
  html += `<h2 class="section__title">Evaluacion</h2>`;
  html += `<p class="section__desc">El curso tiene <strong>4 notas</strong>. La nota final se compone de 50% formativa (promedio de 3 ejercicios) y 50% cognitiva (proyecto final grupal).</p>`;
  html += `<div class="eval-table-wrap"><table class="eval-table">`;
  html += `<tr><th>Nota</th><th>Tipo</th><th>Peso</th><th>Que evalua</th><th>Cuando</th></tr>`;
  html += `<tr><td><span class="eval-badge eval-badge--n1">N1</span></td><td>Formativa</td><td>16.66%</td><td>Validador Luhn</td><td>Domingo semana 1</td></tr>`;
  html += `<tr><td><span class="eval-badge eval-badge--n2">N2</span></td><td>Formativa</td><td>16.66%</td><td>Sistema Tareas POO</td><td>Domingo semana 2</td></tr>`;
  html += `<tr><td><span class="eval-badge eval-badge--n3">N3</span></td><td>Formativa</td><td>16.66%</td><td>API Clima + IA</td><td>Domingo semana 3</td></tr>`;
  html += `<tr><td><span class="eval-badge eval-badge--n4">N4</span></td><td>Cognitiva</td><td>50%</td><td>Proyecto Final grupal</td><td>Semana 4</td></tr>`;
  html += `</table></div>`;
  html += `<div class="eval-formula"><strong>Formula:</strong> ((N1 + N2 + N3) / 3) x 0.5 + N4 x 0.5</div>`;
  html += `<div class="eval-policy"><h3>Politica de entregas</h3><ul>`;
  html += `<li>Fecha limite: domingos 11:59 PM</li>`;
  html += `<li>Retraso: 50% de penalizacion sobre la nota</li>`;
  html += `<li>No compila con dotnet build: nota maxima 3.0</li>`;
  html += `<li>Copia entre companeros: 0 automatico</li>`;
  html += `</ul></div>`;
  html += `</section>`;

  // Ejercicios Formativos
  html += `<section class="section">`;
  html += `<h2 class="section__title">Ejercicios Formativos</h2>`;
  html += `<p class="section__desc">Tres ejercicios entregables al final de cada modulo. Solo enunciado — cada estudiante crea su proyecto desde cero.</p>`;
  html += `<div class="ex-grid">`;
  EXERCISES.forEach(e => {
    html += `<div class="ex-card" onclick="navigateToExercise('${e.id}')">`;
    html += `<div class="ex-card__badge ex-card__badge--${e.id}">${e.icon}</div>`;
    html += `<div class="ex-card__title">${e.title}</div>`;
    html += `<div class="ex-card__module">${e.module}</div>`;
    html += `<div class="ex-card__desc">${e.desc}</div>`;
    html += `</div>`;
  });
  html += `</div>`;
  html += `</section>`;

  // Proyecto Final
  html += `<section class="section">`;
  html += `<h2 class="section__title">Proyecto Final</h2>`;
  html += `<p class="section__desc">${PROJECT_INFO.desc}</p>`;
  html += `<div class="project-section">`;
  html += `<div class="project-block"><h3>Roles del equipo (4 personas)</h3><ul>`;
  html += `<li><strong>Backend / TL</strong> — Arquitectura, modelos, DbContext, endpoints</li>`;
  html += `<li><strong>API / IA</strong> — Integracion Groq, HttpClient, prompt engineering</li>`;
  html += `<li><strong>BD / DTOs</strong> — Validaciones, DTOs, LINQ, seed data, filtros</li>`;
  html += `<li><strong>Docs / QA</strong> — README, Swagger, capturas, tests valido/invalido</li>`;
  html += `</ul></div>`;
  html += `<div class="project-block"><h3>Check-ins obligatorios</h3><ul>`;
  html += `<li><strong>Check-in 1:</strong> Modelos, DbContext, migracion, 1 endpoint funcional</li>`;
  html += `<li><strong>Check-in 2:</strong> CRUD completo, IA integrada, Swagger funcionando</li>`;
  html += `<li>Penalizacion: -0.2 por cada check-in sin avance real (max -0.4)</li>`;
  html += `</ul></div>`;
  html += `<div class="project-block"><h3>Entregables</h3><ul>`;
  html += `<li>API REST funcional (CRUD + BD + IA)</li>`;
  html += `<li>Swagger con capturas (1 valido + 1 invalido por endpoint)</li>`;
  html += `<li>README.md profesional</li>`;
  html += `<li>Repositorio en GitHub</li>`;
  html += `</ul></div>`;
  html += `<div class="project-block"><h3>Problematicas sugeridas (ODS)</h3><div class="ods-grid">`;
  html += `<div class="ods-item"><span class="ods-code">ODS 11</span> Clasificador de quejas ciudadanas con IA</div>`;
  html += `<div class="ods-item"><span class="ods-code">ODS 4</span> Match tutor-estudiante vulnerable</div>`;
  html += `<div class="ods-item"><span class="ods-code">ODS 12</span> Eco-puntos: clasificador de residuos</div>`;
  html += `<div class="ods-item"><span class="ods-code">ODS 2</span> Reduccion desperdicio alimenticio</div>`;
  html += `<div class="ods-item"><span class="ods-code">ODS 2</span> Deteccion de plagas en cultivos</div>`;
  html += `<div class="ods-item"><span class="ods-code">ODS 11</span> Monitoreo de calidad del aire</div>`;
  html += `<div class="ods-item"><span class="ods-code">ODS 8</span> Marketplace local agricultor-consumidor</div>`;
  html += `<div class="ods-item"><span class="ods-code">—</span> Propio (validado con instructor)</div>`;
  html += `</div></div>`;
  html += `<div style="margin-top:1rem"><a class="project-cta" href="#/proyecto" onclick="event.preventDefault();navigateToProject()">Ver guia completa del proyecto →</a></div>`;
  html += `</div>`;
  html += `</section>`;

  // Resources
  html += `<section class="resources"><h2>Recursos</h2><div class="resources-grid">`;
  RESOURCES.forEach(r => {
    html += `<a class="resource-link" href="${r.url}" target="_blank" rel="noopener">${r.title}</a>`;
  });
  html += `</div></section>`;

  html += '</div>';
  landingView.innerHTML = html;
}

/* === HASH ROUTING === */
function handleHash() {
  const match = location.hash.match(/^#\/clase-(\d+)\/(\w+)$/);
  if (match) {
    navigateTo(match[1], match[2]);
    return;
  }
  const exMatch = location.hash.match(/^#\/ejercicio-(\d+)$/);
  if (exMatch) {
    navigateToExercise(exMatch[1]);
    return;
  }
  if (location.hash === '#/proyecto') {
    navigateToProject();
    return;
  }
  showLanding();
}

window.addEventListener('hashchange', handleHash);

/* === INIT === */
buildSidebar();
renderLanding();
if (location.hash && location.hash !== '#/' && location.hash !== '#') {
  handleHash();
} else {
  showLanding();
}
