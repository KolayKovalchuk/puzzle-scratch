import { useEffect, useState } from 'react';
import { WithdrawalRequestStatus } from '../WithdrawDialog';
import { IWithdrawalFormState } from '../components/WithdrawBody/WithdrawBody';

export function useIsConfirmBtnDisabled(withdrawalStatus: WithdrawalRequestStatus, withdrawalForm: IWithdrawalFormState) {
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);

    useEffect(() => {
        const isFormDataValid = withdrawalForm.walletAddress && withdrawalForm.amount;
        const isConfirmDisabled = withdrawalStatus === WithdrawalRequestStatus.NotSent && !isFormDataValid;

        setIsConfirmDisabled(isConfirmDisabled);
    }, [withdrawalForm, withdrawalStatus]);

    return { isConfirmDisabled };
}