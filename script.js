const phrases = [
  "Kenden Dilkhush",
  "Web Developer",
  "Driven Football Player",
  "Track Athlete",
  "Future Leader",
  "Aspiring Engineer",
  "Creative Problem Solver",
  "Built by Discipline",
  "Future Innovator"
];

const el = document.getElementById("typewriter");

// Respect prefers-reduced-motion
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!el) return;
  const currentPhrase = phrases[phraseIndex];
  const fullText = currentPhrase;

  if (isDeleting) {
    charIndex = Math.max(0, charIndex - 1);
    el.textContent = fullText.substring(0, charIndex);
  } else {
    charIndex = Math.min(fullText.length, charIndex + 1);
    el.textContent = fullText.substring(0, charIndex);
  }

  if (reducedMotion) {
    // if user prefers reduced motion, show final phrase and stop
    el.textContent = fullText;
    return;
  }

  if (!isDeleting && charIndex === fullText.length) {
    isDeleting = true;
    // Pause longer after completing a word
    setTimeout(typeLoop, 2000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  const base = isDeleting ? 120 : 200;
  // Check if we just typed a space - if so, pause slightly
  const lastChar = fullText.charAt(charIndex - 1);
  const wordPause = lastChar === ' ' ? 300 : 0;
  
  // vary the delay slightly for a human touch
  const jitter = Math.floor(Math.random() * 50) - 25;
  setTimeout(typeLoop, base + jitter + wordPause);
}

// Prevent layout shift: measure longest phrase and set a stable min width/height
function measureTypewriterSpace() {
  if (!el) return;
  const phrasesCopy = phrases.slice();
  // find the longest string by width using an offscreen measurement node
  const meas = document.createElement('span');
  meas.style.position = 'absolute';
  meas.style.visibility = 'hidden';
  meas.style.whiteSpace = 'nowrap';
  meas.style.font = getComputedStyle(el).font || '700 32px Inter, system-ui';
  document.body.appendChild(meas);

  let maxW = 0;
  let maxH = 0;
  for (const p of phrasesCopy) {
    meas.textContent = p;
    maxW = Math.max(maxW, meas.offsetWidth);
    maxH = Math.max(maxH, meas.offsetHeight);
  }

  // add a bit of breathing room for the caret / padding
  const padding = 32;
  // If we have a wrapper element, constrain the final width to the wrapper's
  // parent (so we never push other hero content). Apply the width to the
  // wrapper instead of the inner span. This keeps the typewriter from
  // reflowing the layout when phrases change length.
  const wrap = document.querySelector('.typewriter-wrap');
  let maxAllowed = Math.max(240, window.innerWidth - 64);
  if (wrap && wrap.parentElement) {
    const parentWidth = wrap.parentElement.clientWidth || window.innerWidth;
    // keep some gutter inside parent
    maxAllowed = Math.max(200, Math.floor(parentWidth * 0.98));
  }

  const finalW = Math.min(Math.max(maxW + padding, 200), maxAllowed);
  // apply to wrapper—we want the outer box to reserve space while the inner
  // span can remain flexible and clipped if needed.
  if (wrap) {
    wrap.style.minWidth = Math.ceil(finalW) + 'px';
  } else {
    el.style.minWidth = Math.ceil(finalW) + 'px';
  }

  // ensure the wrapper keeps a stable height so adjacent elements won't jump
  const wrapEl = document.querySelector('.typewriter-wrap');
  if (wrapEl) wrapEl.style.minHeight = Math.ceil(Math.max(maxH + 6, parseFloat(getComputedStyle(el).fontSize) * 1.1)) + 'px';

  meas.remove();
}

// Start typewriter when visible (observe wrapper instead of the raw el)
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      // measure first so layout is stable
      measureTypewriterSpace();
      // allow a tiny pause then kick off the loop
      setTimeout(() => typeLoop(), 300);
      heroObserver.unobserve(e.target);
    }
  });
},{ threshold: 0.1 });

const wrap = document.querySelector('.typewriter-wrap');
if (wrap) heroObserver.observe(wrap);

// make the measured space responsive: update on resize
window.addEventListener('resize', () => {
  // only re-measure for wider viewports to avoid mobile wrapping weirdness
  if (window.innerWidth > 760) measureTypewriterSpace();
});


// Reveal animations for sections and timeline
function setupReveals() {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        o.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section, .timeline-content, .card').forEach(el => obs.observe(el));
}

// Smooth internal link scroll
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const target = a.getAttribute('href');
      if (target.length > 1) {
        ev.preventDefault();
        // Respect user's reduced-motion preference: don't animate if they want
        // reduced motion.
        const behavior = reducedMotion ? 'auto' : 'smooth';
        document.querySelector(target)?.scrollIntoView({ behavior, block: 'start' });
      }
    });
  });
}

// Parallax and scroll effects
function setupScrollEffects() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroText = hero.querySelector('.hero-text');
    if (heroText && !reducedMotion) {
      heroText.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  measureTypewriterSpace();
  typeLoop();
  setupReveals();
  setupSmoothScroll();
  setupScrollEffects();
});

