
import { useEffect, useState } from 'react';

export function useCounterAnimation(amount: number) {
    const [displayAmount, setDisplayAmount] = useState(amount);

    useEffect(() => {
        let start = displayAmount;
        const end = amount;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / (end - start)));

        console.log(start, end, stepTime);

        const timer = setInterval(() => {
            start += 1;
            setDisplayAmount(start);
            if (start >= end) clearInterval(timer);
        }, stepTime);

        return () => clearInterval(timer);
    }, [amount]);

    return displayAmount;
}