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

    // Build toolbar
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

    // Fetch and render markdown
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
        mdContent.innerHTML = `<div class="callout--error" style="padding:1rem;margin-top:1rem"><p>No se pudo cargar el documento. El archivo podría no existir aún.</p></div>`;
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
  html += `<div class="hero__badge">Curso práctico · .NET 8 LTS</div>`;
  html += `<h1 class="hero__title">${TITLE}</h1>`;
  html += `<p class="hero__subtitle">${SUBTITLE}</p>`;
  html += `<p class="hero__desc">${DESCRIPTION}</p>`;
  html += `<div class="hero-stats">`;
  html += `<div class="hero-stats__item"><div class="hero-stats__num">${UNITS.length}</div><div class="hero-stats__label">Módulos</div></div>`;
  const totalClasses = UNITS.reduce((s, u) => s + u.classes.length, 0);
  html += `<div class="hero-stats__item"><div class="hero-stats__num">${totalClasses}</div><div class="hero-stats__label">Clases</div></div>`;
  html += `<div class="hero-stats__item"><div class="hero-stats__num">4</div><div class="hero-stats__label">Semanas</div></div>`;
  html += `</div></section>`;

  // Units
  html += `<div class="units-grid">`;
  UNITS.forEach(u => {
    html += `<div class="unit-card ${u.id}" onclick="navigateTo('${u.classes[0].id}','doc')">`;
    html += `<div class="unit-card__num">${u.id.replace('u', 'Mód. ')}</div>`;
    html += `<div class="unit-card__title">${u.title}</div>`;
    html += `<div class="unit-card__desc">${u.desc}</div>`;
    html += `<div class="unit-card__tags">`;
    html += `<span class="unit-card__tag">${u.classes.length} clases</span>`;
    html += `<span class="unit-card__tag">${u.product}</span>`;
    html += `</div></div>`;
  });
  html += `</div>`;

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
  } else {
    showLanding();
  }
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
