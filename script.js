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

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];
  const fullText = currentPhrase;

  if (isDeleting) {
    charIndex--;
    el.textContent = fullText.substring(0, charIndex);
  } else {
    charIndex++;
    el.textContent = fullText.substring(0, charIndex);
  }

  if (!isDeleting && charIndex === fullText.length) {
    isDeleting = true;
    setTimeout(typeLoop, 2000); // Pause before deleting
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  const delay = isDeleting ? 60 : 120;
  setTimeout(typeLoop, delay);
}

typeLoop();


// Animate sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.1
});

// Observe all sections
document.querySelectorAll('.section, .timeline-content').forEach((el) => {
  observer.observe(el);
});

