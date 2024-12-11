import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_WEB_HOOK_URL = process.env.TELEGRAM_WEB_HOOK_URL;
const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = Number(process.env.PORT) || null;

if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
if (!TELEGRAM_WEB_HOOK_URL) throw new Error('"TELEGRAM_WEB_HOOK_URL" env var is required!');

const bot = new Telegraf(BOT_TOKEN || '');

// TODO: Remove when you have a real handler
bot.start((ctx) => ctx.reply('Welcome!'));

const webhookConfig: Telegraf.LaunchOptions['webhook'] = {
    domain: TELEGRAM_WEB_HOOK_URL,
}

if (PORT) {
    webhookConfig.port = PORT;
}

bot.launch({  webhook: webhookConfig });

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
