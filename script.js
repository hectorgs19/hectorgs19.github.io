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
    if (project.code) links.appendChild(projectLink('Código →', project.code));
    if (project.demo) links.appendChild(projectLink('Demo →', project.demo));
    if (project.private) links.appendChild(el('span', 'project-private', 'Código privado'));
    if (links.children.length) card.appendChild(links);

    grid.appendChild(card);
  });
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
