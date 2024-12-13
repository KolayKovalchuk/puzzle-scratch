import dotenv from 'dotenv';
dotenv.config();

import { HttpFunction } from '@google-cloud/functions-framework';
import { bot, handleWebhookUpdate, setWebhookUrl, startBot } from './bot';


export const handleWebhook: HttpFunction = async (request, response) => {
    console.log('handleWebhook');
    await handleWebhookUpdate(request.body);
    response.status(200).send('Success!');
};

export const setWebhook: HttpFunction = async (request, response) => {
    console.log('setWebhook');
    await setWebhookUrl();
    response.status(200).send('Success!');
}

if (process.env.IS_LOCAL_DEV) {
    console.log('start local bot');
    
    startBot();

    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

