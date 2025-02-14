import { selectWithdrawCooldownExpiry } from '@store/selectors/appState.selectors';
import { selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface ICooldownBodyProps {
    onWithrawCooldownExpiry: (cooldownExpiry: number) => void
}

function getTileLeft(cooldownTime: number) {
    const currentTime = new Date().getTime();
    return cooldownTime - currentTime;
}

function _addLeadingZero(value: number) {
    return value < 10 ? `0${value}` : value.toString();
}

export function CooldownBody({ onWithrawCooldownExpiry }: ICooldownBodyProps) {
    const withdrawalCooldownExpiry = useSelector(selectWithdrawCooldownExpiry);

    const cooldownText = useSelector(selectLocalValue('txt.withdrawal.cooldown'));
    const [timeLeft, setTimeLeft] = useState(0);
    const [days, setDays] = useState('0');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');

    useEffect(() => {
        if (!withdrawalCooldownExpiry) return;

        const timeLeft = getTileLeft(withdrawalCooldownExpiry);
        setTimeLeft(timeLeft);

        if (timeLeft <= 0) {
            onWithrawCooldownExpiry(withdrawalCooldownExpiry);
        }

        const interval = setInterval(() => {
            const newTimeLeft = getTileLeft(withdrawalCooldownExpiry);
            setTimeLeft(newTimeLeft);
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, [withdrawalCooldownExpiry]);

    useEffect(() => {
        if (!timeLeft || timeLeft <= 0) return;

        const date = new Date(timeLeft);
        const days = date.getUTCDate() - 1;
        setDays(days + '');

        const hours = date.getUTCHours();
        const hoursStr = _addLeadingZero(hours);
        setHours(hoursStr);

        const minutes = date.getUTCMinutes();
        const minutesStr = _addLeadingZero(minutes);
        setMinutes(minutesStr);

        const seconds = date.getUTCSeconds();
        const secondsStr = _addLeadingZero(seconds);
        setSeconds(secondsStr);
    }, [timeLeft]);

    const timerText = useSelector(selectLocalValueWithVars({
        localizationKey: 'txt.withdrawal.cooldownTimer',
    }, days, hours, minutes, seconds));

    const renderCooldownBody = `${cooldownText} ${timerText}`;
    return renderCooldownBody;
}
