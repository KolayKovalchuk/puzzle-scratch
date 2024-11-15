import { Sprite } from '@pixi/react';
import { Texture } from 'pixi.js';
import { IMatrixCellProps } from '../IconMatrix.models';

export interface ISpriteCellData {
    texture: Texture;
}

export interface ISpriteCellProps extends IMatrixCellProps<ISpriteCellData> {
}

export function SpriteCell({ x, y, width, height, data }: ISpriteCellProps) {
    return (
        <Sprite
            x={x}
            y={y}
            width={width}
            height={height}
            texture={data.texture}
        />
    )
};
