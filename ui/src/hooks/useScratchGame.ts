import { IScratchCardHandle } from '@components/ScratchCard';
import { IRoundScratchCardHandle } from '@components/ScratchCard/components/RoundScratchCard/RoundScratchCard';
import { IBuyBatchCardData, ICardData } from '@models/IBuyBatchCardData';
import { useEffect, useRef, useState } from 'react';

let timeout: NodeJS.Timeout | null = null;

const BIG_WIN_TIMEOUT = 2.5 * 1000;

export function useScratchGame<CardData extends ICardData = ICardData>(
    batchId: string | undefined,
    card: IBuyBatchCardData<CardData> | null,
    buyCard: (batchId: string) => Promise<IBuyBatchCardData<CardData> | null>
) {
    const roundScratchCardRef = useRef<IRoundScratchCardHandle>(null);
    const mainScratchCardRef = useRef<IScratchCardHandle>(null);
    
    const [lastAction, setLastAction] = useState<'playBtnClick' | 'swipe' | 'scratch' | null>(null);
    const [ isBigWinVisible, setIsBigWinVisible ] = useState(false);


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
        
        if (!batchId || !roundScratch || ! mainScratch || isBigWinVisible) return

        mainScratch.reset();
        roundScratch.reset();
        
        const card = await buyCard(batchId)

        mainScratch.reveal();
        setMainCardScratched(true);

        roundScratch.reveal();
        setMaltiplierCardScratched(true);

        setLastAction('playBtnClick');

        onScratchedEnought(card);
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

    const onScratchedEnought = (cardDataArg?: IBuyBatchCardData<CardData> | null) => {
        const cardData = cardDataArg || card;

        if (cardData?.winning) {

            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            setIsBigWinVisible(true);
            console.log('onScratchedEnought', cardData);
            

            timeout = setTimeout(() => {
                setIsBigWinVisible(false);
            }, BIG_WIN_TIMEOUT);

            console.log('You win ' + cardData.winning + ' RBAX. Your new balance is ' + cardData.rbaxBalance + ' RBAX')
        } else if (cardData) {
            console.log('You lose. Your balance is ' + cardData?.rbaxBalance + ' RBAX')
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
        isBigWinVisible,
        onMainCardScratched,
        onMaltiplierCardScratched,
        onPlay,
        onSwipe,
        onScratchStarted,
    }
}