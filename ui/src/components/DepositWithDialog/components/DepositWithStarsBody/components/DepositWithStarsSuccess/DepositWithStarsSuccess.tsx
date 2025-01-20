import { selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

export  interface IDepositWithStarsSuccessProps {
    balanceChange: number;
}

export function DepositWithStarsSuccess({ balanceChange }: IDepositWithStarsSuccessProps) {
    const invoiceSuccessText = useSelector(selectLocalValueWithVars({ localizationKey: 'shop.stars.popup.success' }, balanceChange))
    console.log('invoiceSuccessText', invoiceSuccessText);

    return <div>{invoiceSuccessText}</div>
}