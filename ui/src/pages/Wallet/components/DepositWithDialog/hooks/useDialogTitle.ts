import { DepositWithDialogMode } from '@pages/Wallet/Wallet.models'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function useDialogTitle(mode: DepositWithDialogMode) {
    const depositSelectTitleText = useSelector(selectLocalValue('deposit.select.title'))
    const starsTitleText = useSelector(selectLocalValue('deposit.select.starsTitle'))
    const walletTitleText = useSelector(selectLocalValue('txt.transfer.title'))

    const invoiceSuccess = useSelector(selectLocalValue('shop.stars.popup.success.title'))
    const invoiceFail = useSelector(selectLocalValue('shop.stars.popup.fail.title'))

    const [title, setTitle] = useState('');

    useEffect(() => {
        switch (mode) {
            case DepositWithDialogMode.Select:
                setTitle(depositSelectTitleText);
                break;
            case DepositWithDialogMode.Starts:
                setTitle(starsTitleText);
                break;
            case DepositWithDialogMode.Transfer:
                setTitle(walletTitleText);
                break;
            case DepositWithDialogMode.InvoiceSuccess:
                setTitle(invoiceSuccess);
                break;
            case DepositWithDialogMode.InvoiceFailed:
                setTitle(invoiceFail);
                break;
            default:
                setTitle(depositSelectTitleText);
        }
    }, [mode, depositSelectTitleText, starsTitleText, walletTitleText]);

    return title;
}