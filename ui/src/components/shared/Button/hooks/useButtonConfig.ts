import { TextStyle } from 'pixi.js';
import { useMemo } from 'react';
import { ButtonType } from '../Button';

export interface IButtonConfig {
    className: string;
    stroke: string;
    textStyles: Partial<TextStyle>;
}

export function getModeCondg(mode: ButtonType, styles: CSSModuleClasses): IButtonConfig {
    switch (mode) {
        case ButtonType.Confirm:
            return {
                className: styles.confirm,
                stroke: '#295808',
                textStyles: {}
            }
        case ButtonType.Cancel:
            return {
                className: styles.cancel,
                stroke: '#580808',
                textStyles: {}
            }

        case ButtonType.Default:
            return {
                className: styles.default,
                stroke: '#105CB4',
                textStyles: {
                    fill: ['#FFFFFF'],
                    fillGradientStops: [0]
                }
            }
        
        default:
            return {
                className: '',
                stroke: '#000000',
                textStyles: {}
            }
    }
}

export function useButtonConfig(mode: ButtonType, styles: CSSModuleClasses): IButtonConfig {
    return useMemo(() => getModeCondg(mode, styles), [mode, styles]);
}