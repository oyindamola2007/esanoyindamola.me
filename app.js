/* ═══════════════════════════════════════════
   ESAN OYINDAMOLA — PORTFOLIO JS
   Particles · Typing · Reveal · Nav · Counter
═══════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   1. PARTICLE NETWORK CANVAS
────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  const COLORS = ['#7C3AED', '#A855F7', '#C084FC'];
  const COUNT  = window.innerWidth < 600 ? 55 : 100;
  const LINK_DIST = 110;
  const mouse  = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  class Particle {
    constructor() { this.init(); }
    init() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r  = Math.random() * 1.4 + 0.4;
      this.a  = Math.random() * 0.45 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      // gentle mouse pull
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 180) {
        this.vx += dx * 0.00035;
        this.vy += dy * 0.00035;
      }
      // friction
      this.vx *= 0.995;
      this.vy *= 0.995;

      this.x += this.vx;
      this.y += this.vy;

      // wrap edges
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H;
      if (this.y > H) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.a;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function buildParticles() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());
  }
  buildParticles();

  function drawLinks() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#7C3AED';
          ctx.globalAlpha = (1 - d / LINK_DIST) * 0.18;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  // Hexagon grid overlay — subtle cyber texture
  function drawHexGrid() {
    ctx.globalAlpha = 0.018;
    ctx.strokeStyle = '#A855F7';
    ctx.lineWidth = 0.5;
    const size = 46, h = size * Math.sqrt(3);
    const cols = Math.ceil(W / (size * 3)) + 2;
    const rows = Math.ceil(H / h) + 2;
    for (let r = -1; r < rows; r++) {
      for (let c = -1; c < cols; c++) {
        const x = c * size * 3 + (r % 2 === 0 ? 0 : size * 1.5);
        const y = r * h;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const ang = (Math.PI / 3) * k - Math.PI / 6;
          const px = x + size * Math.cos(ang);
          const py = y + size * Math.sin(ang);
          k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  // Animated aurora blobs
  let t = 0;
  function drawAurora() {
    const blobs = [
      { x: W * 0.15, y: H * 0.25, r: W * 0.28, color: 'rgba(124,58,237,0.04)' },
      { x: W * 0.85, y: H * 0.6,  r: W * 0.32, color: 'rgba(168,85,247,0.035)' },
      { x: W * 0.5,  y: H * 0.9,  r: W * 0.22, color: 'rgba(192,132,252,0.025)' },
    ];
    blobs.forEach((b, i) => {
      const ox = Math.sin(t * 0.0008 + i * 1.5) * 40;
      const oy = Math.cos(t * 0.0006 + i * 2.1) * 30;
      const grad = ctx.createRadialGradient(b.x + ox, b.y + oy, 0, b.x + ox, b.y + oy, b.r);
      grad.addColorStop(0, b.color);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x + ox, b.y + oy, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function animate(ts) {
    t = ts;
    ctx.clearRect(0, 0, W, H);
    drawHexGrid();
    drawAurora();
    particles.forEach(p => { p.update(); p.draw(); });
    drawLinks();
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Mouse tracking
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // cursor glow
    const glow = document.getElementById('cursorGlow');
    if (glow) {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }
  });

  // Touch tracking for mobile
  window.addEventListener('touchmove', e => {
    if (e.touches.length) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });
})();


/* ──────────────────────────────────────────
   2. TYPING ANIMATION
────────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'Frontend Developer',
    'UI/UX Enthusiast',
    'React Developer',
    'Creative Coder',
    'Problem Solver',
  ];
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const word = phrases[pi];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 105);
  }
  setTimeout(tick, 800);
})();


/* ──────────────────────────────────────────
   3. SCROLL REVEAL
────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();


/* ──────────────────────────────────────────
   4. SKILL BAR ANIMATION (no percentage)
────────────────────────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar[data-pct]');
  if (!bars.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const pct = e.target.getAttribute('data-pct');
        e.target.style.width = pct + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  bars.forEach(b => obs.observe(b));
})();


/* ──────────────────────────────────────────
   5. NAVBAR — scroll effect + active link
────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll effect
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Active section highlight
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link');

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => sectionObs.observe(s));
})();


/* ──────────────────────────────────────────
   6. HAMBURGER / MOBILE MENU
────────────────────────────────────────── */
(function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const body = document.body;
  if (!btn || !menu) return;

  function openMenu() {
    btn.classList.add('open');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.classList.remove('open');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    btn.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on link click
  document.querySelectorAll('.mob-link, .mob-cta').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on outside tap
  menu.addEventListener('click', e => {
    if (e.target === menu) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close menu on resize if desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();


/* ──────────────────────────────────────────
   7. ANIMATED STAT COUNTERS
────────────────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const dur    = 1200;
      const start  = performance.now();

      function step(now) {
        const pct = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - pct, 3); // ease-out cubic
        el.textContent = Math.round(eased * target);
        if (pct < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.8 });

  nums.forEach(n => obs.observe(n));
})();


/* ──────────────────────────────────────────
   8. SKILL CARD STAGGER REVEAL
────────────────────────────────────────── */
(function initSkillStagger() {
  const cards = document.querySelectorAll('.skill-card.reveal');
  cards.forEach(card => {
    const delay = parseInt(card.getAttribute('data-delay') || '0', 10);
    card.style.transitionDelay = (delay * 0.08) + 's';
  });
})();


/* ──────────────────────────────────────────
   9. SEND BUTTON FORM SUBMISSION
────────────────────────────────────────── */
(function initSendForm() {
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('sendBtn');
  const status = document.getElementById('formStatus');
  if (!form || !btn) return;

  form.addEventListener('submit', (e) => {
    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      btn.textContent = 'Fill required fields ✗';
      status.textContent = 'Please enter your name, email, and message.';
      status.style.color = '#f87171';
      setTimeout(() => {
        btn.textContent = 'Send Message ✦';
        status.textContent = '';
      }, 3000);
      return;
    }

    btn.textContent = 'Sending…';
    btn.disabled = true;
  });
})();


/* ──────────────────────────────────────────
   10. SMOOTH ANCHOR SCROLL
────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
