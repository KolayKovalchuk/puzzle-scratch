import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import styles from '../../WithdrawDialog.module.scss';

import { Fragment } from 'react';
import { Icon } from '@components/shared/Icon';
import { Input } from '@components/shared/Input/Input';
import { selectCooldownPeriodForWithdraw, selectMaxRbaXWithdraw, selectMinRbaXWithdraw } from '@store/selectors/config.selectors';
import { iconSign, selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useValidateAmount } from '../../hooks/useValidateAmount';
import { useValidateWalletAddress } from '../../hooks/useValidateWalletAddress';

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

function useTermsLabel() {
    const minRbaXWithdraw = useSelector(selectMinRbaXWithdraw);
    const maxRbaXWithdraw = useSelector(selectMaxRbaXWithdraw);
    const cooldownPeriodForWithdraw = useSelector(selectCooldownPeriodForWithdraw) || 0;
    const cooldownPeriodForWithdrawInDays = useMemo(() => (cooldownPeriodForWithdraw / (1000 * 60 * 60 * 24)).toFixed(0), [cooldownPeriodForWithdraw]);

    return useSelector(selectLocalValueWithVars(
        { localizationKey: 'txt.withdrawal.terms' },
        minRbaXWithdraw?.toString() || '',
        maxRbaXWithdraw?.toString() || '',
        cooldownPeriodForWithdrawInDays.toString() || '',
    ));
}


export function WithdrawBody({ className, onFormChange, onFormValidChange }: IWithdrawBodyProps) {
    const addInstLabel = useSelector(selectLocalValue('txt.withdrawal.addInst'));
    const walletLabel = useSelector(selectLocalValue('txt.transfer.wallet'));
    const walletPlaceholderLabel = useSelector(selectLocalValue('txt.transfer.walletPlaceholder'));
    const amountLabel = useSelector(selectLocalValue('txt.withdrawal.amount'));
    const tagLabel = useSelector(selectLocalValue('txt.transfer.tag'));
    const tagPlaceholderLabel = useSelector(selectLocalValue('txt.transfer.tagPlaceholder'));
    // const [termsPartials, setTermsPartials] = useState<string[]>([]);

    const minRbaXWithdraw = useSelector(selectMinRbaXWithdraw);
    const termsLabel = useTermsLabel();

    const listItems = useMemo(() => {
        const termsPartials = termsLabel.split('•').filter(Boolean);

        return termsPartials.map((partial, index) => {
            const iconPartials = partial.split(iconSign);

            if (iconPartials.length === 1) {
                return (
                    <li key={index} className={styles.listItem}>{partial}</li>
                );
            }

            return (
                <li key={index} className={styles.listItem}>
                    <div className={styles.roboTokenIconListItemContainer}>
                        {iconPartials.map((part, index) => {
                            if (index <= iconPartials.length - 2) {
                                return (
                                    <Fragment key={index}>
                                        <span>{part}</span>
                                        <Icon className={styles.roboTokenIcon} name={robo_token_gold_no_shining} />
                                    </Fragment>
                                );
                            }

                            return <span key={index}>{part}</span>
                        })}
                    </div>
                </li>
            );
        });
    }, [termsLabel]);

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