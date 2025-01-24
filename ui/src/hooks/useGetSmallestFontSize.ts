import { ITextStyle } from 'pixi.js-legacy';
import { useCallback, useEffect, useState } from 'react';

export function useGetSmallestFontSize(fontSizeShift = 1) {
    const [depositBtnFontSize, setDepositBtnFontSize] = useState<string | number>(0);
    const [withdrawBtnFontSize, setWithdrawBtnFontSize] = useState<string | number>(0);
    const [smallesttBtnFontSize, setSmallesttBtnFontSize] = useState<string | number>(0);
    
    useEffect(() => {
        if (typeof depositBtnFontSize === 'string' || typeof withdrawBtnFontSize === 'string') return;
        if (depositBtnFontSize === undefined || withdrawBtnFontSize === undefined) return;

        const smallesttBtnFontSize = Math.min(depositBtnFontSize, withdrawBtnFontSize);

        setSmallesttBtnFontSize((prevFontSize => {
            if (smallesttBtnFontSize === prevFontSize) {
                return prevFontSize;
            }

            const shiftedFontSize = Math.round(smallesttBtnFontSize * fontSizeShift);
            return shiftedFontSize;
        }));

    }, [depositBtnFontSize, withdrawBtnFontSize, fontSizeShift]);

    const [textStylesWithFontSize, setTextStylesWithFontSize] = useState<Partial<ITextStyle>>({ fontSize: 40 });

    useEffect(() => {
        if (smallesttBtnFontSize) {
            setTextStylesWithFontSize({
                fontSize: smallesttBtnFontSize,
            })
        }
    }, [smallesttBtnFontSize]);

    const setDepositBtnFontSizeCb = useCallback((textSize: string | number) => {
        setDepositBtnFontSize(textSize);
    }, []);
    const setWithdrawBtnFontSizeCb = useCallback((textSize: string | number) => {
        setWithdrawBtnFontSize(textSize);
    }, []);

    return {
        depositBtnFontSize,
        withdrawBtnFontSize,
        smallesttBtnFontSize,
        textStylesWithFontSize,
        setDepositBtnFontSize: setDepositBtnFontSizeCb,
        setWithdrawBtnFontSize: setWithdrawBtnFontSizeCb,
    }
}