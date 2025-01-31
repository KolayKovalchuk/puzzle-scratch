import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import styles from '../../WithdrawDialog.module.scss';

import { Icon } from '@components/shared/Icon';
import { Input } from '@components/shared/Input/Input';
import { selectMinRbaXWithdraw } from '@store/selectors/config.selectors';
import { iconSign, selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { getIsTonAddress } from '@utils/isTonAddress';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserBalanceWithdrawable } from '@store/selectors/user.selectors';
import { useValidateWalletAddress } from '../../hooks/useValidateWalletAddress';
import { useValidateAmount } from '../../hooks/useValidateAmount';

export interface IWithdrawBodyProps {
    className?: string;
    onFormChange: (state: IWithdrawalFormState) => void;
    onFormValidChange?: (isValid: boolean) => void;
}

export interface IWithdrawalFormState {
    walletAddress: string;
    amount: string;
    tag: string;
}

export interface IFormValidState {
    walletAddress: boolean;
    amount: boolean;
}

export function WithdrawBody({ className, onFormChange, onFormValidChange }: IWithdrawBodyProps) {
    const addInstLabel = useSelector(selectLocalValue('txt.withdrawal.addInst'));
    const walletLabel = useSelector(selectLocalValue('txt.transfer.wallet'));
    const walletPlaceholderLabel = useSelector(selectLocalValue('txt.transfer.walletPlaceholder'));
    const amountLabel = useSelector(selectLocalValue('txt.withdrawal.amount'));
    const tagLabel = useSelector(selectLocalValue('txt.transfer.tag'));
    const tagPlaceholderLabel = useSelector(selectLocalValue('txt.transfer.tagPlaceholder'));
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

    const [withdrawalForm, setWithdrawalForm] = useState<IWithdrawalFormState>({
        walletAddress: '',
        amount: '',
        tag: '',
    });
    const [formValidStatus, setFormValidStatus] = useState<IFormValidState>({
        walletAddress: false,
        amount: false,
    });


    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newState = {
            ...withdrawalForm,
            [name]: value,
        }
        setWithdrawalForm(newState);
        onFormChange(newState);
    };

    useEffect(() => {
        const isFormValid = Object.values(formValidStatus).every(Boolean);

        if (onFormValidChange) {
            onFormValidChange(isFormValid);
        }

    }, [formValidStatus]);

    const { validateWalletAddress } = useValidateWalletAddress(setFormValidStatus);
    const { valudaiteAmount } = useValidateAmount(setFormValidStatus);

    return (
        <div className={`${styles.container} ${className || ''}`}>
            <div className={styles.header}>{addInstLabel}</div>

            <form className={`${styles.withdrawFormContainer}`} >
                <div className={styles.row}>
                    <div className={styles.label}>{walletLabel}</div>
                    <Input
                        name='walletAddress'
                        className={styles.value}
                        value={withdrawalForm.walletAddress}
                        onChange={onInputChange}
                        validate={validateWalletAddress}
                        placeholder={walletPlaceholderLabel}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>{amountLabel}</div>
                    <Input
                        name='amount'
                        className={styles.value}
                        type='number'
                        value={withdrawalForm.amount}
                        onChange={onInputChange}
                        validate={valudaiteAmount}
                        placeholder={minRbaXWithdraw + '' || '10'}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>{tagLabel}</div>
                    <Input
                        name='tag'
                        className={styles.value}
                        value={withdrawalForm.tag}
                        onChange={onInputChange}
                        placeholder={tagPlaceholderLabel}
                    />
                </div>
            </form>

            <ul className={styles.list}>
                {listItems}
            </ul>
        </div>
    );
}