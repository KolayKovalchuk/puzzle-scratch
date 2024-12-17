import dotenv from 'dotenv';
dotenv.config();

import { HttpFunction } from '@google-cloud/functions-framework';
import { bot, handleWebhookUpdate, setWebhookUrl } from './bot';


export const handleWebhook: HttpFunction = async (request, response) => {
    console.log('handleWebhook');
    await handleWebhookUpdate(request.body);
    response.status(200).send('ok');
};

export const setWebhook: HttpFunction = async (request, response) => {
    console.log('setWebhook');
    await setWebhookUrl();
    response.status(200).send('ok');
}

export const getWebhook: HttpFunction = async (request, response) => {
    console.log('getWebhook');
    const webhookInfo = await bot.telegram.getWebhookInfo();
    response.status(200).send(webhookInfo);
}

if (process.env.IS_LOCAL_DEV) {
    console.log('start local bot');


    if (process.env.IS_LOCAL_DEV_WEBHOOK) {
        console.log('start local webhook');
        setWebhookUrl();
    } else {
        console.log('launch');
        bot.launch();
    }

    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

