import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RegistrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak")
    .max(100, "Ism juda uzun"),
  phone: z
    .string()
    .trim()
    .min(7, "Telefon raqam noto'g'ri")
    .max(25, "Telefon raqam juda uzun")
    .regex(/^[+\d\s()-]+$/, "Telefon raqam noto'g'ri formatda"),
  exhibitionDate: z.enum(["25-26-april", "28-29-april"], {
    message: "Sanani tanlang",
  }),
  peopleCount: z
    .number({ message: "Odamlar sonini kiriting" })
    .int()
    .min(1, "Kamida 1 kishi")
    .max(100, "Juda ko'p"),
  note: z.string().trim().max(500, "Izoh juda uzun").optional().or(z.literal("")),
});

const DATE_LABELS: Record<string, string> = {
  "25-26-april": "25–26 Aprel",
  "28-29-april": "28–29 Aprel",
};

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RegistrationSchema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!TELEGRAM_API_KEY) throw new Error("TELEGRAM_API_KEY is not configured");
    if (!TELEGRAM_CHAT_ID) throw new Error("TELEGRAM_CHAT_ID is not configured");

    const dateLabel = DATE_LABELS[data.exhibitionDate] ?? data.exhibitionDate;

    const text =
      `🇨🇳 <b>Yangi ariza — Xitoy ko'rgazmasi</b>\n\n` +
      `👤 <b>Ism:</b> ${escapeHtml(data.fullName)}\n` +
      `📞 <b>Telefon:</b> ${escapeHtml(data.phone)}\n` +
      `📅 <b>Sana:</b> ${escapeHtml(dateLabel)}\n` +
      `👥 <b>Kishi soni:</b> ${data.peopleCount}` +
      (data.note ? `\n📝 <b>Izoh:</b> ${escapeHtml(data.note)}` : "");

    const response = await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TELEGRAM_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Telegram send failed:", result);
      throw new Error(
        `Telegramga yuborishda xatolik [${response.status}]: ${JSON.stringify(result)}`,
      );
    }

    return { ok: true };
  });

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
