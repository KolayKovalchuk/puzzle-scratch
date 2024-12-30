import { Context } from 'telegraf';
import { Update } from 'telegraf/types';
import { validatePurchase } from '../../services/api/purchase.service';

export async function onPreCheckoutQuery(ctx: Context<Update.PreCheckoutQueryUpdate>) {
    const preCheckoutQuery = ctx.update.pre_checkout_query;
    const payload = preCheckoutQuery.invoice_payload;

    console.log('Received pre_checkout_query:', preCheckoutQuery);

    try {
        console.log('Sending validation request to Puzzle Game Service with payload:', payload);
        const isValidPurchase = await validatePurchase(payload);
        console.log('Validation response from Puzzle Game Service:', isValidPurchase);

        if (isValidPurchase) {
            console.log('Purchase is valid. Responding to Telegram.');
            await ctx.answerPreCheckoutQuery(true);
        } else {
            console.log('Purchase is invalid. Responding to Telegram with error.');
            await ctx.answerPreCheckoutQuery(false, 'Invalid purchase.');
        }
    } catch (error) {
        console.error('Error validating purchase:', error);
        await ctx.answerPreCheckoutQuery(false, 'Error validating purchase.');
    }
}
