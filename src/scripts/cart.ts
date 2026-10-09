type Item = { id: string; name: string; price: number; image: string; qty: number };

const KEY = 'depak-cart-v1';
const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n).replace(/ /g, ' ') + ' сом';

const drawer = document.getElementById('drawer') as HTMLElement;
const overlay = document.getElementById('overlay') as HTMLElement;
const list = document.getElementById('cart-list') as HTMLElement;
const totalEl = document.getElementById('cart-total') as HTMLElement;
const countEl = document.getElementById('cart-count') as HTMLElement;
const checkout = document.getElementById('cart-checkout') as HTMLAnchorElement;
const phone = drawer.dataset.phone ?? '';

let items: Item[] = [];
try {
  const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]');
  if (Array.isArray(raw)) items = raw.filter((i) => i && typeof i.id === 'string' && i.qty > 0);
} catch {}

const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const render = () => {
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  countEl.textContent = String(count);
  countEl.hidden = count === 0;
  totalEl.textContent = fmt(total);

  if (!items.length) {
    list.innerHTML = '<div class="drawer__empty">Корзина пока пуста.<br />Добавьте что-нибудь из коллекции.</div>';
  } else {
    list.innerHTML = items
      .map(
        (i) => `
      <div class="item" data-id="${esc(i.id)}">
        <img src="${esc(i.image)}" alt="" />
        <div>
          <div class="item__name">${esc(i.name)}</div>
          <div class="item__price">${fmt(i.price)}</div>
          <div class="qty">
            <button data-act="dec" aria-label="Меньше">−</button><span>${i.qty}</span><button data-act="inc" aria-label="Больше">+</button>
          </div>
        </div>
        <button class="item__rm" data-act="rm" aria-label="Удалить">×</button>
      </div>`,
      )
      .join('');
  }

  const lines = items.map((i, n) => `${n + 1}. ${i.name} × ${i.qty} = ${fmt(i.qty * i.price)}`);
  const text = `Здравствуйте! Хочу заказать:\n${lines.join('\n')}\nИтого: ${fmt(total)}`;
  checkout.href = items.length ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : '#';
  checkout.setAttribute('aria-disabled', String(!items.length));
};

const setOpen = (open: boolean) => {
  drawer.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('locked', open);
};

document.getElementById('cart-open')?.addEventListener('click', () => setOpen(true));
document.getElementById('cart-close')?.addEventListener('click', () => setOpen(false));
overlay.addEventListener('click', () => setOpen(false));
document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));

document.querySelectorAll<HTMLButtonElement>('[data-add]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const { id, name, price, image } = btn.dataset as Record<string, string>;
    const found = items.find((i) => i.id === id);
    if (found) found.qty++;
    else items.push({ id, name, price: Number(price), image, qty: 1 });
    save();
    render();
    btn.classList.add('done');
    setTimeout(() => btn.classList.remove('done'), 600);
  }),
);

list.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
  const row = btn?.closest<HTMLElement>('.item');
  if (!btn || !row) return;
  const item = items.find((i) => i.id === row.dataset.id);
  if (!item) return;
  const act = btn.dataset.act;
  if (act === 'inc') item.qty++;
  else if (act === 'dec') item.qty--;
  else item.qty = 0;
  items = items.filter((i) => i.qty > 0);
  save();
  render();
});

checkout.addEventListener('click', (e) => {
  if (checkout.getAttribute('aria-disabled') === 'true') e.preventDefault();
});

render();
