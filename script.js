const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(
  ".section-heading, .about-content, .toolkit-content, .project-card, .work-heading"
);

revealTargets.forEach((item) => item.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((item) => observer.observe(item));
} else {
  revealTargets.forEach((item) => item.classList.add("visible"));
}

/* ===== Split hero headline into animated words ===== */
(() => {
  const h1 = document.querySelector(".hero h1");
  if (!h1) return;
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(" "));
          const w = document.createElement("span");
          w.className = "w";
          const inner = document.createElement("span");
          inner.className = "wi";
          inner.style.setProperty("--i", i++);
          inner.textContent = part;
          w.appendChild(inner);
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
    });
  };
  walk(h1);
})();

/* ===== Staggered reveal ===== */
document.querySelectorAll(".project-card").forEach((c, idx) => (c.style.transitionDelay = `${(idx % 2) * 0.12}s`));

/* ===== Scroll progress ===== */
const bar = document.querySelector(".scroll-progress");
const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (bar) bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;

/* ===== Cursor glow ===== */
const glow = document.querySelector(".cursor-glow");
const mouse = { x: innerWidth / 2, y: innerHeight / 2, tx: innerWidth / 2, ty: innerHeight / 2, active: false };
addEventListener("pointermove", (e) => {
  mouse.tx = e.clientX;
  mouse.ty = e.clientY;
  mouse.active = true;
});

/* ===== Interactive warping grid ===== */
const canvas = document.getElementById("grid-canvas");
const ctx = canvas.getContext("2d");
const GAP = 28, STEP = 20, RADIUS = 90;
let W, H, dpr, ripples = [];

const resize = () => {
  dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth;
  H = innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};
resize();
addEventListener("resize", resize);

addEventListener("pointerdown", (e) => ripples.push({ x: e.clientX, y: e.clientY, t: 0 }));

const warp = (x, y, mx, my, time) => {
  let dx = 0, dy = 0;
  const ax = x - mx, ay = y - my;
  const d2 = ax * ax + ay * ay;
  const f = Math.exp(-d2 / (RADIUS * RADIUS));
  const d = Math.sqrt(d2) || 1;
  dx += (ax / d) * f * -3; // pull lines toward cursor
  dy += (ay / d) * f * -3;
  dx += Math.sin(y * 0.012 + time) * 0.2; // ambient wave
  dy += Math.cos(x * 0.012 + time * 0.9) * 0.2;
  for (const r of ripples) {
    const rd = Math.hypot(x - r.x, y - r.y);
    const wave = Math.exp(-Math.pow((rd - r.t * 520) / 55, 2)) * (1 - r.t);
    dx += ((x - r.x) / (rd || 1)) * wave * 3;
    dy += ((y - r.y) / (rd || 1)) * wave * 3;
  }
  return [x + dx, y + dy];
};

const drawGrid = (time) => {
  mouse.x += (mouse.tx - mouse.x) * 0.12;
  mouse.y += (mouse.ty - mouse.y) * 0.12;
  let mx = mouse.x, my = mouse.y;
  if (!mouse.active) { // ambient wandering light on touch / before first move
    mx = W / 2 + Math.cos(time * 0.0004) * W * 0.3;
    my = H / 2 + Math.sin(time * 0.0006) * H * 0.3;
  }
  if (glow) glow.style.transform = `translate(${mx}px,${my}px)`;
  ripples.forEach((r) => (r.t += 0.014));
  ripples = ripples.filter((r) => r.t < 1);

  ctx.clearRect(0, 0, W, H);
  const g = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS * 1.8);
  g.addColorStop(0, "rgba(10,10,10,.15)");
  g.addColorStop(1, "rgba(60,60,60,.05)");
  ctx.strokeStyle = g;
  ctx.lineWidth = 1;
  const t = time * 0.0012;
  ctx.beginPath();
  for (let x = 0; x <= W + GAP; x += GAP) {
    for (let y = 0; y <= H; y += STEP) {
      const [px, py] = warp(x, y, mx, my, t);
      y === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
  }
  for (let y = 0; y <= H + GAP; y += GAP) {
    for (let x = 0; x <= W; x += STEP) {
      const [px, py] = warp(x, y, mx, my, t);
      x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
  }
  ctx.stroke();
  if (!reduce) requestAnimationFrame(drawGrid);
};
requestAnimationFrame(drawGrid);

/* ===== Portrait 3D tilt ===== */
const frame = document.querySelector(".portrait-frame");
if (frame && fine && !reduce) {
  const visual = frame.parentElement;
  visual.addEventListener("pointermove", (e) => {
    const r = visual.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    frame.style.setProperty("--ry", `${px * 14}deg`);
    frame.style.setProperty("--rx", `${-py * 14}deg`);
  });
  visual.addEventListener("pointerleave", () => {
    frame.style.setProperty("--rx", "0deg");
    frame.style.setProperty("--ry", "0deg");
  });
}

/* ===== Magnetic buttons ===== */
if (fine && !reduce) {
  document.querySelectorAll(".button, .nav-contact, .contact-email").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
      el.style.setProperty("--my", `${(e.clientY - r.top - r.height / 2) * 0.25}px`);
    });
    el.addEventListener("pointerleave", () => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    });
  });
}

/* ===== Count-up stats ===== */
document.querySelectorAll("[data-count]").forEach((el) => {
  const target = +el.dataset.count;
  if (reduce || !("IntersectionObserver" in window)) return;
  el.textContent = "0";
  new IntersectionObserver((entries, o) => {
    if (!entries[0].isIntersecting) return;
    o.disconnect();
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.6 }).observe(el);
});
