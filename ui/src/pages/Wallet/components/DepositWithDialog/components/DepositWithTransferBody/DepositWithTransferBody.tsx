
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@components/shared/Icon';
import { CopyButton } from '@components/shared/Button/CopyButton';
import { iconSign, selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import styles from './DepositWithTransferBody.module.scss';
import { SupportedDepositWallets, useDepositAddress } from '@services/api/depositWithdrawal.service';
import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon';

import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';

export interface IDepositWithTransferBodyProps {
}

export function DepositWithTransferBody({ }: IDepositWithTransferBodyProps) {
    const walletLabel = useSelector(selectLocalValue('txt.transfer.wallet'))
    const tagLabel = useSelector(selectLocalValue('txt.transfer.tag'))
    const { depositAddress, loading } = useDepositAddress(SupportedDepositWallets.RBAX);
    const transferTermsLabel = useSelector(selectLocalValueWithVars('txt.transfer.terms', 'MOCKED RATE', depositAddress?.minDeposit || ''));

    const transferTermsMarkedList = useMemo(() => {
        const partials = transferTermsLabel.split('•').filter(Boolean);

        return (
            <ul className={styles.list}>
                {partials.map((partial, index) => {
                    if (partial.includes(iconSign)) {
                        const iconPartials = partial.split(iconSign);

                        return (
                            <li key={index} className={styles.listItem}>
                                <div className={styles.roboTokenIconListItemContainer}>
                                    <span>{iconPartials[0]}</span>
                                    <Icon className={styles.roboTokenIcon} name={robo_token_gold_no_shining} />
                                    <span>{iconPartials[1]}</span>
                                </div>
                            </li>
                        )
                    }

                    return (
                        <li key={index} className={styles.listItem}>{partial}</li>
                    );
                })}
            </ul>
        )

    }, [transferTermsLabel]);


    const getWalletAddress = useCallback(() => {
        return depositAddress?.address || '';
    }, [depositAddress?.address]);

    const getTagAddress = useCallback(() => {
        return depositAddress?.memo.toString() || '';
    }, [depositAddress?.memo]);

    return (
        <div className={styles.container}>{
            loading ? <SpinnerIcon name={robo_token_gold_no_shining} className={styles.spinnerIcon} />
                : <>
                <div className={styles.copyHeaderContaienr}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.label}>{walletLabel}</span>
                            <span className={`${styles.value} ${styles.adrresValue}`}>{getWalletAddress()}</span>
                        </div>
                        <CopyButton className={styles.btn} getCopyValue={getWalletAddress} showDialog={false} />

                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.label}>{tagLabel}</span>
                            <span className={styles.value}>{getTagAddress()}</span>
                        </div>
                        <CopyButton className={styles.btn} getCopyValue={getTagAddress} showDialog={false} />
                    </div>
                </div>
                {transferTermsMarkedList}
                </>
        }
        </div>
    );
}
