import { ITextStyle } from 'pixi.js-legacy';
import { useEffect, useState } from 'react';

export function useGetSmallestFontSize() {
    const [depositBtnFontSize, setDepositBtnFontSize] = useState<string | number>(0);
    const [withdrawBtnFontSize, setWithdrawBtnFontSize] = useState<string | number>(0);
    const [biggestBtnFontSize, setBiggestBtnFontSize] = useState<string | number>(0);
    
    useEffect(() => {
        if (typeof depositBtnFontSize === 'string' || typeof withdrawBtnFontSize === 'string') return;
        if (depositBtnFontSize === undefined || withdrawBtnFontSize === undefined) return;

        const biggestBtnFontSize = Math.min(depositBtnFontSize, withdrawBtnFontSize);
        
        setBiggestBtnFontSize(biggestBtnFontSize);

    }, [depositBtnFontSize, withdrawBtnFontSize]);

    const [textStylesWithFontSize, setTextStylesWithFontSize] = useState<Partial<ITextStyle>>({ fontSize: 40 });

    useEffect(() => {
        if (biggestBtnFontSize) {
            setTextStylesWithFontSize({
                fontSize: biggestBtnFontSize,
            })
        }
    }, [biggestBtnFontSize]);

    return {
        depositBtnFontSize,
        withdrawBtnFontSize,
        biggestBtnFontSize,
        textStylesWithFontSize,
        setDepositBtnFontSize,
        setWithdrawBtnFontSize,
    }
}