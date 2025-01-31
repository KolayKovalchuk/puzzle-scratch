import { selectMinRbaXWithdraw } from '@store/selectors/config.selectors';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IFormValidState } from '../components/WithdrawBody/WithdrawBody';
import { selectUserBalanceWithdrawable } from '@store/selectors/user.selectors';

export function useValidateAmount(setFormValidStatus: Dispatch<SetStateAction<IFormValidState>>) {
    const insufficientLabel = useSelector(selectLocalValue('txt.withdrawal.insufficient'));
    const minRbaXWithdraw = useSelector(selectMinRbaXWithdraw);
    const userBalanceWithdrawable = useSelector(selectUserBalanceWithdrawable);
    
    const valudaiteAmount = useCallback((value: string) => {
        const isLowerMinRbaxWithdraw = Number(value) < Number(minRbaXWithdraw);
        const isBiggerBalanceWithdrawable = Number(value) > Number(userBalanceWithdrawable);

        if (!value || isLowerMinRbaxWithdraw || isBiggerBalanceWithdrawable) {
            setFormValidStatus((prev) => ({ ...prev, amount: false }));
            return { isValid: false, validationErrorMsg: insufficientLabel };
        }

        setFormValidStatus((prev) => ({ ...prev, amount: true }));
        return { isValid: true };
    }, [minRbaXWithdraw, insufficientLabel]);

    return {
        valudaiteAmount,
    }

}