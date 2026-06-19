const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const APP_URL = "https://tma-hub.vercel.app/menu";

async function sendMessage(chatId, text, extra = {}) {
  const body = { chat_id: chatId, text, ...extra };
  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error("sendMessage error", e);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ ok: true });
  }

  const update = req.body;
  const msg = update?.message;
  if (!msg) return res.status(200).json({ ok: true });

  const chatId = msg.chat.id;
  const text = (msg.text || "").trim().toLowerCase();

  if (text === "/start") {
    await sendMessage(chatId, "🍽️ Добро пожаловать в TableCafe!\n\nЗаказывайте еду прямо из меню через мини-приложение.", {
      reply_markup: {
        inline_keyboard: [[{ text: "🍽️ Открыть меню", web_app: { url: APP_URL } }]],
      },
    });
  } else if (text === "/menu") {
    await sendMessage(chatId, "📋 Откройте меню:", {
      reply_markup: {
        inline_keyboard: [[{ text: "🍽️ Меню", web_app: { url: APP_URL } }]],
      },
    });
  } else if (text === "/cart") {
    await sendMessage(chatId, "🛒 Ваша корзина в мини-приложении:", {
      reply_markup: {
        inline_keyboard: [[{ text: "🛒 Открыть корзину", web_app: { url: APP_URL } }]],
      },
    });
  } else if (text === "/orders") {
    await sendMessage(chatId, "📦 История заказов в мини-приложении:", {
      reply_markup: {
        inline_keyboard: [[{ text: "📦 Мои заказы", web_app: { url: APP_URL } }]],
      },
    });
  } else if (text === "/help") {
    await sendMessage(chatId,
      "🍽️ TableCafe — заказ еды через QR-код на столике\n\n" +
      "Доступные команды:\n" +
      "/start — 🍽️ Открыть меню\n" +
      "/menu — 📋 Меню и категории\n" +
      "/orders — 📦 Мои заказы\n" +
      "/help — ❓ Помощь\n\n" +
      "Или нажмите кнопку «🍽️ Открыть меню» под полем ввода."
    );
  } else {
    await sendMessage(chatId, "🍽️ Используйте /start чтобы открыть меню TableCafe.");
  }

  res.status(200).json({ ok: true });
}
