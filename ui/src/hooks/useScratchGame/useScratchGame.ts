import { IScratchCardHandle } from '@components/ScratchCard';
import { IScratchAnimationHandle } from '@components/shared/ScratchAnimation/ScratchAnimation';
import { AppSounds } from '@config/sounds';
import { IBuyBatchCardData, ICardData, WinType } from '@models/IBuyBatchCardData';
import { blinkMatrixCels, playSound, resetMatrixBlinkCounter } from '@store/actions/appState.actions';
import { updateUserBalanceWithChangeAnimation } from '@store/actions/user.actions';
import { selectScratchCardTransitionTimeout } from '@store/selectors/config.selectors';
import store from '@store/store';
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { _applyForEachScratchCardRef, _getScratchedStateConfig } from './utils';
import { useBuyCardWithBalanceChange, useRedirectOnBatchFinished, useStopWinSound } from './hooks';
import { useGetSounds } from '@hooks/usePlaySound';

let timeout: NodeJS.Timeout | null = null;
let swipeTimeout: NodeJS.Timeout | null = null;

export function useScratchGame<CardData extends ICardData = ICardData>(
    batchId: string | undefined,
    scratchCardsRefConfig: { [key: string]: RefObject<IScratchCardHandle> },
    scratchAnimationRef: RefObject<IScratchAnimationHandle>,
) {
    const { buyCardWithBalanceChange, isCardBuying, card } = useBuyCardWithBalanceChange<CardData>();

    const [lastAction, setLastAction] = useState<'playBtnClick' | 'swipe' | 'scratch' | null>(null);
    const [isBigWinVisible, setIsBigWinVisible] = useState(false);
    const [isScratchAnimationPlaying, setIsScratchAnimationPlaying] = useState(false);

    const defultScratchConfig = useMemo(() => _getScratchedStateConfig(scratchCardsRefConfig, false), [scratchCardsRefConfig]);

    const [isCardsScratched, setIsCardsScratched] = useState(defultScratchConfig);
    const isAllCardsScratched = Object.values(isCardsScratched).every((v) => v);

    const scratchCardTransitionTimeout = useSelector(selectScratchCardTransitionTimeout);

    const [isPlayBtnDisabled, setIsPlayBtnDisabled] = useState(false);

    const { stopSound } = useGetSounds();
    const { stopWinSound } = useStopWinSound();

    useRedirectOnBatchFinished();

    useEffect(() => {
        const isPlayBtnDisabled = !batchId || isScratchAnimationPlaying || isCardBuying;
        setIsPlayBtnDisabled(isPlayBtnDisabled);
    }, [batchId, isScratchAnimationPlaying, isCardBuying]);

    const resetAnimation = useCallback(() => {
        scratchAnimationRef.current?.reset();
        setIsScratchAnimationPlaying(false);
    }, []);

    const playAnimation = useCallback(() => {
        scratchAnimationRef.current?.play();
        setIsScratchAnimationPlaying(true);
        // setTimeout(() => store.dispatch(playSound(AppSounds.Scratch)), 0);
        stopSound(AppSounds.Scratch);
        stopWinSound(card);
        store.dispatch(playSound(AppSounds.Scratch, false));
    }, [stopSound, stopWinSound, card]);

    const onCardScratched = useCallback((name: string) => {
        setIsCardsScratched((prevStat) => {
            return {
                ...prevStat,
                [name]: true,
            }
        });
    }, [isCardsScratched]);

    const onPlay = useCallback(async () => {
        if (isPlayBtnDisabled) return

        store.dispatch(resetMatrixBlinkCounter());

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => {
            card.reset();
            resetAnimation();
        });

        const card = await buyCardWithBalanceChange(batchId || '');

        if (!card) return;

        _applyForEachScratchCardRef(scratchCardsRefConfig, (card) => {
            card.reveal();
        });

        playAnimation();
        setIsCardsScratched(_getScratchedStateConfig(scratchCardsRefConfig, true))
        setLastAction('playBtnClick');
        onScratchedEnought(card);
    }, [
        batchId,
        buyCardWithBalanceChange,
        scratchCardsRefConfig,
        isPlayBtnDisabled,
        playAnimation,
        resetAnimation,
]);

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
    }, [card]);

    const onScratchStarted = useCallback(() => {
        if (batchId && (!lastAction || lastAction == 'swipe')) {
            buyCardWithBalanceChange(batchId)
            setLastAction('scratch');
        }
    }, [batchId, buyCardWithBalanceChange, lastAction]);

    const onBigWinClicked = useCallback(() => {
        stopWinSound(card);
        setIsBigWinVisible(false);
        onPlay();
    }, [card, onPlay, stopWinSound]);

    const onScratchAnimationCompleted = useCallback(() => {
        setIsScratchAnimationPlaying(false);

        stopSound(AppSounds.Scratch);

        if (!card) return;

        store.dispatch(blinkMatrixCels());

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

        store.dispatch(updateUserBalanceWithChangeAnimation({ total: card.rbaxBalance }, card.cardData.winAmount));

    }, [
        card,
        card?.rbaxBalance,
        card?.winning,
        card?.cardData.winAmount,
        scratchCardTransitionTimeout,
        stopSound,
    ]);

    const resetOnTimeOut = useCallback(() => {
        if (swipeTimeout) {
            clearTimeout(swipeTimeout);
            swipeTimeout = null;
        }

        swipeTimeout = setTimeout(() => {
            resetScratchState();
        }, scratchCardTransitionTimeout);
    }, [scratchCardTransitionTimeout]);

    useEffect(() => {
        if (isAllCardsScratched) {
            onScratchedEnought();
            //resetOnTimeOut();
        }
    }, [isAllCardsScratched]);

    return {
        isBigWinVisible,
        onBigWinClicked,
        onPlay,
        // onSwipe: onPlay,
        onScratchAnimationCompleted,
        card,
        isPlayBtnDisabled,

        onCardScratched,
        onScratchStarted,
    }
}