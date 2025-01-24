import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { iconSign, selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@components/shared/Icon';

import styles from './WithdrawDialog.module.scss';

import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import { sendWithdrawalRequest, SupportedDepositWallets, useSendWithdrawalRequest } from '@services/api/depositWithdrawal.service';
import { selectMinRbaXWithdraw } from '@store/selectors/config.selectors';
import { Input } from '@components/shared/Input/Input';
import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon';

export interface IWithdrawDialogProps {
    className?: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export function WithdrawDialog({ className, isOpen, onCancel, onConfirm }: IWithdrawDialogProps) {
    const titleText = useSelector(selectLocalValue('txt.withdrawal.title'));
    const cancelBtnText = useSelector(selectLocalValue('txt.btn.close'));
    const confirmBtnText = useSelector(selectLocalValue('txt.button.withdraw'));
    const addInstLabel = useSelector(selectLocalValue('txt.withdrawal.addInst'));
    const walletLabel = useSelector(selectLocalValue('txt.transfer.wallet'));
    const amountLabel = useSelector(selectLocalValue('txt.withdrawal.amount'));
    const tagLabel = useSelector(selectLocalValue('txt.transfer.tag'));
    const [termsPartials, setTermsPartials] = useState<string[]>([]);

    const minRbaXWithdraw = useSelector(selectMinRbaXWithdraw);
    const termsFirstItemLabel = useSelector(selectLocalValueWithVars(
        { localizationKey: 'txt.withdrawal.terms' },
        minRbaXWithdraw?.toString() || '',
    ));

    useEffect(() => {
        const termsPartials = termsFirstItemLabel.split('•').filter(Boolean);
        setTermsPartials(termsPartials);
    }, [termsFirstItemLabel]);

    const listItems = useMemo(() => {
        return termsPartials.map((partial, index) => {
            if (!index) {
                const iconPartials = partial.split(iconSign);

                return (
                    <li key={index} className={styles.listItem}>
                        <div className={styles.roboTokenIconListItemContainer}>
                            <span>{iconPartials[0]}</span>
                            <Icon className={styles.roboTokenIcon} name={robo_token_gold_no_shining} />
                            <span>{iconPartials[1]}</span>
                        </div>
                    </li>
                );
            }

            return (
                <li key={index} className={styles.listItem}>{partial}</li>
            );
        });
    }, [termsPartials]);

    const [walletAddress, setWalletAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [tag, setTag] = useState('');

    const onWalletAddressChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setWalletAddress(event.target.value);
    }, []);
    const onAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    }, []);
    const onTagChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTag(event.target.value);
    }, []);


    const onCancelCb = useCallback(() => {
        onCancel();
    }, [onCancel]);

    const { sendRequest, loading } = useSendWithdrawalRequest(walletAddress, amount, tag);

    const onConfirmCb = useCallback(async () => {
        const response = sendRequest();

        console.log('Withdrawal request sent:', response);
        onConfirm();
    }, [onConfirm, sendRequest]);

    return (
        <ModalDialog
            isOpen={isOpen}
            title={titleText}
            cancelText={cancelBtnText}
            confirmText={confirmBtnText}
            onClose={onCancelCb}
            onConfirm={onConfirmCb}
            className={styles.modalDialog}
        >
            { loading && <div className={styles.spinnerIconContainer}>
                    <SpinnerIcon name={robo_token_gold_no_shining} className={styles.spinnerIcon}/>
                </div>
            }
            <div className={`${styles.container} ${loading ? styles.hidden : ''} ${className || ''}`}>
                <div className={styles.header}>{addInstLabel}</div>

                <div className={`${styles.withdrawFormContainer}`}>
                    <div className={styles.row}>
                        <div className={styles.label}>{walletLabel}</div>
                        <Input className={styles.value} onChange={onWalletAddressChange} />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>{amountLabel}</div>
                        <Input className={styles.value} value={amount} type='number' onChange={onAmountChange} />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>{tagLabel}</div>
                        <Input className={styles.value} onChange={onTagChange} />
                    </div>
                </div>

                <ul className={styles.list}>
                    {listItems}
                </ul>
            </div>
        </ModalDialog>
    );
}
