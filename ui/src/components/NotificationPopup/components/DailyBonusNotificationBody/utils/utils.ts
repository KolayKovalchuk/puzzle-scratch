import { CSSProperties } from 'react';

import coinXL from "@icons/coins/coin_xl.svg";
import coinLG from "@icons/coins/coin_lg.svg";
import coinMD from "@icons/coins/coin_md.svg";
import coinSM from "@icons/coins/coin_sm.svg";
import coinXS from "@icons/coins/coin_xs.svg";

import coinXLBordered from "@icons/coins/coin_xl_bordered.svg";
import coinLGBordered from "@icons/coins/coin_lg_bordered.svg";
import coinMDBordered from "@icons/coins/coin_md_bordered.svg";
import coinSMBordered from "@icons/coins/coin_sm_bordered.svg";
import coinXSBordered from "@icons/coins/coin_xs_bordered.svg";

const icons = [coinXS, coinSM, coinMD, coinLG, coinXL];
const borderedIcons = [coinXSBordered, coinSMBordered, coinMDBordered, coinLGBordered, coinXLBordered];

export function getCoinIcon(index: number, isToday: boolean) {
    const iconName = isToday ? borderedIcons[index] : icons[index];

    return iconName || coinMD;
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
