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

async function getMsgKey(ctx: Context<Update.MessageUpdate<Message.TextMessage>>) {
    const [, ...params] = ctx.message.text.split(' ');
    const isIncludeLinkCode = params.some(param => param.includes(`${linkCodeParam}=`));
    const config = await fetchConfigData();

    if (isIncludeLinkCode) {
        const photoUrl = (config?.BOT_MSG_IMG_BASE_URL || '' )+ 'msg1_1.jpg';
        return {
            msg: 'bot.start.msg1.1',
            photoUrl: photoUrl,
        }
    }

    const isFirstMsg = getIsFirstMsg(ctx);

    return isFirstMsg
        ? {
            msg: 'bot.start.msg1.2',
            photoUrl: (config?.BOT_MSG_IMG_BASE_URL || '' )+ 'msg1_2.jpg'
         }
        : {
            msg: 'bot.start.msg1.3',
            photoUrl: (config?.BOT_MSG_IMG_BASE_URL || '' )+ 'msg1_3.jpg'
        };
}

async function getMsgText(ctx: Context<Update.MessageUpdate<Message.TextMessage>>) {
    const localizationData = await getLocalizationData();

    const userLocale = await getUserLocale(ctx.from?.id || null);

    const { msg: msgKey, photoUrl } = await getMsgKey(ctx);

    const msg = selectLocalValue(localizationData, msgKey, userLocale);

    return { msg, photoUrl };
}

export async function onStartCommand(ctx: Context<Update.MessageUpdate<Message.TextMessage>>) {
    const [, ...params] = ctx.message.text.split(' ');

    console.log('params: ', params);
    const config = await fetchConfigData();

    if (!config) {
        throw new Error('Config data is not available');
    }

    const localizationData = await getLocalizationData();

    const url = process.env.IS_LOCAL_DEV ? process.env.TELEGRAM_WEB_HOOK_URL || config.TELEGRAM_APP_DOMAIN : config.TELEGRAM_APP_DOMAIN;
    const urlWithParams = buildUrlWithParams(url, params);
    console.log('urlWithParams: ', urlWithParams);
    const btnTxt = selectLocalValue(localizationData, 'bot.ctaBtn.text', 'EN');

    const { msg, photoUrl } = await getMsgText(ctx);

    console.log('photoUrl: ', photoUrl);

    await ctx.replyWithPhoto(photoUrl, {
        caption: msg,
        reply_markup: Markup.inlineKeyboard([
            Markup.button.webApp(btnTxt, urlWithParams),
        ]).reply_markup,
    });
}