import { setWithdrawCooldownExpiry } from '@store/actions/appState.actions';
import store from '@store/store';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { WithdrawalRequestStatus } from '../WithdrawDialog';

export function handleWithdrawError(error: any, setWithdrawalStatus: Dispatch<SetStateAction<WithdrawalRequestStatus>>) {
    if (error instanceof AxiosError) {
        const errorMsg: string = error.response?.data?.message;
        if (errorMsg && errorMsg.includes('amount to withdraw')) {
            setWithdrawalStatus(WithdrawalRequestStatus.WithdrawMinAmountExceeded);
            return;
        }

        switch (error.response?.data?.error) {
            case WithdrawalRequestStatus.InsufficientBalanceError:
                setWithdrawalStatus(WithdrawalRequestStatus.InsufficientBalanceError);
                break;
            case WithdrawalRequestStatus.ValidationErrorError:
                setWithdrawalStatus(WithdrawalRequestStatus.ValidationErrorError);
                break;
            case WithdrawalRequestStatus.WithdrawCooldownPeriod:
                setWithdrawalStatus(WithdrawalRequestStatus.WithdrawCooldownPeriod);
                store.dispatch(setWithdrawCooldownExpiry(error.response?.data?.cooldownExpiry));
                break;
            default:
                setWithdrawalStatus(WithdrawalRequestStatus.DefaultError);
                break;
        }
    }
    return;
}