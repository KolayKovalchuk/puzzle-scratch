import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectScratchCardTransitionTimeout } from '@store/selectors/config.selectors';
import { selectLastWin } from '@store/selectors/game.selectors';
import { selectUserBalanceRbax } from '@store/selectors/user.selectors';

let timeout: NodeJS.Timeout | null = null

export function useBalanceChangeLabel() {
    const scratchCardTransitionTimeout = useSelector(selectScratchCardTransitionTimeout);
    const lastWin = useSelector(selectLastWin);

    const amount = useSelector(selectUserBalanceRbax) || 0;

    const [isLabelVisible, setIsLabelVisible] = useState(false);

    useEffect(() => {
        console.log('lastWin', lastWin);
        
        if (lastWin) {
            setIsLabelVisible(true);

            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            timeout = setTimeout(() => {
                setIsLabelVisible(false);
            }, scratchCardTransitionTimeout);
        }
    }, [lastWin, amount]);

    return {
        lastWinLabel: '+' + lastWin,
        isLabelVisible,
    }
}