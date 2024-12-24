import { useGetStarsConvertOptions } from '@services/api/purchase.service';

import styles from './DepositWithStarsBody.module.scss';

import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon';
import { useGetWidestChild } from '@hooks/useGetWidestChild';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import { useConvertStarsFromRbax } from '@services/telegramInvoice.service';
import { InvoiceStatuses } from '@twa-dev/types';
import { useEffect } from 'react';
import { DepositWithStarsButtons } from './DepositWithStarsButtons/DepositWithStarsButtons';
import { useSelector } from 'react-redux';
import { selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';

export interface IDepositWithStarsBodyProps {
    onIvoiceStatusChange: (status: InvoiceStatuses) => void;
}

export function DepositWithStarsBody({ onIvoiceStatusChange }: IDepositWithStarsBodyProps) {
    const { isLoading, starsConvertOptions } = useGetStarsConvertOptions();
    const { containerRef, width: btnWidth } = useGetWidestChild(isLoading);
    const { invoiceStatus, convertStarsFromRbax } = useConvertStarsFromRbax();
    const isInvoicePending = invoiceStatus === 'pending';

    const invoiceSuccessText = useSelector(selectLocalValueWithVars('shop.stars.popup.success', '1000000'))
    const invoiceFailText = useSelector(selectLocalValue('shop.stars.popup.fail'))

    useEffect(() => {
        if (invoiceStatus) {
            onIvoiceStatusChange(invoiceStatus);
        }
    }, [invoiceStatus]);

    const renderBody = () => {
        switch (invoiceStatus) {
            case 'paid':
                return <div>{invoiceSuccessText}</div>;
            case 'failed':
                return <div>{invoiceFailText}</div>;
            default:
                return (
                    <DepositWithStarsButtons
                        starsConvertOptions={starsConvertOptions}
                        onOptionSelected={convertStarsFromRbax}
                        btnWidth={btnWidth}
                        />
                );
        }
    }

    return (
        <div className={styles.container} ref={containerRef}>
            {
                isLoading || isInvoicePending ? <SpinnerIcon name={robo_token_gold_no_shining} className={styles.spinnerIcon} />
                    : renderBody()
            }
        </div>
    );
}
