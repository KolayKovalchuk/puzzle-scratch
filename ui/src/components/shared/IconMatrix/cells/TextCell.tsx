import { ITextStyle, TextStyle } from 'pixi.js-legacy';
import { IMatrixCellProps } from '../IconMatrix.models';
import { DefaultTextStyleConfig, StyledTextPixiEl } from '@components/shared/StyledText';
import { useEffect, useState } from 'react';

export interface ITextCellProps extends IMatrixCellProps<string> {
    textStyles?: ITextStyle;
}

const defaultTextStyleConfig = new TextStyle(DefaultTextStyleConfig);

export function TextCell({ x, y, width, height, data, textStyles }: ITextCellProps) {
    const [textStyle, setTextStyle] = useState(defaultTextStyleConfig);

    useEffect(() => {
        if (textStyles) {
            setTextStyle(new TextStyle(textStyles));
        }
    }, [textStyles]);

    return (
        <StyledTextPixiEl
            x={x}
            y={y}
            text={data}
            textStyles={textStyle}
            dimensions={{ width, height }}
        />
    )
};
