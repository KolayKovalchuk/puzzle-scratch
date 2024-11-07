import { StyledHeaderType } from '@components/shared/StyledHeader';
import { BatchCardType } from '@models/BatchCard.model';
import { useEffect, useState } from 'react';

function getStyledHeaderType(cardType: BatchCardType) {
    switch (cardType) {
        case BatchCardType.ICE_BOX:
            return StyledHeaderType.BLUE;

        case BatchCardType.CANDY_MAZE:
            return StyledHeaderType.PINK;

        case BatchCardType.SANTA_SAC:
            return StyledHeaderType.GREEN;

        default:
            return StyledHeaderType.BLUE;
    }
}

function getBatchCardClass(cardType: BatchCardType, styles: CSSModuleClasses) {
    switch (cardType) {
        case BatchCardType.ICE_BOX:
            return styles.blue;

        case BatchCardType.CANDY_MAZE:
            return styles.pink;

        case BatchCardType.SANTA_SAC:
            return styles.green;

        default:
            return styles.blue;
    }
}

function getBatchImageUrl(cardType: BatchCardType) {
    switch (cardType) {
        case BatchCardType.ICE_BOX:
            return '/ice_box.png';

        case BatchCardType.CANDY_MAZE:
            return '/candy_maze.png';

        case BatchCardType.SANTA_SAC:
            return '/santa_sac.png';

        default:
            return '/ice_box.png';
    }
}

export function useGetBatchCardConfig(cardType: BatchCardType, styles: CSSModuleClasses) {
    const [headerType, setHeaderType] = useState<StyledHeaderType>(StyledHeaderType.BLUE);
    const [batchCardClass, setBatchCardClass] = useState<string>('');
    const [batchImageUrl, setBatchImageUrl] = useState<string>('');

    useEffect(() => {
        const headerType = getStyledHeaderType(cardType);
        const batchCardClass = getBatchCardClass(cardType, styles);
        const batchImageUrl = getBatchImageUrl(cardType);

        setHeaderType(headerType);
        setBatchCardClass(batchCardClass);
        setBatchImageUrl(batchImageUrl);
    }, [cardType, styles]);

    return {
        headerType,
        batchCardClass,
        batchImageUrl,
    }
}