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

        case BatchCardType.LUCKY_CLOVER:
            return StyledHeaderType.RED;

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

        case BatchCardType.LUCKY_CLOVER:
            return styles.red;

        case BatchCardType.SANTA_SAC:
            return styles.red;

        default:
            return styles.blue;
    }
}

function getBatchImageUrl(cardType: BatchCardType) {
    switch (cardType) {
        case BatchCardType.ICE_BOX:
            return 'iceBox/ice_box_batch_cover.png';

        case BatchCardType.CANDY_MAZE:
            return 'candyMaze/candy_maze_batch_cover.png';

        case BatchCardType.VEGAS_LOOT:
            return '/vegasLoot/vegas_loot_batch_cover.png';

        case BatchCardType.LUCKY_CLOVER:
            return '/luckyClover/lucky_clover_batch_cover.png';

        case BatchCardType.SANTA_SAC:
            return 'santaSac/santa_sac_batch_cover.png';

        default:
            return 'iceBox/ice_box_batch_cover.png';
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

        case BatchCardType.LUCKY_CLOVER:
            return useCallback(() => {
                // navigate(`${ROUTES.LuckyClover}/${batchCard.batchId}`);
            }, [navigate, batchCard]);

        case BatchCardType.SANTA_SAC:
            return useCallback(() => {
                navigate(`${ROUTES.SantaSac}/${batchCard.batchId}`)
            }, [navigate]);

        default:
            return useCallback(() => {}, []);
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