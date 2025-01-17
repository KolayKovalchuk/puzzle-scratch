import { Text } from '@pixi/react';
import { TextStyle } from 'pixi.js-legacy';
import { IMatrixCellProps } from '../IconMatrix.models';

export interface ITextCellProps extends IMatrixCellProps<string> {

}

export function TextCell({ x, y, data }: ITextCellProps) {
    const textStyle = new TextStyle({
        fill: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    });

    return (
        <Text
            x={x}
            y={y}
            text={data}
            style={textStyle}
        />
    )
};
