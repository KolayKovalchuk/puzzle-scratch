import { useEffect, useState } from 'react';
import { WithdrawalRequestStatus } from '../WithdrawDialog';
import { IWithdrawalFormState } from '../components/WithdrawBody/WithdrawBody';

export function useIsConfirmBtnDisabled(
    withdrawalStatus: WithdrawalRequestStatus,
    withdrawalForm: IWithdrawalFormState,
    isFormValid: boolean,
) {
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);

    useEffect(() => {
        const isConfirmDisabled = withdrawalStatus === WithdrawalRequestStatus.NotSent && !isFormValid;

        setIsConfirmDisabled(isConfirmDisabled);
    }, [withdrawalForm, withdrawalStatus, isFormValid]);

    return { isConfirmDisabled };
}