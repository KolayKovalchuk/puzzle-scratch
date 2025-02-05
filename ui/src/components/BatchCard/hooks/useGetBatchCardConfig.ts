import { StyledHeaderType } from '@components/shared/StyledHeader';
import { BatchCard, BatchCardType, BatchStatus } from '@models/BatchCard.model';
import { ROUTES } from '@routers/routerConfig';
import { selectIsQaUser } from '@store/selectors/user.selectors';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction } from 'react-router-dom';

function getStyledHeaderType(cardType: BatchCardType) {
    switch (cardType) {
        case BatchCardType.ICE_BOX:
            return StyledHeaderType.BLUE;

        case BatchCardType.CANDY_MAZE:
            return StyledHeaderType.PINK;

        case BatchCardType.VEGAS_LOOT:
            return StyledHeaderType.GREEN;

        case BatchCardType.SANTA_SAC:
            return StyledHeaderType.RED;

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

        case BatchCardType.VEGAS_LOOT:
            return styles.green;

        case BatchCardType.SANTA_SAC:
            return styles.red;

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

        case BatchCardType.VEGAS_LOOT:
            return '/vegas_loot.png';

        case BatchCardType.SANTA_SAC:
            return '/santa_sac.png';

        default:
            return '/ice_box.png';
    }
}

export function useBatchCardHandler(batchCard: BatchCard, navigate: NavigateFunction) {
    // TODO: Remove this line to enable batch click on prod
    const appMode = import.meta.env.MODE
    const isQaUser = useSelector(selectIsQaUser);
    const isAllowed = isQaUser || appMode === 'development';
    const isCardAvailable = batchCard.status === BatchStatus.AVAILABLE;
    if (!isCardAvailable && !isAllowed) return () => {};

    switch (batchCard.cardType) {
        case BatchCardType.ICE_BOX:
            return useCallback(() => {
                navigate(`${ROUTES.IceBox}/${batchCard.batchId}`)
            }, [navigate]);

        case BatchCardType.CANDY_MAZE:
            return useCallback(() => {
                navigate(`${ROUTES.CandyMaze}/${batchCard.batchId}`);
            }, [navigate, batchCard]);

        case BatchCardType.VEGAS_LOOT:
            return useCallback(() => {
                navigate(`${ROUTES.VegasLoot}/${batchCard.batchId}`);
            }, [navigate, batchCard]);

        case BatchCardType.SANTA_SAC:
            return useCallback(() => {
                navigate(`${ROUTES.SantaSac}/${batchCard.batchId}`)
            }, [navigate]);

        default:
            return useCallback(() => navigate(ROUTES.Home), [navigate]);
    }
}

export function useGetBatchCardConfig(cardType: BatchCardType, styles: CSSModuleClasses) {
    const headerType =  useMemo(() => getStyledHeaderType(cardType), [cardType]);
    const batchCardClass = useMemo(() => getBatchCardClass(cardType, styles), [cardType, styles]);
    const batchImageUrl = useMemo(() => getBatchImageUrl(cardType), [cardType]);

    return {
        headerType,
        batchCardClass,
        batchImageUrl,
    }
}