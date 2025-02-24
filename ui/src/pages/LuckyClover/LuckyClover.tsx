import { useParams } from 'react-router-dom';


import { Icon } from '@components/shared/Icon';

import styles from './LuckyClover.module.scss';

import { IScratchCardHandle, ScratchCard } from '@components/ScratchCard';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { ILuckyCloverBundle, LUCKY_CLOVER_BUNDLE } from '@config/luckyCloverBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';
import { ILuckyCloverSpriteCellProps, LuckyCloverSpriteCell } from './components/LuckyCloverSpriteCell/LuckyCloverSpriteCell';
import { useSpriteCellData } from './hooks/useSpriteCellData';
import { ILuckyCloverCardData } from './LuckyClover.model';

import { BigWinScreen } from '@components/BigWinScreen/BigWinScreen';
import { Footer } from '@components/Footer/Footer';
import { useScratchGame } from '@hooks/useScratchGame/useScratchGame';
import { useCallback, useMemo, useRef } from 'react';

import { GameFooterBtn } from '@components/GameFooterBtn/GameFooterBtn';
import { emptyGradientData, luckyCloverCardBgGradient } from '@components/ScratchCard/ScratchCardBgGradient';
import { IGameMatrixConfig } from '@components/shared/IconMatrix';
import { IScratchAnimationHandle, ScratchAnimation, ScratchAnimationName } from '@components/shared/ScratchAnimation/ScratchAnimation';
import { NO_TAP_SOUND_CLASS } from '@hooks/usePlaySound';
import { ILuckyTopScratchCellProps, LuckyTopScratchCell } from './components/LuckyTopScratchCell/LuckyTopScratchCell';
import { useRenderBg } from './hooks/useRenderBg';
import { useTopScratchCardData } from './hooks/useTopScratchCardData';

const topScratchCardMatrixConfig: IGameMatrixConfig = {
    paddintBottom: 2,
    paddintLeft: 2,
    cellPadding: 2,
    containerPadding: 0,
}

const mainMatrixConfig: IGameMatrixConfig = {
    cellPadding: 0
}

export function LuckyClover() {
    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);
    // const { buyCard, card, loading: isCardBuying } = useBuyCard<ILuckyCloverCardData>();

    const bundleName = LUCKY_CLOVER_BUNDLE.name
    const { bundle, loading: isBundleLoading } = useLoadBundle<ILuckyCloverBundle>(bundleName)

    const topScratchCardRef = useRef<IScratchCardHandle>(null);
    const mainScratchCardRef = useRef<IScratchCardHandle>(null);

    const scratchCardsRefConfig = useMemo(() => ({
        'topScratchCard': topScratchCardRef,
        'mainScratchCard': mainScratchCardRef,
    }), [topScratchCardRef, mainScratchCardRef]);

    const scratchAnimationRef = useRef<IScratchAnimationHandle>(null);

    const {
        isBigWinVisible,
        onBigWinClicked,
        onPlay,
        onScratchAnimationCompleted,
        card,
        isPlayBtnDisabled,
    } = useScratchGame<ILuckyCloverCardData>(
        batchId,
        scratchCardsRefConfig,
        scratchAnimationRef
    );

    const renderLuckyCloverSpriteCell = useCallback((data: ILuckyCloverSpriteCellProps) => (<LuckyCloverSpriteCell {...data} />), []);
    const renderTopScratchSpriteCell = useCallback((data: ILuckyTopScratchCellProps) => (<LuckyTopScratchCell {...data} />), []);

    const { topScratchCardData } = useTopScratchCardData(card, bundleName);
    const { data } = useSpriteCellData(card, bundleName)

    const { renderBgTexture } = useRenderBg();

    const isLoading = isBatchLoading || isBundleLoading;
    const hiddenClass = isLoading || !bundle ? 'hidden' : '';

    return (
        <div className={`${styles.mainContainer} ${hiddenClass}`}>
            <div className={styles.headerLogoContainer}>
                <Icon className={styles.headerIcon} >
                    <img src={'/luckyClover/lucky_clover_logo.png'} width='100%' />
                </Icon>
            </div>
            <div className={styles.content}>
                <TopPrizeLabel topPrize={batch?.maxPrize || 0} />

                <div className={`${styles.scratchAreaContainer} ${NO_TAP_SOUND_CLASS}`}
                    onClick={onPlay}
                >
                    <div className={styles.animationContainer}>
                        <ScratchAnimation
                            ref={scratchAnimationRef}
                            animationName={ScratchAnimationName.candy_action}
                            onComplete={onScratchAnimationCompleted}
                        />
                    </div>
                    <div className={styles.topScratchCardContainer}>
                        <ScratchCard
                            ref={topScratchCardRef}
                            data={topScratchCardData}
                            className={styles.scratchCard}
                            bundleName={bundleName}
                            renderCell={renderTopScratchSpriteCell}
                            matrixConfig={topScratchCardMatrixConfig}
                            gradientData={emptyGradientData}
                            winningBgTexture={null}
                        />
                    </div>
                    <div
                        className={styles.scratchCardContainer}
                    >
                        <ScratchCard
                            ref={mainScratchCardRef}
                            data={data}
                            className={styles.scratchCard}
                            bundleName={bundleName}
                            renderCell={renderLuckyCloverSpriteCell}
                            matrixConfig={mainMatrixConfig}
                            sizeX={batch?.sizeX}
                            sizeY={batch?.sizeY}
                            gradientData={luckyCloverCardBgGradient}
                            renderBgTexture={renderBgTexture}
                        />
                    </div>
                </div>
                <GameFooterBtn batchCardType={batch?.cardType || null} onPlay={onPlay} isPlayBtnDisabled={isPlayBtnDisabled} />
            </div>
            <Footer />
            {isBigWinVisible
                && <BigWinScreen
                    winAmount={card?.winning || 0}
                    winType={card?.winType}
                    onClick={onBigWinClicked}
                />}
        </div>
    );
}
