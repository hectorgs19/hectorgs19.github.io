const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tema claro / oscuro (el tema inicial lo fija el script del <head>)
const rootEl = document.documentElement;
const themeButtons = document.querySelectorAll('.theme-toggle');

function applyTheme(theme, save) {
  rootEl.setAttribute('data-theme', theme);
  if (save) {
    try { localStorage.setItem('theme', theme); } catch (e) { /* sin almacenamiento */ }
  }
  const toLight = theme === 'dark';
  const text = toLight ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  themeButtons.forEach((btn) => {
    btn.setAttribute('aria-label', text);
    btn.title = text;
    const label = btn.querySelector('.theme-label');
    if (label) label.textContent = toLight ? 'Modo claro' : 'Modo oscuro';
  });
}

applyTheme(rootEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false);
themeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    applyTheme(rootEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
  });
});

// Menú móvil
const navToggle = document.getElementById('navToggle');
const sidenav = document.getElementById('sidenav');

const navBackdrop = document.getElementById('navBackdrop');

function setNav(open) {
  sidenav.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
}

navToggle.addEventListener('click', () => {
  setNav(!sidenav.classList.contains('open'));
});

sidenav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setNav(false));
});

// Cierra el menú al tocar fuera (fondo atenuado) o al pulsar Escape
if (navBackdrop) navBackdrop.addEventListener('click', () => setNav(false));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidenav.classList.contains('open')) {
    setNav(false);
    navToggle.focus();
  }
});

// Proyectos: genera las tarjetas a partir de PROJECTS (projects.js)
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function projectLink(label, href) {
  const a = el('a', 'btn-outline', label);
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  return a;
}

function statusLabel(project) {
  const p = el('p', 'project-status' + (project.live ? ' is-live' : ''));
  if (project.live) p.appendChild(el('span', 'live-dot'));
  p.appendChild(document.createTextNode(project.status));
  return p;
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid || typeof PROJECTS === 'undefined') return;

  PROJECTS.forEach((project) => {
    const card = el('article', 'project-card reveal' + (project.featured ? ' project-card--featured' : ''));
    let detailBtn = null;

    if (project.featured && project.cover) {
      const cover = el('button', 'project-cover');
      cover.type = 'button';
      cover.setAttribute('aria-label', 'Ver la demo de ' + project.title);
      const img = document.createElement('img');
      img.src = project.cover;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      cover.appendChild(img);
      cover.appendChild(el('span', 'project-cover-play', '▶ Ver demo'));
      if (project.details) {
        cover.addEventListener('click', () => openProjectDialog(project, cover));
      } else {
        cover.disabled = true;
      }
      card.appendChild(cover);
    }

    const content = el('div', 'project-content');
    if (project.status) content.appendChild(statusLabel(project));
    content.appendChild(el('h3', null, project.title));
    content.appendChild(el('p', 'project-desc', project.description));

    if (project.tags && project.tags.length) {
      const tags = el('div', 'tags');
      project.tags.forEach((t) => tags.appendChild(el('span', null, t)));
      content.appendChild(tags);
    }

    const links = el('div', 'project-links');
    if (project.details) {
      detailBtn = el('button', 'btn-outline btn-detail', 'Ver detalle');
      detailBtn.type = 'button';
      detailBtn.setAttribute('aria-haspopup', 'dialog');
      detailBtn.addEventListener('click', () => openProjectDialog(project, detailBtn));
      links.appendChild(detailBtn);
    }
    if (project.demo) {
      links.appendChild(projectLink(project.featured && project.demoLabel ? project.demoLabel + ' ↗' : 'Demo ↗', project.demo));
    }
    if (project.code) links.appendChild(projectLink('Código ↗', project.code));
    if (project.private) links.appendChild(el('span', 'project-private', 'Código privado'));
    if (links.children.length) content.appendChild(links);

    card.appendChild(content);
    grid.appendChild(card);
  });
}

// Ventana de detalle de un proyecto (se abre sin salir del portfolio)
let projectDialog = null;
let lastTrigger = null;

