// src/scripts/animations.js
// Scroll-triggered animation observers. Re-initializes on astro:page-load.

function initHeadingMaskLift() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Auto-discover all section titles and page hero titles, mark them
  document.querySelectorAll('.section-title, .page-hero-title').forEach((el) => {
    if (!el.hasAttribute('data-animate-heading')) {
      el.setAttribute('data-animate-heading', '');
    }
  });

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('heading-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  document
    .querySelectorAll('[data-animate-heading]:not(.heading-revealed)')
    .forEach((el) => obs.observe(el));
}

function initNumberStamp() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find sibling card-numbers in the same parent grid and stagger them
          const grid = entry.target.closest('.reveal-stagger, .grid-3');
          if (grid) {
            grid.querySelectorAll('.card-number:not(.stamped)').forEach((num) => {
              num.classList.add('stamped');
            });
          } else {
            entry.target.classList.add('stamped');
          }
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Observe the first card-number in each grid (stagger handled by CSS nth-child delays)
  document.querySelectorAll('.card-number:not(.stamped)').forEach((el) => {
    // Only observe the first one per grid to avoid multiple triggers
    const grid = el.closest('.reveal-stagger, .grid-3');
    if (grid && !grid.hasAttribute('data-stamp-observed')) {
      grid.setAttribute('data-stamp-observed', '');
      obs.observe(el);
    } else if (!grid) {
      obs.observe(el);
    }
  });
}

function initPullQuoteBlur() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pull-quote-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  document
    .querySelectorAll('.pull-quote:not(.pull-quote-revealed)')
    .forEach((el) => obs.observe(el));
}

function initAll() {
  initHeadingMaskLift();
  initNumberStamp();
  initPullQuoteBlur();
}

document.addEventListener('astro:page-load', initAll);
