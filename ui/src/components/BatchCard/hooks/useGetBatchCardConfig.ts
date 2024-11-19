import { StyledHeaderType } from '@components/shared/StyledHeader';
import { BatchCard, BatchCardType } from '@models/BatchCard.model';
import { ROUTES } from '@routers/routerConfig';
import { startPuzzleGame } from '@store/actions/game.actions';
import store from '@store/store';
import { useCallback, useMemo } from 'react';
import { NavigateFunction } from 'react-router-dom';

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

export function useBatchCardHandler(batchCard: BatchCard, navigate: NavigateFunction) {
    switch (batchCard.cardType) {
        case BatchCardType.ICE_BOX:
            return useCallback(() => navigate(ROUTES.Home), [navigate]);

        case BatchCardType.CANDY_MAZE:
            return useCallback(() => {
                navigate(`${ROUTES.CandyMaze}/${batchCard.batchId}`);
            }, [navigate, batchCard]);

        case BatchCardType.SANTA_SAC:
            return useCallback(() => navigate(ROUTES.Home), [navigate]);

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