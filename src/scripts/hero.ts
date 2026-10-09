const hero = document.querySelector<HTMLElement>('[data-hero]');

if (hero) {
  const slides = hero.querySelectorAll<HTMLElement>('[data-slide]');
  const contents = hero.querySelectorAll<HTMLElement>('[data-content]');
  const dots = hero.querySelectorAll<HTMLElement>('[data-dot]');
  const notes = hero.querySelectorAll<HTMLElement>('[data-note]');
  const interval = Number(hero.dataset.interval) || 6000;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  hero.style.setProperty('--dur', `${interval}ms`);

  let current = 0;
  let timer: number | undefined;

  const show = (i: number) => {
    current = (i + slides.length) % slides.length;
    [slides, contents, dots, notes].forEach((list) =>
      list.forEach((el, idx) => el.classList.toggle('active', idx === current)),
    );
  };

  const stop = () => {
    clearInterval(timer);
    hero.classList.add('paused');
  };
  const start = () => {
    clearInterval(timer);
    if (reduced) return;
    hero.classList.remove('paused');
    // re-trigger the progress bar animation
    notes[current].classList.remove('active');
    void notes[current].offsetWidth;
    notes[current].classList.add('active');
    timer = window.setInterval(() => show(current + 1), interval);
  };

  const go = (i: number) => {
    show(i);
    start();
  };

  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  notes.forEach((n, i) => n.addEventListener('click', () => go(i)));

  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  let touchX = 0;
  hero.addEventListener('touchstart', (e) => (touchX = e.touches[0].clientX), { passive: true });
  hero.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
  });

  start();
}
