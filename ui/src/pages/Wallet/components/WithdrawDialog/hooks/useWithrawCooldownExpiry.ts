import { selectWithdrawCooldownExpiry } from '@store/selectors/appState.selectors';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WithdrawalRequestStatus } from '../WithdrawDialog';

function _getIsCooldownExpired(cooldownExpiry: number) {
    const currentTimestamp = Date.now();
    return cooldownExpiry < currentTimestamp;
}

export function useIsCooldownExpired() {
    const withdrawalCooldownExpiry = useSelector(selectWithdrawCooldownExpiry);
    const [ isCooldownExpired, setIsCooldownExpired ] = useState(true);

    useEffect(() => {
        if (withdrawalCooldownExpiry === null) {
            setIsCooldownExpired(true);
            return;
        }

        const isCooldownExpired = _getIsCooldownExpired(withdrawalCooldownExpiry);
        setIsCooldownExpired(isCooldownExpired);
    }, [withdrawalCooldownExpiry]);

    return { isCooldownExpired };
}

export function useWithrawCooldownExpiry(setWithdrawalStatus: Dispatch<SetStateAction<WithdrawalRequestStatus>>) {
    const { isCooldownExpired } = useIsCooldownExpired();

    useEffect(() => {
        if (!isCooldownExpired) {
            setWithdrawalStatus(WithdrawalRequestStatus.WithdrawCooldownPeriod);
        }
    }, [isCooldownExpired]);

    const onWithrawCooldownExpiry = useCallback(() => {
        setWithdrawalStatus(WithdrawalRequestStatus.NotSent);
    }, []);

    return { onWithrawCooldownExpiry, isCooldownExpired };
}