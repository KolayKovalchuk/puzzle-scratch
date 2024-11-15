import { StyledHeaderType } from '@components/shared/StyledHeader';
import { BatchCardType } from '@models/BatchCard.model';
import { ROUTES } from '@routers/routerConfig';
import { startPuzzleGame } from '@src/store/actions/game.actions';
import store from '@src/store/store';
import { useMemo } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

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

export function useBatchCardHandler(cardType: BatchCardType, batchId: string, navigate: NavigateFunction) {
    switch (cardType) {
        case BatchCardType.ICE_BOX:
            return () => navigate(ROUTES.Home);

        case BatchCardType.CANDY_MAZE:
            return () => {
                navigate(ROUTES.CandyMaze);
                store.dispatch(startPuzzleGame({
                    cardType,
                    batchId,
                }));
            }

        case BatchCardType.SANTA_SAC:
            return () => navigate(ROUTES.Home);

        default:
            return () => navigate(ROUTES.Home);
    }
}

export function useGetBatchCardConfig(cardType: BatchCardType, styles: CSSModuleClasses) {
    const navigate = useNavigate();

    const headerType =  useMemo(() => getStyledHeaderType(cardType), [cardType]);
    const batchCardClass = useMemo(() => getBatchCardClass(cardType, styles), [cardType, styles]);
    const batchImageUrl = useMemo(() => getBatchImageUrl(cardType), [cardType]);

    return {
        headerType,
        batchCardClass,
        batchImageUrl,
    }
}