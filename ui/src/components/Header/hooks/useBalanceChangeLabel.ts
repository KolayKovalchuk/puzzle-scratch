import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectLastAmountChange, selectPrizeLabelCounter } from '@store/selectors/appState.selectors';

export function useBalanceChangeLabel(className: string) {
    const lastAmountChange = useSelector(selectLastAmountChange);
    const prizeLabelCounter = useSelector(selectPrizeLabelCounter);

    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!labelRef.current) return;
        if (!lastAmountChange) {
            return;
        }

        labelRef.current.classList.remove(className);
        setTimeout(() => {
            if (!labelRef.current) return;
            labelRef.current.classList.add(className);
        }, 0);

    }, [prizeLabelCounter]);

    const roundedAmountChange = Number.isInteger(lastAmountChange) ? lastAmountChange : lastAmountChange.toFixed(2);
    const lastWinLabel = lastAmountChange > 0 ? '+' + roundedAmountChange : roundedAmountChange.toString();

    return {
        lastWinLabel: lastWinLabel,
        labelRef,
    }
}