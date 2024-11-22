import { IScratchCardHandle } from '@components/ScratchCard';
import { IRoundScratchCardHandle } from '@components/ScratchCard/components/RoundScratchCard/RoundScratchCard';
import { IBuyBatchCardData, ICardData } from '@models/IBuyBatchCardData';
import { useEffect, useRef, useState } from 'react';

export function useScratchGame<CardData extends ICardData = ICardData>(
    batchId: string | undefined,
    card: IBuyBatchCardData<CardData> | null,
    buyCard: (batchId: string) => Promise<IBuyBatchCardData<CardData> | null>
) {
    const roundScratchCardRef = useRef<IRoundScratchCardHandle>(null);
    const mainScratchCardRef = useRef<IScratchCardHandle>(null);
    
    const [lastAction, setLastAction] = useState<'playBtnClick' | 'swipe' | 'scratch' | null>(null);

    const [isMainCardScratched, setMainCardScratched] = useState(false);
    const [isMaltiplierCardScratched, setMaltiplierCardScratched] = useState(false);

    const onMainCardScratched = () => {
        setMainCardScratched(true);
    }

    const onMaltiplierCardScratched = () => {
        setMaltiplierCardScratched(true);
    }

    const onPlay = async () => {
        const mainScratch = mainScratchCardRef.current;
        const roundScratch = roundScratchCardRef.current;
        
        if (!batchId || !roundScratch || ! mainScratch) return

        mainScratch.reset();
        roundScratch.reset();
        
        await buyCard(batchId)

        mainScratch.reveal();
        setMainCardScratched(true);

        roundScratch.reveal();
        setMaltiplierCardScratched(true);

        setLastAction('playBtnClick');

        onScratchedEnought();
    }

    const onSwipe = async () => {
        const mainScratch = mainScratchCardRef.current;
        const roundScratch = roundScratchCardRef.current;
        
        if (!batchId || !roundScratch || ! mainScratch) return

        if (isMainCardScratched && isMaltiplierCardScratched) {
            mainScratch.reset();
            roundScratch.reset();

            setLastAction('swipe');

            setMainCardScratched(false);
            setMaltiplierCardScratched(false);
        }
    }

    const onScratchedEnought = () => {
        if (card?.winning) {
            console.log('You win ' + card.winning + ' RBAX. Your new balance is ' + card.rbaxBalance + ' RBAX')
        } else if (card) {
            console.log('You lose. Your balance is ' + card?.rbaxBalance + ' RBAX')
        };
    }

    const onScratchStarted = () => {
        if (batchId && (!lastAction || lastAction == 'swipe')) {
            console.log('onScratchStarted buyCard');
            
            buyCard(batchId)
            setLastAction('scratch');
        }
    }

    useEffect(() => {
        if (isMainCardScratched && isMaltiplierCardScratched) {
            onScratchedEnought();
        }
    }, [isMainCardScratched, isMaltiplierCardScratched]);

    return {
        roundScratchCardRef,
        mainScratchCardRef,
        onMainCardScratched,
        onMaltiplierCardScratched,
        onPlay,
        onSwipe,
        onScratchStarted,
    }
}