import { IScratchCardHandle } from '@components/ScratchCard';
import { IScratchAnimationHandle } from '@components/shared/ScratchAnimation/ScratchAnimation';
import { IBuyBatchCardData, ICardData } from '@models/IBuyBatchCardData';
import { useBuyCard } from '@services/api/cards.service';
import { showAmountChangeLabel } from '@store/actions/appState.actions';
import { updateUserBalance } from '@store/actions/user.actions';
import { selectScratchCardTransitionTimeout } from '@store/selectors/config.selectors';
import store from '@store/store';
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';


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

let timeout: NodeJS.Timeout | null = null;
let swipeTimeout: NodeJS.Timeout | null = null;

export function useScratchGame<CardData extends ICardData = ICardData>(
    batchId: string | undefined,
    // card: IBuyBatchCardData<CardData> | null,
    // buyCard: (batchId: string) => Promise<IBuyBatchCardData<CardData> | null>,
    scratchCardsRefConfig: { [key: string]: RefObject<IScratchCardHandle> },
    scratchAnimationRef: RefObject<IScratchAnimationHandle>,
) {
    const { buyCard, card, loading: isCardBuying } = useBuyCard<CardData>();

    const [lastAction, setLastAction] = useState<'playBtnClick' | 'swipe' | 'scratch' | null>(null);
    const [isBigWinVisible, setIsBigWinVisible] = useState(false);
    const [isScratchAnimationPlaying, setIsScratchAnimationPlaying] = useState(false);

    const defultScratchConfig = useMemo(() => _getScratchedStateConfig(scratchCardsRefConfig, false), [scratchCardsRefConfig]);

    const [isCardsScratched, setIsCardsScratched] = useState(defultScratchConfig);
    const isAllCardsScratched = Object.values(isCardsScratched).every((v) => v);

    const scratchCardTransitionTimeout = useSelector(selectScratchCardTransitionTimeout);

    const resetAnimation = useCallback(() => {
        scratchAnimationRef.current?.reset();
        setIsScratchAnimationPlaying(false);
    }, []);

    const playAnimation = useCallback(() => {
        scratchAnimationRef.current?.play();
        setIsScratchAnimationPlaying(true);
    }, []);

    const onCardScratched = useCallback((name: string) => {
        setIsCardsScratched((prevStat) => {
            return {
                ...prevStat,
                [name]: true,
            }
        });
    }, [isCardsScratched]);

    const onPlay = useCallback(async () => {
        if (!batchId || isBigWinVisible || isScratchAnimationPlaying || isCardBuying) return

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => {
            card.reset();
            resetAnimation();
        });

        const card = await buyCard(batchId)

        if (!card) return;

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => {
            card.reveal();
        });

        playAnimation();

        setIsCardsScratched(_getScratchedStateConfig(scratchCardsRefConfig, true))

        setLastAction('playBtnClick');

        onScratchedEnought(card);
    }, [batchId, buyCard, scratchCardsRefConfig, isBigWinVisible, isScratchAnimationPlaying, isCardBuying]);

    const resetScratchState = useCallback(async () => {
        console.log('resetScratchState');
        
        if (!batchId || !isAllCardsScratched) return

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => {
            card.reset()
            resetAnimation();
        });
        setLastAction('swipe');
        setIsCardsScratched(_getScratchedStateConfig(scratchCardsRefConfig, false));
    }, [batchId, isAllCardsScratched, scratchCardsRefConfig]);

    const onScratchedEnought = useCallback((cardDataArg?: IBuyBatchCardData<CardData> | null) => {
        const cardData = cardDataArg || card;

        if (cardData?.winning) {

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

    const onScratchAnimationCompleted = useCallback(() => {
        setIsScratchAnimationPlaying(false);
        if (!card) return;

        if (card?.winning) {
            setIsBigWinVisible(true);

            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            timeout = setTimeout(() => {
                setIsBigWinVisible(false);
            }, scratchCardTransitionTimeout);

        }

        store.dispatch(updateUserBalance({ total: card.rbaxBalance }));
        store.dispatch(showAmountChangeLabel(card.cardData.winAmount));
    }, [card, card?.winning, scratchCardTransitionTimeout]);

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
        card,
    }
}