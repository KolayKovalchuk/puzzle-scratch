import { Context, Markup } from 'telegraf';
import { Message, Update } from 'telegraf/types';

import { linkCodeParam } from '../../models/AppConfig.model';
import { fetchConfigData } from '../../services/api/config.service';
import { getLocalizationData, getUserLocale } from '../../services/api/localization.service';
import { selectLocalValue } from '../../utils/selectLocalValue';

function buildUrlWithParams(baseUrl: string, params: string[]): string {
    const url = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
    
    return params.reduce((acc, param, index) => {
        if (!index) {
            return acc + '?' + param;
        }

        return acc + '&' + param;
    }, url);
}

function getIsFirstMsg(ctx: Context<Update.MessageUpdate<Message.TextMessage>>) {
    return ctx.message?.message_id <= 1;
}

function getMsgKey(ctx: Context<Update.MessageUpdate<Message.TextMessage>>) {
    const [, ...params] = ctx.message.text.split(' ');
    const isIncludeRefCode = params.some(param => param.includes(`${linkCodeParam}=`));

    if (isIncludeRefCode) {
        return 'bot.start.msg1.1'
    }

    const isFirstMsg = getIsFirstMsg(ctx);

    return isFirstMsg ? 'bot.start.msg1.2' : 'bot.start.msg1.3';
}

async function getMsgText(ctx: Context<Update.MessageUpdate<Message.TextMessage>>) {
    const localizationData = await getLocalizationData();
    const config = await fetchConfigData();

    if (!config) return '';


    const userLocale = await getUserLocale(ctx.from?.id || null, config.API_URL);
    const msgKey = getMsgKey(ctx);

    const msg = selectLocalValue(localizationData, msgKey, userLocale);

    return msg;
}

export async function onStartCommand(ctx: Context<Update.MessageUpdate<Message.TextMessage>>) {
    console.log('onStartCommand');
    
    const [, ...params] = ctx.message.text.split(' ');

    console.log('params: ', params);
    const config = await fetchConfigData();

    if (!config) {
        throw new Error('Config data is not available');
    }

    const msg = await getMsgText(ctx);

    const localizationData = await getLocalizationData();


    const url = process.env.IS_LOCAL_DEV ? process.env.TELEGRAM_WEB_HOOK_URL || config.TELEGRAM_APP_DOMAIN : config.TELEGRAM_APP_DOMAIN;
    const urlWithParams = buildUrlWithParams(url, params);
    console.log('urlWithParams: ', urlWithParams);
    const btnTxt = selectLocalValue(localizationData, 'bot.ctaBtn.text', 'EN');
    
    ctx.reply(msg, Markup.inlineKeyboard([
        Markup.button.webApp(btnTxt, urlWithParams),
    ]));
}