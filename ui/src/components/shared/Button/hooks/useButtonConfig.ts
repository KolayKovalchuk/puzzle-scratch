import { TextStyle } from 'pixi.js-legacy';
import { useMemo } from 'react';
import { ButtonType } from '../Button';

export interface IButtonConfig {
    className: string;
    textStyles: Partial<TextStyle>;
}

export function getModeCondg(mode: ButtonType, styles: CSSModuleClasses): IButtonConfig {
    const defaultTextStyles: Partial<TextStyle> = {
        fontSize: 20,
        dropShadow: false,
        stroke: '#000000',
    }

    switch (mode) {
        case ButtonType.Confirm:
            return {
                className: styles.confirm,
                textStyles: {
                    ...defaultTextStyles,
                    stroke: '#295808',
                    fill: ['#FFFFFF'],
                }
            }
        case ButtonType.Cancel:
            return {
                className: styles.cancel,
                textStyles: {
                    ...defaultTextStyles,
                    stroke: '#580808',
                    fill: ['#FFFFFF'],
                }
            }

        case ButtonType.Default:
            return {
                className: styles.default,
                textStyles: {
                    ...defaultTextStyles,
                    stroke: '#105CB4',
                    fill: ['#FFFFFF'],
                    fillGradientStops: [0]
                }
            }
        
        default:
            return {
                className: '',
                textStyles: {
                    ...defaultTextStyles,
                }
            }
    }
}

export function useButtonConfig(mode: ButtonType, styles: CSSModuleClasses): IButtonConfig {
    return useMemo(() => getModeCondg(mode, styles), [mode, styles]);
}