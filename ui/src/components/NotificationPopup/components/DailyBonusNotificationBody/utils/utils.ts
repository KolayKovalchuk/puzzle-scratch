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

export function isDayToday(index: number, dayNumber: number) {
    return index + 1 === dayNumber;
}

export function getDailyContainerStyles(index: number, length: number, mainDay: number): CSSProperties {
    const mainDayIndex = mainDay - 1;
    const baseWidth = Math.floor(100 / length);
    const mainDayWidth = baseWidth + 12;
    const dayWidth = Math.floor((100 - mainDayWidth) / (length - 1));

    if (index === mainDayIndex) {
        return {
            width: mainDayWidth + '%',
        }
    }

    return {
        width: dayWidth + '%'
    }
}
