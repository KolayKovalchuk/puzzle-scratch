import { useGetStarsConvertOptions } from '@services/api/purchase.service';

import styles from './DepositWithStarsBody.module.scss';

import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon';
import { useGetWidestChild } from '@hooks/useGetWidestChild';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import { useConvertStarsFromRbax } from '@services/telegramInvoice.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { InvoiceStatuses } from '@twa-dev/types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DepositWithStarsButtons } from './components/DepositWithStarsButtons/DepositWithStarsButtons';
import { DepositWithStarsSuccess } from './components/DepositWithStarsSuccess/DepositWithStarsSuccess';

export interface IDepositWithStarsBodyProps {
    onIvoiceStatusChange: (status: InvoiceStatuses) => void;
}

export function DepositWithStarsBody({ onIvoiceStatusChange }: IDepositWithStarsBodyProps) {
    const { isLoading: isGetStarsOptionLoading, starsConvertOptions } = useGetStarsConvertOptions();
    const { containerRef, width: btnWidth } = useGetWidestChild(isGetStarsOptionLoading);
    const {
        isLoading: isStarsConvertionLoading,
        invoiceStatus,
        balanceChange,
        convertStarsFromRbaxCb,
    } = useConvertStarsFromRbax();
    const isLoading = isGetStarsOptionLoading || isStarsConvertionLoading;

    const invoiceFailText = useSelector(selectLocalValue('shop.stars.popup.fail'))

    useEffect(() => {
        if (invoiceStatus) {
            onIvoiceStatusChange(invoiceStatus);
        }
    }, [invoiceStatus]);

    const renderBody = () => {
        console.log('rednerBody invoiceStatus:', invoiceStatus);
        
        switch (invoiceStatus) {
            case 'paid':
                return <DepositWithStarsSuccess balanceChange={balanceChange || 0} />;
            case 'failed':
                return <div>{invoiceFailText}</div>;
            default:
                return (
                    <DepositWithStarsButtons
                        starsConvertOptions={starsConvertOptions}
                        onOptionSelected={convertStarsFromRbaxCb}
                        btnWidth={btnWidth}
                        />
                );
        }
    }

    return (
        <div className={styles.container} ref={containerRef}>
            {
                isLoading ? <SpinnerIcon name={robo_token_gold_no_shining} className={styles.spinnerIcon} />
                    : renderBody()
            }
        </div>
    );
}
