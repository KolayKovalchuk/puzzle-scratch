import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import styles from '../../WithdrawDialog.module.scss';

import { Icon } from '@components/shared/Icon';
import { Input } from '@components/shared/Input/Input';
import { selectMinRbaXWithdraw } from '@store/selectors/config.selectors';
import { iconSign, selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export interface IWithdrawBodyProps {
    className?: string;
    onFormChange: (state: IWithdrawalFormState) => void;
}

export interface IWithdrawalFormState {
    walletAddress: string;
    amount: string;
    tag: string;
}

export function WithdrawBody({ className, onFormChange }: IWithdrawBodyProps) {
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

    const [withdrawalForm, setWithdrawalForm] = useState<IWithdrawalFormState>({
        walletAddress: '',
        amount: '',
        tag: '',
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

    return (
        <div className={`${styles.container} ${className || ''}`}>
            <div className={styles.header}>{addInstLabel}</div>

            <form className={`${styles.withdrawFormContainer}`} >
                <div className={styles.row}>
                    <div className={styles.label}>{walletLabel}</div>
                    <Input name='walletAddress' className={styles.value} value={withdrawalForm.walletAddress} onChange={onInputChange} />
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>{amountLabel}</div>
                    <Input name='amount' className={styles.value} type='number' value={withdrawalForm.amount} onChange={onInputChange} />
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>{tagLabel}</div>
                    <Input name='tag' className={styles.value} value={withdrawalForm.tag} onChange={onInputChange} />
                </div>
            </form>

            <ul className={styles.list}>
                {listItems}
            </ul>
        </div>
    );
}