import { CSSProperties } from 'react';

import coinLG from "@icons/coins/coin_lg.svg";
import coinMD from "@icons/coins/coin_md.svg";
import coinSM from "@icons/coins/coin_sm.svg";
import coinXL from "@icons/coins/coin_xl.svg";
import coinXS from "@icons/coins/coin_xs.svg";

const icons = [coinXS, coinSM, coinMD, coinLG, coinXL];

export function getCoinIcon(index: number) {
    return icons[index] || coinMD;
}

export function getMainDayIndex(length: number) {
    return Math.floor(length / 2)
}

export function isMiddleDay(index: number, length: number) {
    return getMainDayIndex(length) === index;
}

export function getDailyContainerStyles(index: number, length: number): CSSProperties {
    const shiftPercent = 2;
    const todayContainerShiftPercent = 2.5;
    const dayContainerWidth = 100 / length + shiftPercent + '%';

    const mainDayIndex = getMainDayIndex(length);

    if (index < mainDayIndex) {
        const left = shiftPercent * index * -1 + '%';

        return {
            minWidth: dayContainerWidth,
            left,
        }
    }

    if (index === mainDayIndex) {
        const left = todayContainerShiftPercent * index * -1 + '%';

        return {
            minWidth: dayContainerWidth,
            left: left,
        }
    }

    if (index > mainDayIndex) {
        const todayContainerAdjust = todayContainerShiftPercent * 0.5;
        const left = shiftPercent * index * -1 + -todayContainerAdjust + '%';

        return {
            minWidth: dayContainerWidth,
            left,
        }
    }

    return {}
}
