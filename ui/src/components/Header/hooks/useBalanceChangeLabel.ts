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
            labelRef.current.classList.remove(className);
            return;
        }

        labelRef.current.classList.remove(className);
        setTimeout(() => {
            if (!labelRef.current) return;
            labelRef.current.classList.add(className);
        }, 0);

    }, [prizeLabelCounter]);

    const lastWinLabel = lastAmountChange > 0 ? '+' + lastAmountChange : lastAmountChange.toString();

    return {
        lastWinLabel: lastWinLabel,
        labelRef,
    }
}