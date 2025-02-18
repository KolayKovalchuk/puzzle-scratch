import { setWithdrawCooldownExpiry } from '@store/actions/appState.actions';
import store from '@store/store';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { WithdrawalRequestStatus } from '../WithdrawDialog';

export function handleWithdrawError(error: any, setWithdrawalStatus: Dispatch<SetStateAction<WithdrawalRequestStatus>>) {
    const errorMsg: string = error.response?.data?.message;

    if (error instanceof AxiosError) {
        switch (error.response?.data?.error) {
            case WithdrawalRequestStatus.InsufficientBalanceError:
                setWithdrawalStatus(WithdrawalRequestStatus.InsufficientBalanceError);
                break;
            case WithdrawalRequestStatus.ValidationErrorError:
                if (errorMsg && errorMsg.includes('The minimum amount to withdraw')) {
                    setWithdrawalStatus(WithdrawalRequestStatus.WithdrawMinAmountExceeded);
                    break;
                }

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