
import { CopyButton } from '@components/shared/Button/CopyButton';
import { Icon } from '@components/shared/Icon';
import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon';
import { SupportedDepositWallets, useDepositAddress } from '@services/api/depositWithdrawal.service';
import { iconSign, selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './DepositWithTransferBody.module.scss';

import { Dropdown, IDropdownItem } from '@components/shared/Dropdown';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';

const supportedDepositWallets: IDropdownItem[] = Object.values(SupportedDepositWallets)
    .map<IDropdownItem>((wallet) => {
        return {
            text: wallet,
            icon: null,
            data: wallet
        }
    });

export interface IDepositWithTransferBodyProps {
}

export function DepositWithTransferBody({ }: IDepositWithTransferBodyProps) {
    const walletLabel = useSelector(selectLocalValue('txt.transfer.wallet'))
    const currencyLabel = useSelector(selectLocalValue('txt.wallet.currency'))
    const tagLabel = useSelector(selectLocalValue('txt.transfer.tag'))

    const [selectedWallet, setSelectedWallet] = useState<IDropdownItem>(supportedDepositWallets[0]);
    const { depositAddress, loading } = useDepositAddress(selectedWallet.data);
    const transferTermsLabel = useSelector(selectLocalValueWithVars(
        'txt.transfer.terms',
        depositAddress?.minDeposit || '',
        selectedWallet.text,
    ));
    const transferTermsFirstItemLabel = useSelector(selectLocalValueWithVars(
        'txt.transfer.terms.firstItem',
        selectedWallet.data || '',
        depositAddress?.rate || '',
    ));

    const transferTermsMarkedList = useMemo(() => {
        const partials = transferTermsLabel.split('•').filter(Boolean);
        const isRbaxWallet = selectedWallet.data === SupportedDepositWallets.RBAX;
        const iconPartials = transferTermsFirstItemLabel.split(iconSign);

        return (
            <ul className={styles.list}>
                {!isRbaxWallet && <li className={styles.listItem}>
                    <div className={styles.roboTokenIconListItemContainer}>
                        <span>{iconPartials[0]}</span>
                        <Icon className={styles.roboTokenIcon} name={robo_token_gold_no_shining} />
                        <span>{iconPartials[1]}</span>
                    </div>
                </li>}
                {partials.map((partial, index) => {
                    return (
                        <li key={index} className={styles.listItem}>{partial}</li>
                    );
                })}
            </ul>
        )

    }, [transferTermsLabel, transferTermsFirstItemLabel]);


    const getWalletAddress = useCallback(() => {
        return depositAddress?.address || '';
    }, [depositAddress?.address]);

    const getTagAddress = useCallback(() => {
        return depositAddress?.memo.toString() || '';
    }, [depositAddress?.memo]);

    const preselectedWallet = useMemo(() => {
        return supportedDepositWallets.find((wallet) => wallet.data === depositAddress?.coin);
    }, [depositAddress?.coin]);

    const onWalletSelect = useCallback((wallet: IDropdownItem) => {
        console.log('Selected wallet:', wallet);
        setSelectedWallet(wallet);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.column}>
                    <span className={styles.label}>{currencyLabel}</span>
                </div>
                <Dropdown
                    className={styles.dropdown}
                    items={supportedDepositWallets}
                    selectedItem={preselectedWallet}
                    onSelect={onWalletSelect}
                />
            </div>
            {loading
                ? <SpinnerIcon name={robo_token_gold_no_shining} className={styles.spinnerIcon} />
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
