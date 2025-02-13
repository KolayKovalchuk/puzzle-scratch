import { selectWithdrawCooldownExpiry } from '@store/selectors/appState.selectors';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { WithdrawalRequestStatus } from '../WithdrawDialog';

export function useWithrawCooldownExpiry(setWithdrawalStatus: Dispatch<SetStateAction<WithdrawalRequestStatus>>) {
    const withdrawalCooldownExpiry = useSelector(selectWithdrawCooldownExpiry);

    useEffect(() => {
        const currentTimestamp = Date.now();
        const isCooldownExpired = withdrawalCooldownExpiry && withdrawalCooldownExpiry < currentTimestamp;
        if (!isCooldownExpired) {
            setWithdrawalStatus(WithdrawalRequestStatus.WithdrawCooldownPeriod);
        }
    }, [withdrawalCooldownExpiry]);

    const onWithrawCooldownExpiry = useCallback(() => {
        setWithdrawalStatus(WithdrawalRequestStatus.NotSent);
    }, []);

    return { onWithrawCooldownExpiry };
}