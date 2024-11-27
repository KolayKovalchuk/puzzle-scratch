import { IScratchCardHandle } from '@components/ScratchCard';
import { IBuyBatchCardData, ICardData } from '@models/IBuyBatchCardData';
import { RefObject, useCallback, useEffect, useState } from 'react';

let timeout: NodeJS.Timeout | null = null;

const BIG_WIN_TIMEOUT = 2.5 * 1000;

function _applyForEachScratchCardRef<T extends IScratchCardHandle = IScratchCardHandle>(
    scratchCardsRefConfig: {[key: string]: RefObject<T> },
    callback: (ref: T, index: number) => void
) {
    const scratchCardsRefList = Object.values(scratchCardsRefConfig);

    for (let index = 0; index < scratchCardsRefList.length; index++) {
        const scratchCardRef = scratchCardsRefList[index];
        if (scratchCardRef.current) {
            callback(scratchCardRef.current, index);
        }
    }
}

function _getScratchedStateConfig(config: {[key: string]: RefObject<IScratchCardHandle> }, value: boolean) {
    // return Array.from({ length: arrayLength }, () => value)
    return Object.keys(config).reduce((acc: {[key: string]: boolean}, key) => {
        acc[key] = value;
        return acc;
    }, {})
}

export function useScratchGame<CardData extends ICardData = ICardData>(
    batchId: string | undefined,
    card: IBuyBatchCardData<CardData> | null,
    buyCard: (batchId: string) => Promise<IBuyBatchCardData<CardData> | null>,
    scratchCardsRefConfig: {[key: string]: RefObject<IScratchCardHandle> },
) {
    const [lastAction, setLastAction] = useState<'playBtnClick' | 'swipe' | 'scratch' | null>(null);
    const [isBigWinVisible, setIsBigWinVisible] = useState(false);

    const [isCardsScratched, setIsCardsScratched] = useState(_getScratchedStateConfig(scratchCardsRefConfig, false));
    const isAllCardsScratched = Object.values(isCardsScratched).every((v) => v);

    const onCardScratched = useCallback((name: string) => {
        setIsCardsScratched({
            ...isCardsScratched,
            [name]: true,
        });
    }, [isCardsScratched]);

    const onPlay = useCallback(async () => {
        if (!batchId || isBigWinVisible) return

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => card.reset());

        const card = await buyCard(batchId)

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => {
            card.reveal();
        });
        setIsCardsScratched(_getScratchedStateConfig(scratchCardsRefConfig, true))

        setLastAction('playBtnClick');

        onScratchedEnought(card);
    }, [batchId, buyCard, scratchCardsRefConfig, isBigWinVisible]);

    const onSwipe = useCallback(async () => {
        if (!batchId || !isAllCardsScratched) return

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => card.reset());
        setLastAction('swipe');
        setIsCardsScratched(_getScratchedStateConfig(scratchCardsRefConfig, false));
    }, [batchId, isAllCardsScratched, scratchCardsRefConfig]);

    const onScratchedEnought = useCallback((cardDataArg?: IBuyBatchCardData<CardData> | null) => {
        const cardData = cardDataArg || card;

        if (cardData?.winning) {

            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            setIsBigWinVisible(true);

            timeout = setTimeout(() => {
                setIsBigWinVisible(false);
            }, BIG_WIN_TIMEOUT);

            console.log('You win ' + cardData.winning + ' RBAX. Your new balance is ' + cardData.rbaxBalance + ' RBAX')
        } else if (cardData) {
            console.log('You lose. Your balance is ' + cardData?.rbaxBalance + ' RBAX')
        };
    }, [card]);

    const onScratchStarted = useCallback(() => {
        if (batchId && (!lastAction || lastAction == 'swipe')) {
            buyCard(batchId)
            setLastAction('scratch');
        }
    }, [batchId, buyCard, lastAction]);

    
    useEffect(() => {
        if (isAllCardsScratched) {
            onScratchedEnought();
        }
    }, [isAllCardsScratched]);

    return {
        isBigWinVisible,
        onCardScratched,
        onPlay,
        onSwipe,
        onScratchStarted,
    }
}