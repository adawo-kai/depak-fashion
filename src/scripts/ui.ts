const header = document.getElementById('header') as HTMLElement;
const nav = document.getElementById('nav') as HTMLElement;
const burger = document.getElementById('burger') as HTMLElement;

// header background after scroll
const onScroll = () => header.classList.toggle('scrolled', scrollY > 40);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

// mobile menu
const setNav = (open: boolean) => {
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
};
burger.addEventListener('click', () => setNav(!nav.classList.contains('open')));
document.getElementById('nav-close')?.addEventListener('click', () => setNav(false));
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setNav(false)));

// active nav link by section
const links = [...nav.querySelectorAll<HTMLAnchorElement>('a')];
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${en.target.id}`));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
links.forEach((l) => {
  const target = document.querySelector(l.getAttribute('href') ?? '');
  if (target) spy.observe(target);
});

// reveal on scroll
const reveal = new IntersectionObserver(
  (entries, obs) =>
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        obs.unobserve(en.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));
