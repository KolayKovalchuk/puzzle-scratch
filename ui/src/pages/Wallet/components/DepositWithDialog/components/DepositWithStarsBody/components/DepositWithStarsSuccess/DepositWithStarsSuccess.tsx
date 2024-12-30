import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon';
import { useGetUserBalance } from '@services/api/balance.service';
import { selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';
import styles from '../../DepositWithStarsBody.module.scss';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';

export function DepositWithStarsSuccess() {
    const invoiceSuccessText = useSelector(selectLocalValueWithVars('shop.stars.popup.success', '1000000'))
    console.log('invoiceSuccessText', invoiceSuccessText);
    const { isLoading } = useGetUserBalance();

    return isLoading
        ? <SpinnerIcon name={robo_token_gold_no_shining} className={styles.spinnerIcon} />
        : <div>{invoiceSuccessText}</div>;
}