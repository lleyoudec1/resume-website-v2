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

// ── Contact form → Formspree ───────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');

  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;

  fetch(this.action, {
    method: 'POST',
    body: new FormData(this),
    headers: { 'Accept': 'application/json' }
  })
  .then(res => {
    if (res.ok) {
      success.classList.add('visible');
      btn.textContent = 'Message envoyé ✓';
      this.reset();
    } else {
      btn.textContent = 'Erreur — réessayez';
      btn.disabled = false;
    }
  })
  .catch(() => {
    btn.textContent = 'Erreur — réessayez';
    btn.disabled = false;
  });
});