function buildProjectDialog() {
  const dialog = el('dialog', 'project-dialog');
  dialog.setAttribute('aria-labelledby', 'pdTitle');

  const closeBtn = el('button', 'pd-close', '×');
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Cerrar');
  closeBtn.addEventListener('click', () => dialog.close());
  dialog.appendChild(closeBtn);

  const body = el('div', 'pd-body');
  body.id = 'pdBody';
  dialog.appendChild(body);

  // Cierra al pulsar fuera de la ventana
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    // Vacía el contenido para detener el vídeo y devuelve el foco al botón
    body.replaceChildren();
    document.documentElement.classList.remove('dialog-open');
    if (lastTrigger) lastTrigger.focus();
  });

  document.body.appendChild(dialog);
  return dialog;
}

function openProjectDialog(project, trigger) {
  if (!projectDialog) projectDialog = buildProjectDialog();
  lastTrigger = trigger;

  const d = project.details;
  const body = projectDialog.querySelector('#pdBody');
  body.replaceChildren();

  if (project.status) body.appendChild(statusLabel(project));
  const title = el('h3', null, project.title);
  title.id = 'pdTitle';
  body.appendChild(title);
  if (d.intro) body.appendChild(el('p', 'pd-intro', d.intro));

  if (d.media && (d.media.video || d.media.src)) {
    const fig = el('figure', 'pd-media');
    let mediaEl;
    if (d.media.video) {
      mediaEl = document.createElement('video');
      mediaEl.muted = true;
      mediaEl.loop = true;
      mediaEl.playsInline = true;
      mediaEl.preload = 'auto';
      if (d.media.poster) mediaEl.poster = d.media.poster;
      mediaEl.setAttribute('aria-label', d.media.alt || project.title);
      d.media.video.forEach((src) => {
        const source = document.createElement('source');
        source.src = src;
        source.type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
        mediaEl.appendChild(source);
      });
      // Con «reducir movimiento» no arranca solo: se muestran los controles
      if (reduceMotion) {
        mediaEl.controls = true;
      } else {
        mediaEl.autoplay = true;
      }
    } else {
      mediaEl = document.createElement('img');
      mediaEl.src = d.media.src;
      mediaEl.alt = d.media.alt || project.title;
      mediaEl.decoding = 'async';
    }
    fig.appendChild(mediaEl);
    if (d.media.caption) fig.appendChild(el('figcaption', null, d.media.caption));
    body.appendChild(fig);
  }

  if (d.facts && d.facts.length) {
    const dl = el('dl', 'pd-facts');
    d.facts.forEach(([k, v]) => {
      const row = el('div');
      row.appendChild(el('dt', null, k));
      row.appendChild(el('dd', null, v));
      dl.appendChild(row);
    });
    body.appendChild(dl);
  }

  if (d.highlights && d.highlights.length) {
    const list = el('ul', 'pd-highlights');
    d.highlights.forEach((h) => {
      const li = el('li');
      li.appendChild(el('h4', null, h.title));
      li.appendChild(el('p', null, h.text));
      list.appendChild(li);
    });
    body.appendChild(list);
  }

  const actions = el('div', 'project-links pd-actions');
  if (project.demo) {
    const visit = projectLink('Visitar la web ↗', project.demo);
    visit.className = 'btn-primary';
    actions.appendChild(visit);
  }
  if (project.code) actions.appendChild(projectLink('Código ↗', project.code));
  if (project.private) actions.appendChild(el('span', 'project-private', 'Código privado'));
  body.appendChild(actions);

  document.documentElement.classList.add('dialog-open');
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}

renderProjects();

// Resaltar el enlace de la sección visible
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.sidenav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach((section) => observer.observe(section));

// Aparición suave de los bloques al hacer scroll
const revealEls = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((node) => node.classList.add('is-visible'));
} else {
  rootEl.classList.add('js-reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  revealEls.forEach((node) => revealObserver.observe(node));
}
