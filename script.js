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
