import { ITextStyle } from 'pixi.js';

export const DefaultTextStyleConfig: Partial<ITextStyle> = {
    align: 'center',
    fontSize: 30,
    fontFamily: 'Nunito',
    fontWeight: '900',

    fill: ['#FFFFAB', '#FCB213'], // Gradient colors
    fillGradientType: 0, // Linear gradient
    fillGradientStops: [0, 1], // Stops for the gradient

    stroke: '#AD4D07',
    strokeThickness: 4,
    lineJoin: 'round',

    dropShadow: true,
    dropShadowColor: 'rgba(0, 0, 0, 0.25)',
    dropShadowAlpha: 0.1,
    dropShadowBlur: 1,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 4,
}