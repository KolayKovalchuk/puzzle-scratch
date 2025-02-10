import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { RedStyledTextStyle, StyledTextPixiEl } from '@components/shared/StyledText';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Sprite } from '@pixi/react';
import { useEffect, useState } from 'react';

export interface IDefaultSpriteCellData extends ISpriteCellData {
    textureName: string;
    bundleName: string;
}

export interface IDefaultSpriteCellProps extends IMatrixCellProps<IDefaultSpriteCellData> {
}

export function DefaultSpriteCell({ x, y, width, height, data }: IDefaultSpriteCellProps) {
    const { bundle, loading: isBundleLoading } = useLoadBundle(data.bundleName);
    const texture = bundle?.[data.textureName];

    const [ isMultiplayerCell, setIsMultiplayerCell ] = useState(false);

    useEffect(() => {
        const textureNameMatch = data.textureName.match(/w\d+/);
        setIsMultiplayerCell(!!textureNameMatch && textureNameMatch.length > 0);
    }, [data.textureName]);

    if (isMultiplayerCell) {
        const text = data.textureName.replace('w', 'x');

        return (<Container>
            <StyledTextPixiEl
                text={text}
                dimensions={{ width, height }}
                x={x}
                y={y}
                xShift={0.55}
                textStyles={RedStyledTextStyle}
            />
        </Container>)
    }

    if (!bundle) return null

    if (isBundleLoading || !texture || texture.baseTexture.width === 0) {
        return null;
    }

    return (<Container>
        <Sprite
            x={x}
            y={y}
            width={width}
            height={height}
            texture={texture}
        />
    </Container>);
};
