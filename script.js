/* ================================================
   MOHANISH KOTHAWADE — PREMIUM PORTFOLIO JS
   ===============================================*/

// ---- Custom cursor ----
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left  = mouseX + 'px';
  dot.style.top   = mouseY + 'px';
});

(function animRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
    ring.style.opacity = '0.4';
    dot.style.transform = 'translate(-50%,-50%) scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity = '0.6';
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ---- AOS ----
AOS.init({ duration: 800, once: true, offset: 80 });

// ---- Typewriter ----
const tw = document.getElementById('typewriter');
if (tw) {
  new Typewriter('#typewriter', { loop: true, delay: 70, cursor: '_' })
    .typeString('Scalable APIs')
    .pauseFor(2000).deleteAll()
    .typeString('Secure Systems')
    .pauseFor(2000).deleteAll()
    .typeString('Modern UI/UX')
    .pauseFor(2000).deleteAll()
    .typeString('Microservices')
    .pauseFor(2000).deleteAll()
    .typeString('AI-Powered Apps')
    .pauseFor(2000).deleteAll()
    .typeString('LLM Integrations')
    .pauseFor(2000).start();
}

// ---- Navbar scroll ----
const nav = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- Mobile hamburger ----
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? (spans[0].style.transform='rotate(45deg) translate(5px,5px)', spans[1].style.opacity='0', spans[2].style.transform='rotate(-45deg) translate(5px,-5px)')
      : (spans[0].style.transform='', spans[1].style.opacity='', spans[2].style.transform='');
  });
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Skill bars (IntersectionObserver) ----
const skillFills = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.progress;
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => barObserver.observe(f));

// ---- Scroll to top ----
const scrollBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---- Neural canvas animation (AI section) ----
(function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); buildNodes(); });

  function buildNodes() {
    nodes = [];
    const count = Math.floor((W * H) / 12000);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1
      });
    }
  }
  buildNodes();

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59,130,246,${0.18 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    // nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59,130,246,0.55)';
      ctx.fill();
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    animId = requestAnimationFrame(draw);
  }

  // Only run when AI section is visible (performance)
  const aiSection = document.getElementById('ai-tools');
  const canvasObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { draw(); }
      else { cancelAnimationFrame(animId); }
    });
  }, { threshold: 0.1 });
  if (aiSection) canvasObserver.observe(aiSection);
})();

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--white)' : '';
  });
}, { passive: true });
