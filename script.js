// Menú móvil
const navToggle = document.getElementById('navToggle');
const sidenav = document.getElementById('sidenav');

navToggle.addEventListener('click', () => {
  const isOpen = sidenav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

sidenav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    sidenav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
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

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid || typeof PROJECTS === 'undefined') return;

  PROJECTS.forEach((project) => {
    const card = el('article', 'project-card');

    if (project.status) {
      card.appendChild(el('p', 'project-status', project.status));
    }

    card.appendChild(el('h3', null, project.title));
    card.appendChild(el('p', 'project-desc', project.description));

    if (project.tags && project.tags.length) {
      const tags = el('div', 'tags');
      project.tags.forEach((t) => tags.appendChild(el('span', null, t)));
      card.appendChild(tags);
    }

    const links = el('div', 'project-links');
    if (project.details) {
      const more = el('button', 'btn-outline btn-detail', 'Ver detalle');
      more.type = 'button';
      more.setAttribute('aria-haspopup', 'dialog');
      more.addEventListener('click', () => openProjectDialog(project, more));
      links.appendChild(more);
    }
    if (project.code) links.appendChild(projectLink('Código →', project.code));
    if (project.demo) links.appendChild(projectLink('Demo →', project.demo));
    if (project.private) links.appendChild(el('span', 'project-private', 'Código privado'));
    if (links.children.length) card.appendChild(links);

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
    // Vacía el contenido para detener el GIF y devuelve el foco al botón
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

  if (project.status) body.appendChild(el('p', 'project-status', project.status));
  const title = el('h3', null, project.title);
  title.id = 'pdTitle';
  body.appendChild(title);
  if (d.intro) body.appendChild(el('p', 'pd-intro', d.intro));

  if (d.media && d.media.src) {
    const fig = el('figure', 'pd-media');
    const img = document.createElement('img');
    img.src = d.media.src;
    img.alt = d.media.alt || project.title;
    img.decoding = 'async';
    fig.appendChild(img);
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
  if (project.demo) actions.appendChild(projectLink('Visitar la web →', project.demo));
  if (project.code) actions.appendChild(projectLink('Código →', project.code));
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
