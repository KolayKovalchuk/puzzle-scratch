import { Context } from 'telegraf';
import { Message, Update } from 'telegraf/types';
import { notifySuccessPurchase } from '../../services/api/purchase.service';

export async function onSuccessfulPayment(ctx: Context<Update.MessageUpdate<Message.SuccessfulPaymentMessage>>) {
        const successfulPayment = ctx.update.message.successful_payment;
        const payload = successfulPayment.invoice_payload;
        const telegramPaymentChargeId = successfulPayment.telegram_payment_charge_id;
    
        console.log('Received successful_payment:', successfulPayment);
    
        try {
            console.log('Notifying Puzzle Game Service of successful purchase with payload:', payload, telegramPaymentChargeId);
            await notifySuccessPurchase(payload, telegramPaymentChargeId);
        } catch (error) {
            console.error('Error notifying Puzzle Game Service of successful purchase:', error);
        }
}
