import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { StyledTextPixiEl, WinStyledTextConfig } from '@components/shared/StyledText';
import { useFitTextSize } from '@hooks/useFitTextSize';
import { ITextStyle, TextStyle } from 'pixi.js';

export interface IRoundSpriteCellData extends ISpriteCellData {
    textureName: string;
}

export interface IRoundSpriteCellProps extends IMatrixCellProps<IRoundSpriteCellData> {
    xShift?: number;
    yShift?: number;
}

const textStyles: Partial<ITextStyle> = {
    ...WinStyledTextConfig,
    fontSize: 100,
}

const textStyle = new TextStyle(textStyles);

export function RoundSpriteCell({ x, y, width, height, data, xShift = 0.5, yShift = 0.5 }: IRoundSpriteCellProps) {
    const fontSize = useFitTextSize(data.textureName, width, textStyle);
    textStyle.fontSize = fontSize;

    return (
        <StyledTextPixiEl
            dimensions={{ width, height }}
            text={data.textureName}
            textStyles={WinStyledTextConfig}
            textFitCoefficient={0.8}
            x={x}
            y={y}
            xShift={xShift}
            yShift={yShift}
        />
    );
};
