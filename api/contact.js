// Vercel serverless function: принимает заявку с формы и пересылает в Telegram.
// Нужны переменные окружения: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const name = String(body.name || '').trim().slice(0, 80);
  const contact = String(body.contact || '').trim().slice(0, 80);
  const message = String(body.message || '').trim().slice(0, 1000);

  // Honeypot: боты заполняют скрытое поле — молча делаем вид, что всё ок.
  if (body._honey) return res.status(200).json({ ok: true });

  if (!name || !contact || !message) {
    return res.status(400).json({ ok: false, error: 'missing_fields' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const text =
    `<b>Новая заявка с DEPAK.fashion</b>\n\n` +
    `<b>Имя:</b> ${esc(name)}\n` +
    `<b>Контакт:</b> ${esc(contact)}\n` +
    `<b>Сообщение:</b>\n${esc(message)}`;

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    if (!tg.ok) return res.status(502).json({ ok: false, error: 'telegram_failed' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'telegram_unreachable' });
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
