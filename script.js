// ── Navbar scroll ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile menu ────────────────────────────────────────
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
function closeMenu() { navLinks.classList.remove('open'); }

// ── Reveal on scroll ───────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Service accordions ─────────────────────────────────
document.querySelectorAll('.service-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const detail = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    detail.classList.toggle('open', !expanded);
  });
});

// ── Contact form → mailto (via JS, sans avertissement navigateur) ─
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const d = new FormData(this);
  const subject = encodeURIComponent('Message depuis le site — ' + (d.get('nom') || ''));
  const body = encodeURIComponent(
    'Nom : '        + (d.get('nom')        || '') + '\n' +
    'Email : '      + (d.get('email')      || '') + '\n' +
    'Entreprise : ' + (d.get('entreprise') || '') + '\n' +
    'Besoin : '     + (d.get('besoin')     || '') + '\n\n' +
    'Message :\n'   + (d.get('message')    || '')
  );
  window.location.href = 'mailto:l.leyoudec@gmail.com?subject=' + subject + '&body=' + body;
});
