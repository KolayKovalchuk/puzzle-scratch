import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { onStartCommand } from './commands/start/start.command';
import { Update } from 'telegraf/types';

dotenv.config();

const TELEGRAM_WEB_HOOK_URL = process.env.TELEGRAM_WEB_HOOK_URL;
const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = Number(process.env.PORT) || 3000;

if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
if (!TELEGRAM_WEB_HOOK_URL) throw new Error('"TELEGRAM_WEB_HOOK_URL" env var is required!');

export const bot = new Telegraf(BOT_TOKEN || '');

bot.start(onStartCommand);

const webhookPath = 'telegramWebhook';
const webhookConfig: Telegraf.LaunchOptions['webhook'] = {
    domain: TELEGRAM_WEB_HOOK_URL,
    path: webhookPath,
}

if (PORT) {
    webhookConfig.port = PORT;
}

export async function startBot() {
    console.log('Starting bot...');
    if (!bot.botInfo) {
        bot.botInfo = await bot.telegram.getMe();
        console.log('Bot info:', bot.botInfo);

        await bot.launch({ webhook: webhookConfig });
        console.log("Bot started");
        
        const webHookInfo = await bot.telegram.getWebhookInfo()
        console.log('Webhook info:', webHookInfo);
    }
}

export function setWebhookUrl() {
    return bot.telegram.setWebhook(`${TELEGRAM_WEB_HOOK_URL}`);
}

export async function handleWebhookUpdate(update: Update) {
    console.log('handleWebhookUpdate');
    await bot.handleUpdate(update);
}
