import { useParams } from 'react-router-dom';


import { Icon } from '@components/shared/Icon';

import styles from './VegasLoot.module.scss';

import { IScratchCardHandle, ScratchCard } from '@components/ScratchCard';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { VEGAS_LOOT_BUNDLE, IVegasLootBundle } from '@config/vegasLootBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';
import { VegasLootSpriteCell, IVegasLootSpriteCellData, IVegasLootSpriteCellProps } from './components/VegasLootSpriteCell/VegasLootSpriteCell';
import { useSpriteCellData } from './hooks/useSpriteCellData';
import { IVegasLootCardData } from './VegasLoot.model';

import { BigWinScreen } from '@components/BigWinScreen/BigWinScreen';
import { Footer } from '@components/Footer/Footer';
import { useScratchGame } from '@hooks/useScratchGame/useScratchGame';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { GameFooterBtn } from '@components/GameFooterBtn/GameFooterBtn';
import { IGameMatrixConfig } from '@components/shared/IconMatrix';
import { IScratchAnimationHandle, ScratchAnimation, ScratchAnimationName } from '@components/shared/ScratchAnimation/ScratchAnimation';
import { NO_TAP_SOUND_CLASS } from '@hooks/usePlaySound';
import vegasLoot from '@icons/vegasLoot/vegasLoot.svg';
import { ITopScratchSpriteCellProps, TopScratchSpriteCell } from '@components/TopScratchSpriteCell/TopScratchSpriteCell';

const topScratchCardMatrixConfig: IGameMatrixConfig = {
    paddintBottom: 2,
}

const mainMatrixConfig: IGameMatrixConfig = {
    cellPadding: 19
}

export function VegasLoot() {
    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);
    // const { buyCard, card, loading: isCardBuying } = useBuyCard<IVegasLootCardData>();

    const bundleName = VEGAS_LOOT_BUNDLE.name
    const { bundle, loading: isBundleLoading } = useLoadBundle<IVegasLootBundle>(bundleName)

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
    } = useScratchGame<IVegasLootCardData>(
        batchId,
        scratchCardsRefConfig,
        scratchAnimationRef
    );

    const renderVegasLootSpriteCell = useCallback((data: IVegasLootSpriteCellProps) => (<VegasLootSpriteCell {...data} />), []);
    const renderTopScratchSpriteCell = useCallback((data: ITopScratchSpriteCellProps) => (<TopScratchSpriteCell {...data} />), []);

    const [topScratchCardData, setTopScratchCardData] = useState<IVegasLootSpriteCellData[][]>([]);

    useEffect(() => {
        if (!card) return;

        setTopScratchCardData([[{ textureName: card.cardData.potentialWin + '' || '0', bundleName }]])
    }, [card]);

    const { data } = useSpriteCellData(card, bundleName)

    const isLoading = isBatchLoading || isBundleLoading;
    const hiddenClass = isLoading || !bundle ? 'hidden' : '';

    return (
        <div className={`${styles.mainContainer} ${hiddenClass}`}>
            <div className={styles.headerLogoContainer}>
                <Icon name={vegasLoot} className={styles.headerIcon} />
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
                    <div className={styles.potentialPrizeContainer}>
                        <ScratchCard
                            ref={topScratchCardRef}
                            data={topScratchCardData}
                            className={styles.scratchCard}
                            bundleName={bundleName}
                            renderCell={renderTopScratchSpriteCell}
                            sizeX={1}
                            sizeY={1}
                            matrixConfig={topScratchCardMatrixConfig}
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
                            renderCell={renderVegasLootSpriteCell}
                            matrixConfig={mainMatrixConfig}
                            sizeX={batch?.sizeX}
                            sizeY={batch?.sizeY}
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
