import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectLastAmountIncrease, selectPrizeLabelCounter } from '@store/selectors/appState.selectors';

export function useBalanceChangeLabel(className: string) {
    const lastAmountIncrease = useSelector(selectLastAmountIncrease);
    const prizeLabelCounter = useSelector(selectPrizeLabelCounter);

    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!labelRef.current) return;
        if (!lastAmountIncrease) return;

        labelRef.current.classList.remove(className);
        setTimeout(() => {
            if (!labelRef.current) return;
            labelRef.current.classList.add(className);
        }, 0);

    }, [prizeLabelCounter]);

    return {
        lastWinLabel: '+' + lastAmountIncrease,
        labelRef,
    }
}