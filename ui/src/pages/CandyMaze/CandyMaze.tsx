import { useParams } from 'react-router-dom';


import { Icon } from '@components/shared/Icon';

import styles from './CandyMaze.module.scss';

import { IScratchCardHandle, ScratchCard } from '@components/ScratchCard';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { CANDY_MAZE_BUNDLE, ICandyMazeBundle } from '@config/candyMazeBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';
import { CandyMazeSpriteCell, ICandyMazeSpriteCellData, ICandyMazeSpriteCellProps } from './components/CandyMazeSpriteCell/CandyMazeSpriteCell';
import { useSpriteCellData } from './hooks/useSpriteCellData';
import { ICandyMazeCardData } from './ICandyMaze.model';

import { BigWinScreen } from '@components/BigWinScreen/BigWinScreen';
import { Footer } from '@components/Footer/Footer';
import { useScratchGame } from '@hooks/useScratchGame';
import { useSwipeAria } from '@hooks/useSwipeAria';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ITopScratchSpriteCellProps, TopScratchSpriteCell } from './components/TopScratchSpriteCell/TopScratchSpriteCell';

import { GameFooterBtn } from '@components/GameFooterBtn/GameFooterBtn';
import { IGameMatrixConfig } from '@components/shared/IconMatrix';
import { IScratchAnimationHandle, ScratchAnimation, ScratchAnimationName } from '@components/shared/ScratchAnimation/ScratchAnimation';
import candy_clouds from '@icons/candy_clouds.svg';
import candy_maze from '@icons/candy_maze.svg';
import candy_stars_bg from '@icons/candy_stars_bg.svg';
import shining from '@icons/shining.svg';

const topScratchCardMatrixConfig: IGameMatrixConfig = {
    paddintBottom: 2,
}

const mainMatrixConfig: IGameMatrixConfig = {
    cellPadding: 22
}

export function CandyMaze() {
    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);
    // const { buyCard, card, loading: isCardBuying } = useBuyCard<ICandyMazeCardData>();

    const bundleName = CANDY_MAZE_BUNDLE.name
    const { bundle, loading: isBundleLoading } = useLoadBundle<ICandyMazeBundle>(bundleName)

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
        onSwipe,
        onScratchAnimationCompleted,
        card,
        // onCardScratched,
        // onScratchStarted,
    } = useScratchGame<ICandyMazeCardData>(
        batchId,
        // card,
        // buyCard,
        scratchCardsRefConfig,
        scratchAnimationRef
    );

    // const onMainCardScratched = useCallback(() => { onCardScratched('mainScratchCard') }, [])
    // const onTopCardScratched = useCallback(() => { onCardScratched('topScratchCard') }, [])

    const renderCandyMazeSpriteCell = useCallback((data: ICandyMazeSpriteCellProps) => (<CandyMazeSpriteCell {...data} />), []);
    const renderTopScratchSpriteCell = useCallback((data: ITopScratchSpriteCellProps) => (<TopScratchSpriteCell {...data} />), []);

    const {
        onTouchEnd,
        onTouchMove,
        onTouchStart,
        onMouseDown,
        onMouseMove,
        onMouseUp,
    } = useSwipeAria({
        onSwipedLeft: onSwipe,
        onSwipedRight: onSwipe
    });

    const [topScratchCardData, setTopScratchCardData] = useState<ICandyMazeSpriteCellData[][]>([]);

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
                <Icon name={candy_maze} className={styles.headerIcon} />
            </div>
            <div className={styles.content}>
                <Icon name={candy_clouds} className={styles.candyCloudes} />
                <Icon name={candy_stars_bg} className={styles.candyStarsBg} />
                <Icon name={shining} className={styles.candyMazeShining} />
                <div className={styles.radialShining}></div>
                <TopPrizeLabel topPrize={batch?.maxPrize || 0} />

                <div className={styles.scratchAreaContainer}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
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
                            // coverTextureName='wideCover'
                            matrixConfig={topScratchCardMatrixConfig}
                            // onScratchedEnought={onTopCardScratched}
                            // onScratchStarted={onScratchStarted}
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
                            renderCell={renderCandyMazeSpriteCell}
                            matrixConfig={mainMatrixConfig}

                            sizeX={batch?.sizeX}
                            sizeY={batch?.sizeY}

                            // onScratchedEnought={onMainCardScratched}
                            // onScratchStarted={onScratchStarted}
                        />
                    </div>
                </div>
                <GameFooterBtn onPlay={onPlay} />
                <Footer />
            </div>
            {isBigWinVisible
                && <BigWinScreen
                    winAmount={card?.winning || 0}
                    winType={card?.winType}
                    onClick={onBigWinClicked}
                />}
        </div>
    );
}
