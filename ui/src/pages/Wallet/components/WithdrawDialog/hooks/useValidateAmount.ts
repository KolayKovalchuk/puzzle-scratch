import { selectMaxRbaXWithdraw, selectMinRbaXWithdraw } from '@store/selectors/config.selectors';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IFormValidState } from '../components/WithdrawBody/WithdrawBody';
import { selectUserBalanceWithdrawable } from '@store/selectors/user.selectors';

export function useValidateAmount(setFormValidStatus: Dispatch<SetStateAction<IFormValidState>>) {
    const insufficientLabel = useSelector(selectLocalValue('txt.withdrawal.insufficient'));
    const minRbaXWithdraw = useSelector(selectMinRbaXWithdraw);
    const maxRbaXWithdraw = useSelector(selectMaxRbaXWithdraw);
    const userBalanceWithdrawable = useSelector(selectUserBalanceWithdrawable);
    
    const valudaiteAmount = useCallback((value: string) => {
        const isLowerMinRbaxWithdraw = Number(value) < Number(minRbaXWithdraw);
        const isBiggerBalanceWithdrawable = Number(value) > Number(userBalanceWithdrawable);
        const isBiggerMaxRbaXWithdraw = Number(value) > Number(maxRbaXWithdraw);

        if (!value || isLowerMinRbaxWithdraw || isBiggerBalanceWithdrawable || isBiggerMaxRbaXWithdraw) {
            setFormValidStatus((prev) => ({ ...prev, amount: false }));
            return { isValid: false, validationErrorMsg: insufficientLabel };
        }

        setFormValidStatus((prev) => ({ ...prev, amount: true }));
        return { isValid: true };
    }, [minRbaXWithdraw, maxRbaXWithdraw, insufficientLabel]);

    return {
        valudaiteAmount,
    }

}