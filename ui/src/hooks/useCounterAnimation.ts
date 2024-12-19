import { useEffect, useState } from 'react';

export function useCounterAnimation(amount: number) {
    const [displayAmount, setDisplayAmount] = useState(amount);

    useEffect(() => {
        let start = displayAmount;
        const end = amount;
        if (start === end) return;

        const duration = 2000;
        const totalSteps = 100;
        const stepTime = duration / totalSteps;
        const stepSize = Math.round(Math.abs(end - start) / totalSteps);

        const timer = setInterval(() => {
            start += stepSize;
            setDisplayAmount(start);
            if (start >= end) {
                setDisplayAmount(end);
                clearInterval(timer);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [amount]);

    return displayAmount;
}