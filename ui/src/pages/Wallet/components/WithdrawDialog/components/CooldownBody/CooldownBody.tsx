import { selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export interface ICooldownBodyProps {
    cooldownTime: number;
}

function getTileLeft(cooldownTime: number) {
    const currentTime = new Date().getTime();
    return cooldownTime - currentTime;
}

export function CooldownBody({ cooldownTime }: ICooldownBodyProps) {
    const cooldownText = useSelector(selectLocalValue('txt.withdrawal.cooldown'));
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!cooldownTime) return;

        setTimeLeft(getTileLeft(cooldownTime));
        const interval = setInterval(() => {
            const newTimeLeft = getTileLeft(cooldownTime);
            setTimeLeft(newTimeLeft);
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, [cooldownTime]);

    const getTimeLeftString = (timeLeft: number) => {
        if (!timeLeft || timeLeft <= 0) return '';

        const date = new Date(timeLeft);
        const days = date.getUTCDate() - 1;
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        const daysStr = days < 10 ? `0${days}` : days;
        const hoursStr = hours < 10 ? `0${hours}` : hours;
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
        const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

        return `${daysStr} ${hoursStr}:${minutesStr}:${secondsStr}`;
    };

    const timerText = useMemo(() => getTimeLeftString(timeLeft), [timeLeft]);

    const renderCooldownBody = `${cooldownText} ${timerText}`;

    return renderCooldownBody;
}
