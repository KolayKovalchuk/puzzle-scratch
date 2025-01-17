import { updateUserBalanceWithChangeAnimation } from '@store/actions/user.actions';
import store from '@store/store';
import WebApp from '@twa-dev/sdk';
import { InvoiceStatuses } from '@twa-dev/types';
import { useCallback, useState } from 'react';
import { getStarsConvertResult, IPostConvertStarsResponse, IStarsConvertOption, postConvertStars } from './api/purchase.service';

function hadnleUnsuccessPurchase(purchaseResponse: IPostConvertStarsResponse) {
    // Handle the unsuccess purchase here
}

export async function convertStarsFromRbax(option: IStarsConvertOption, invoiceStatusHanlder: (status: InvoiceStatuses, invoiceId: string) => void) {
    const purchaseResponse = await postConvertStars(option);

    if (!purchaseResponse.success) {
        return hadnleUnsuccessPurchase(purchaseResponse);
    }

    const invoiceUrl = purchaseResponse.invoiceData.invoiceUrl
    console.log('Purchase response:', purchaseResponse);
    console.log('invoiceUrl', invoiceUrl);
    
    WebApp.openInvoice(invoiceUrl, (status) => {
        invoiceStatusHanlder(status, purchaseResponse.invoiceData.invoiceId);
    });
}

export function useConvertStarsFromRbax() {
    const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatuses | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [balanceChange, setBalanceChange] = useState<number | null>(null);
    const [isPaid, setIsPaid] = useState<boolean>(false);

    const convertStarsFromRbaxCb = useCallback(async (option: IStarsConvertOption) => {
        setIsLoading(true);
        await convertStarsFromRbax(option, async (status, invoiceId: string) => {
            if (status === 'paid') {
                const reposponse = await getStarsConvertResult(invoiceId);

                setIsPaid(!!reposponse?.paid);

                if (reposponse?.paid) {
                    setBalanceChange(reposponse?.balanceUpdate.rbaxDelta);
                }

                if (reposponse?.balanceUpdate.rbaxDelta) {
                    store.dispatch(updateUserBalanceWithChangeAnimation(
                        { total: reposponse?.balanceUpdate.rbaxBalance },
                        reposponse?.balanceUpdate.rbaxDelta,
                    ));
                }
            }

            setInvoiceStatus(status);
            setIsLoading(false);
        });
    }, []);

    return {
        convertStarsFromRbaxCb,
        invoiceStatus,
        isPaid,
        balanceChange,
        isLoading
    }
}
