export const contacts = {
  phoneDisplay: '+996 700 110 014',
  phoneRaw: '996700110014',
  email: 'ilimalisherov2@gmail.com',
  city: 'Бишкек, Кыргызстан',
};

export const nav = [
  { href: '#top', label: 'Главная' },
  { href: '#categories', label: 'Категории' },
  { href: '#products', label: 'Товары' },
  { href: '#about', label: 'О нас' },
  { href: '#contacts', label: 'Контакты' },
];

export const heroSlides = [
  {
    eyebrow: 'осень — зима 2026',
    title: 'Ала-Тоо',
    text: 'Одежда для высокогорных походов, созданная в Бишкеке. Тепло, лёгкость и защита на любой высоте.',
    image: '/img/hero-1.jpg',
    note: 'Мембрана 20 000 мм',
  },
  {
    eyebrow: 'новая коллекция',
    title: 'Тянь-Шань',
    text: 'Пуховые парки, мембранные штормовки и мериносовые слои для высоты от 3000 метров.',
    image: '/img/hero-2.jpg',
    note: 'Мериносовая шерсть',
  },
  {
    eyebrow: 'для тех, кто выше облаков',
    title: 'Ала-Арча',
    text: 'Вещи, проверенные на маршрутах ущелья Ала-Арча: от рассвета до последнего света на перевале.',
    image: '/img/hero-3.jpg',
    note: 'Пошив в Бишкеке',
  },
  {
    eyebrow: 'ночёвки под звёздами',
    title: 'Сон-Куль',
    text: 'Тёплые слои для холодных ночей у высокогорного озера. Доставим в любой регион страны.',
    image: '/img/hero-4.jpg',
    note: 'Доставка по Кыргызстану',
  },
];

export const categories = [
  { name: 'Пуховые парки', image: '/img/cat-parks.jpg' },
  { name: 'Штормовки', image: '/img/cat-storm.jpg' },
  { name: 'Термобельё', image: '/img/cat-thermal.jpg' },
  { name: 'Гамаши и баффы', image: '/img/cat-gaiters.jpg' },
];

export const products = [
  { id: 'p-1', tag: 'Пух 800 FP', name: 'Парка «Ала-Арча»', price: 14900, image: '/img/p-parka.jpg' },
  { id: 'p-2', tag: '3-слойная мембрана', name: 'Штормовка «Сон-Куль»', price: 11200, image: '/img/p-storm.jpg' },
  { id: 'p-3', tag: 'Мериносовая шерсть', name: 'Балаклава «Чон-Кемин»', price: 1900, image: '/img/p-balaclava.jpg' },
  { id: 'p-4', tag: 'Для снега и грязи', name: 'Гамаши «Памир»', price: 2700, image: '/img/p-gaiters.jpg' },
];

export const benefits = [
  { t: 'Защита от непогоды', d: 'Мембраны и пропитки, проверенные на перевалах.', icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z' },
  { t: 'Пошив в Бишкеке', d: 'Локальное производство и контроль качества.', icon: 'M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z M12 7v6 M9 10h6' },
  { t: 'Доставка', d: 'По Бишкеку и всем регионам страны.', icon: 'M3 7h11v9H3z M14 10h4l3 3v3h-7z M7 19a1.5 1.5 0 100-.01 M17 19a1.5 1.5 0 100-.01' },
  { t: 'Поддержка 24/7', d: 'Ответим по телефону и на почту.', icon: 'M4 14v-2a8 8 0 0116 0v2 M4 14h3v5H4z M17 14h3v5h-3z' },
];

export const footCols = [
  {
    h: 'Магазин',
    items: [
      { label: 'Пуховые парки', href: '#products' },
      { label: 'Штормовки', href: '#products' },
      { label: 'Термобельё', href: '#products' },
      { label: 'Гамаши и баффы', href: '#products' },
    ],
  },
  {
    h: 'Компания',
    items: [
      { label: 'О нас', href: '#about' },
      { label: 'Коллекция', href: '#collection' },
      { label: 'Контакты', href: '#contacts' },
    ],
  },
  {
    h: 'Связаться',
    items: [
      { label: 'WhatsApp', href: `https://wa.me/${contacts.phoneRaw}` },
      { label: 'Telegram', href: `https://t.me/+${contacts.phoneRaw}` },
      { label: 'Позвонить', href: `tel:+${contacts.phoneRaw}` },
    ],
  },
];
