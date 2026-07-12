// Typewriter rotation in the hero
(function () {
  const words = ["scale.", "stay up.", "talk to LLMs.", "move fast.", "don't page you at 3 AM."];
  const el = document.getElementById("typed");
  if (!el) return;
  let wordIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const word = words[wordIdx];
    charIdx += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIdx);

    let delay = deleting ? 40 : 85;
    if (!deleting && charIdx === word.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  }
  tick();
})();

// Scroll reveal
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
})();

// Count-up stats when visible
(function () {
  const nums = document.querySelectorAll(".stat-num");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();
        function step(now) {
          const p = Math.min((now - start) / duration, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((el) => observer.observe(el));
})();
