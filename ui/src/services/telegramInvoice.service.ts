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

    WebApp.openInvoice(purchaseResponse.invoiceData.invoiceUrl, invoiceStatusHanlder);
}

export function useConvertStarsFromRbax() {
    const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatuses | null>(null);

    const convertStarsFromRbaxCb = useCallback((option: IStarsConvertOption) => {
        convertStarsFromRbax(option, (status) => {
            setInvoiceStatus(status);
        });
    }, []);

    return {
        convertStarsFromRbax: convertStarsFromRbaxCb,
        invoiceStatus,
    }
}
