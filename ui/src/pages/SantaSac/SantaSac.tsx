import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '@components/Header';
import { Icon } from '@components/shared/Icon';

import styles from './SantaSac.module.scss';

import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';
import { useBuyCard } from '@services/api/cards.service';

import { BigWinScreen } from '@components/BigWinScreen/BigWinScreen';
import { GameFooterBtn } from '@components/GameFooterBtn/GameFooterBtn';
import { IBgTextureConfig, IScratchCardHandle, ScratchCard } from '@components/ScratchCard';
import { IRoundScratchCardHandle, RoundScratchCard } from '@components/ScratchCard/components/RoundScratchCard/RoundScratchCard';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { ISantaSacBundle, SANTA_SAC_BUNDLE } from '@config/santaSacBundleConfig';
import { useScratchGame } from '@hooks/useScratchGame';
import { useSwipeAria } from '@hooks/useSwipeAria';

import { useSpriteCellData } from './hooks/useSpriteCellData';
import { ISantaSacCardData } from './SantaSac.model';
import { SantaSacSpriteCell } from './SantaSacSpriteCell';

import santa_sac from '@icons/santa_sac.svg';
import shining from '@icons/shining.svg';
import round_multiplier from '@icons/round_multiplier.svg';

const bgTextureConfig: IBgTextureConfig = {
    textureName: 'redBallShining',
    xShift: 0,
    yShift: 0,
    padding: 0,
}

export function SantaSac() {
    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);
    const { buyCard, card } = useBuyCard<ISantaSacCardData>();

    const bundleName = SANTA_SAC_BUNDLE.name
    const { bundle, loading: isBundleLoading } = useLoadBundle<ISantaSacBundle>(bundleName)

    const { data } = useSpriteCellData(card, bundleName)

    const roundScratchCardRef = useRef<IRoundScratchCardHandle>(null);
    const mainScratchCardRef = useRef<IScratchCardHandle>(null);

    const scratchCardsRefConfig = useMemo(() => ({
        'roundScratchCard': roundScratchCardRef,
        'mainScratchCard': mainScratchCardRef,
    }), [roundScratchCardRef, mainScratchCardRef]);

    const {
        isBigWinVisible,
        setIsBigWinVisible,
        onCardScratched,
        onPlay,
        onSwipe,
        onScratchStarted,
    } = useScratchGame(batchId, card, buyCard, scratchCardsRefConfig);

     const {
        onTouchEnd,
        onTouchMove,
        onTouchStart,
        onMouseDown,
        onMouseMove,
        onMouseUp,
     } = useSwipeAria({
        onSwipedLeft: () => { onSwipe() },
        onSwipedRight: () => { onSwipe() },
     });

    const isLoading = isBatchLoading || isBundleLoading;
    const hiddenClass = isLoading || !bundle ? 'hidden' : '';

    const multiplier = card?.cardData.multiplier;
    const multiplierText = multiplier ? 'x' + multiplier : '';

    return (
        <div className={`${styles.mainContainer} ${hiddenClass}`}>
            <Header />
            <div className={styles.headerLogoContainer}>
                <Icon name={santa_sac} className={styles.headerIcon} />
            </div>
            <div className={styles.content}>
                <TopPrizeLabel className={styles.topPrizeLabel} topPrize={batch?.totalPotentialPrizes || 0} />
                <div className={styles.multiplierContainer}>
                    <div className={styles.toyChainContainer}>
                        <img className={styles.toyChainImg} src="/santaSac/christmassToyChain.png" />
                    </div>
                    <Icon name={round_multiplier} className={styles.roundMulriplierIcon} />
                    <RoundScratchCard
                        ref={roundScratchCardRef}
                        cellData={multiplierText}
                        className={styles.roundScratchCard}
                        bundleName={SANTA_SAC_BUNDLE.name}
                        bgTextureConfig={bgTextureConfig}
                        matrixConfig={{ containerPadding: 14, cellPadding: 2 }}
                        onScratchedEnought={() => { onCardScratched('roundScratchCard') }}
                        onScratchStarted={() => onScratchStarted()}
                        xShift={0.52}
                        yShift={0.45}
                    />
                </div>
                <div
                    className={styles.scratchCardContainer}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                >
                    <Icon name={shining} className={styles.shiningIcon} />
                    <ScratchCard
                        ref={mainScratchCardRef}
                        data={data}
                        className={styles.scratchCard}
                        bundleName={bundleName}
                        renderCell={(data) => (<SantaSacSpriteCell {...data} />)}

                        sizeX={batch?.sizeX}
                        sizeY={batch?.sizeY}

                        onScratchedEnought={() => { onCardScratched('mainScratchCard') }}
                        onScratchStarted={() => onScratchStarted()}
                    />
                </div>
                <GameFooterBtn onPlay={onPlay}/>
            </div>
            {isBigWinVisible
                && <BigWinScreen
                    winAmount={card?.winning || 0}
                    topPrize={batch?.totalPotentialPrizes || 0}
                    onClick={() => setIsBigWinVisible(false)}
                />}
        </div>
    );
}
