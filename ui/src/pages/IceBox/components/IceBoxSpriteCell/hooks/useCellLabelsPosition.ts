import { TextMetrics, TextStyle } from 'pixi.js-legacy';
import { useEffect, useState } from 'react';

export function useCellLabelsPosition(
    x: number,
    y: number,
    winNumber: string,
    priceNumber: string,
    height: number,
    width: number,
    winNumberTextStyleClass: TextStyle,
    priceNumberTextStyleClass: TextStyle
) {
    const [priceNumberPositionShift, setPriceNumberPositionShift] = useState({ x: 0, y: 0 });
    const [roboIconWidth, setRoboIconWidth] = useState(0);
    const [roboIconHeight, setRoboIconHeight] = useState(0);
    const [priceContainerWidth, setPriceContainerWidth] = useState(0);

    useEffect(() => {
        const winTextMetrics = TextMetrics.measureText(winNumber, winNumberTextStyleClass);
        const priceTextMetrics = TextMetrics.measureText(priceNumber, priceNumberTextStyleClass);
        const roboIconWidth = width / 3.5;
        const roboIconHeight = roboIconWidth * 1.35;
        const priceContainerWidth = roboIconWidth + priceTextMetrics.width;

        setPriceNumberPositionShift({
            x: width / 2 - priceContainerWidth / 2,
            y: winTextMetrics.height * 1.34
        });
        setRoboIconWidth(roboIconWidth);
        setRoboIconHeight(roboIconHeight);
        setPriceContainerWidth(priceContainerWidth);
    }, [winNumber, priceNumber, width, winNumberTextStyleClass, priceNumberTextStyleClass]);

    const [winNumberX, setWinNumberX] = useState(0);
    const [winNumberY, setWinNumberY] = useState(0);
    const [roboIconX, setRoboIconX] = useState(0);
    const [roboIconY, setRoboIconY] = useState(0);
    const [priceNumberX, setPriceNumberX] = useState(0);
    const [priceNumberY, setPriceNumberY] = useState(0);

    useEffect(() => {
        setWinNumberX(x);
        setWinNumberY(y - height * 0.24);
        setRoboIconX(x + priceNumberPositionShift.x);
        setRoboIconY(winNumberY + priceNumberPositionShift.y + roboIconHeight * 0.2);
        setPriceNumberX(roboIconX + roboIconWidth);
        setPriceNumberY(roboIconY);
    }, [
        x, y, height, winNumberY, priceNumberPositionShift, roboIconHeight, roboIconWidth, roboIconY, roboIconX
    ]);

    return {
        winNumberX,
        winNumberY,
        priceContainerWidth,
        priceNumberX,
        priceNumberY,
        roboIconX,
        roboIconY,
        roboIconWidth,
        roboIconHeight,
    };
}