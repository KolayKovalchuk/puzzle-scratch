import { IScratchCardHandle } from '@components/ScratchCard';
import { IScratchAnimationHandle } from '@components/shared/ScratchAnimation/ScratchAnimation';
import { IBuyBatchCardData, ICardData } from '@models/IBuyBatchCardData';
import { showAmountChangeLabel } from '@store/actions/appState.actions';
import { updateUserBalance } from '@store/actions/user.actions';
import { selectScratchCardTransitionTimeout } from '@store/selectors/config.selectors';
import store from '@store/store';
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

let timeout: NodeJS.Timeout | null = null;

function _applyForEachScratchCardRef<T extends IScratchCardHandle = IScratchCardHandle>(
    scratchCardsRefConfig: { [key: string]: RefObject<T> },
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

function _getScratchedStateConfig(config: { [key: string]: RefObject<IScratchCardHandle> }, value: boolean) {
    return Object.keys(config).reduce((acc: { [key: string]: boolean }, key) => {
        acc[key] = value;
        return acc;
    }, {})
}

let swipeTimeout: NodeJS.Timeout | null = null;

export function useScratchGame<CardData extends ICardData = ICardData>(
    batchId: string | undefined,
    card: IBuyBatchCardData<CardData> | null,
    buyCard: (batchId: string) => Promise<IBuyBatchCardData<CardData> | null>,
    scratchCardsRefConfig: { [key: string]: RefObject<IScratchCardHandle> },
    scratchAnimationRef: RefObject<IScratchAnimationHandle>,
) {
    const [lastAction, setLastAction] = useState<'playBtnClick' | 'swipe' | 'scratch' | null>(null);
    const [isBigWinVisible, setIsBigWinVisible] = useState(false);

    const defultScratchConfig = useMemo(() => _getScratchedStateConfig(scratchCardsRefConfig, false), [scratchCardsRefConfig]);

    const [isCardsScratched, setIsCardsScratched] = useState(defultScratchConfig);
    const isAllCardsScratched = Object.values(isCardsScratched).every((v) => v);

    const scratchCardTransitionTimeout = useSelector(selectScratchCardTransitionTimeout);

    const onCardScratched = useCallback((name: string) => {
        setIsCardsScratched((prevStat) => {
            return {
                ...prevStat,
                [name]: true,
            }
        });
    }, [isCardsScratched]);

    const onPlay = useCallback(async () => {
        if (!batchId || isBigWinVisible) return

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => {
            card.reset();
        });

        const card = await buyCard(batchId)

        if (!card) return;

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => {
            card.reveal();
        });

        scratchAnimationRef.current?.play();

        setIsCardsScratched(_getScratchedStateConfig(scratchCardsRefConfig, true))

        setLastAction('playBtnClick');

        onScratchedEnought(card);
    }, [batchId, buyCard, scratchCardsRefConfig, isBigWinVisible]);

    const resetScratchState = useCallback(async () => {
        console.log('resetScratchState');
        
        if (!batchId || !isAllCardsScratched) return

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => {
            card.reset()
            scratchAnimationRef.current?.reset();
        });
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

            console.log('You win ' + cardData.winning + ' RBAX. Your new balance is ' + cardData.rbaxBalance + ' RBAX')
        } else if (cardData) {
            console.log('You lose. Your balance is ' + cardData?.rbaxBalance + ' RBAX')
        };
    }, [card, scratchCardTransitionTimeout]);

    const onScratchStarted = useCallback(() => {
        if (batchId && (!lastAction || lastAction == 'swipe')) {
            buyCard(batchId)
            setLastAction('scratch');
        }
    }, [batchId, buyCard, lastAction]);

    const onBigWinClicked = useCallback(() => {
        setIsBigWinVisible(false);
    }, []);

    const onScratchAnimationCompleted = useCallback((cardData: IBuyBatchCardData) => {
        if (!cardData) return;

        if (cardData?.winning) {
            setIsBigWinVisible(true);

            timeout = setTimeout(() => {
                setIsBigWinVisible(false);
            }, scratchCardTransitionTimeout);
        }

        store.dispatch(updateUserBalance({ total: cardData.rbaxBalance }));
        store.dispatch(showAmountChangeLabel(cardData.cardData.winAmount));
    }, []);

    useEffect(() => {
        if (isAllCardsScratched) {
            onScratchedEnought();

            if (swipeTimeout) {
                clearTimeout(swipeTimeout);
                swipeTimeout = null;
            }

            swipeTimeout = setTimeout(() => {
                resetScratchState();
            }, scratchCardTransitionTimeout);
        }
    }, [isAllCardsScratched]);

    return {
        isBigWinVisible,
        onBigWinClicked,
        onPlay,
        onSwipe: onPlay,
        onScratchAnimationCompleted,
        onCardScratched,
        onScratchStarted,
    }
}