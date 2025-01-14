import { useEffect, useState } from 'react';
import { useGetSounds } from './usePlaySound';
import { AppSounds } from '@config/sounds';

export function useCounterAnimation(amount: number) {
    const [displayAmount, setDisplayAmount] = useState(amount);
    const { stopSound } = useGetSounds();

    useEffect(() => {
        let start = displayAmount;
        const end = amount;
        const isIncreasing = start < end;

        if (start === end) return;

        const duration = 2000;
        const totalSteps = 100;
        const stepTime = duration / totalSteps;
        const stepSize = Math.round(Math.abs(end - start) / totalSteps) || 1;

        const timer = setInterval(() => {
            if (isIncreasing) {
                start += stepSize
            } else {
                start -= stepSize
            }

            setDisplayAmount(start);
            if (
                isIncreasing && start >= end
                || !isIncreasing && start <= end
            ) {
                setDisplayAmount(end);
                clearInterval(timer);
            }
        }, stepTime);

        return () => {
            clearInterval(timer)
        };
    }, [amount]);

    useEffect(() => {
        if (amount === displayAmount) {
            console.log('stop sound');
            
            stopSound(AppSounds.CoinsCount);
        };
    }, [amount, displayAmount, stopSound]);

    return displayAmount;
}