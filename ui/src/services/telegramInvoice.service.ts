import WebApp from '@twa-dev/sdk';
import { InvoiceStatuses } from '@twa-dev/types';
import { useCallback, useState } from 'react';
import { IPostConvertStarsResponse, IStarsConvertOption, postConvertStars } from './api/purchase.service';

function hadnleUnsuccessPurchase(purchaseResponse: IPostConvertStarsResponse) {
    // Handle the unsuccess purchase here
}

export async function convertStarsFromRbax(option: IStarsConvertOption, invoiceStatusHanlder: (status: InvoiceStatuses) => void) {
    const purchaseResponse = await postConvertStars(option);

    if (!purchaseResponse.success) {
        return hadnleUnsuccessPurchase(purchaseResponse);
    }

    const invoiceUrl = purchaseResponse.invoiceData.invoiceUrl
    console.log('Purchase response:', purchaseResponse);
    console.log('invoiceUrl', invoiceUrl);
    
    WebApp.openInvoice(invoiceUrl, invoiceStatusHanlder);
}

export function useConvertStarsFromRbax() {
    const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatuses | null>(null);

    const convertStarsFromRbaxCb = useCallback((option: IStarsConvertOption) => {
        convertStarsFromRbax(option, (status) => {
            console.log('Invoice status:', status);
            setInvoiceStatus(status);
        });
    }, []);

    return {
        convertStarsFromRbax: convertStarsFromRbaxCb,
        invoiceStatus,
    }
}
