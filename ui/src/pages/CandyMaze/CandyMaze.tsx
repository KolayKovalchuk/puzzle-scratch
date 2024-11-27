import { useParams } from 'react-router-dom';


import { Header } from '@components/Header';
import { Icon } from '@components/shared/Icon';

import styles from './CandyMaze.module.scss';

import { IScratchCardHandle, ScratchCard } from '@components/ScratchCard';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { CANDY_MAZE_BUNDLE, ICandyMazeBundle } from '@config/candyMazeBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';
import { useBuyCard } from '@services/api/cards.service';
import { CandyMazeSpriteCell, ICandyMazeSpriteCellData } from './components/CandyMazeSpriteCell/CandyMazeSpriteCell';
import { useSpriteCellData } from './hooks/useSpriteCellData';
import { ICandyMazeCardData } from './ICandyMaze.model';

import { BigWinScreen } from '@components/BigWinScreen/BigWinScreen';
import { useScratchGame } from '@hooks/useScratchGame';
import { useSwipeAria } from '@hooks/useSwipeAria';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TopScratchSpriteCell } from './components/TopScratchSpriteCell/TopScratchSpriteCell';

import { GameFooterBtn } from '@components/GameFooterBtn/GameFooterBtn';
import candy_clouds from '@icons/candy_clouds.svg';
import candy_maze from '@icons/candy_maze.svg';
import candy_stars_bg from '@icons/candy_stars_bg.svg';
import shining from '@icons/shining.svg';

export function CandyMaze() {
    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);
    const { buyCard, card } = useBuyCard<ICandyMazeCardData>();

    const bundleName = CANDY_MAZE_BUNDLE.name
    const { bundle, loading: isBundleLoading } = useLoadBundle<ICandyMazeBundle>(bundleName)

    const { data } = useSpriteCellData(card, bundleName)

    const topScratchCardRef = useRef<IScratchCardHandle>(null);
    const mainScratchCardRef = useRef<IScratchCardHandle>(null);

    const scratchCardsRefConfig = useMemo(() => ({
        'topScratchCard': topScratchCardRef,
        'mainScratchCard': mainScratchCardRef,
    }), [topScratchCardRef, mainScratchCardRef]);

    const {
        isBigWinVisible,
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

    const [topScratchCardData, setTopScratchCardData] = useState<ICandyMazeSpriteCellData[][]>([]);

    useEffect(() => {
        if (!card) return;

        setTopScratchCardData([[{ textureName: card.cardData.potentialWin + '' || '0', bundleName }]])
    }, [card]);

    const isLoading = isBatchLoading || isBundleLoading;
    const hiddenClass = isLoading || !bundle ? 'hidden' : '';

    return (
        <div className={`${styles.mainContainer} ${hiddenClass}`}>
            <Header />
            <div className={styles.headerLogoContainer}>
                <Icon name={candy_maze} className={styles.headerIcon} />
            </div>
            <div className={styles.content}>
                <Icon name={candy_clouds} className={styles.candyCloudes} />
                <Icon name={candy_stars_bg} className={styles.candyStarsBg} />
                <Icon name={shining} className={styles.candyMazeShining} />
                <div className={styles.radialShining}></div>
                <TopPrizeLabel topPrize={batch?.totalPotentialPrizes || 0} />
                <div className={styles.potentialPrizeContainer}>
                    <ScratchCard
                            ref={topScratchCardRef}
                            data={topScratchCardData}
                            className={styles.scratchCard}
                            bundleName={bundleName}
                            renderCell={(data) => (<TopScratchSpriteCell {...data} />)}

                            sizeX={1}
                            sizeY={1}

                            coverTextureName='wideCover'

                            matrixConfig={{
                                cellHeight: 50,
                                cellPadding: 0,
                                containerPadding: 4,
                                paddintBottom: 5,
                            }}

                            onScratchedEnought={() => { onCardScratched('topScratchCard') }}
                            onScratchStarted={() => onScratchStarted()}
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
                    <ScratchCard
                        ref={mainScratchCardRef}
                        data={data}
                        className={styles.scratchCard}
                        bundleName={bundleName}
                        renderCell={(data) => (<CandyMazeSpriteCell {...data} />)}

                        sizeX={batch?.sizeX}
                        sizeY={batch?.sizeY}

                        onScratchedEnought={() => { onCardScratched('mainScratchCard') }}
                        onScratchStarted={() => onScratchStarted()}
                    />
                </div>
                <GameFooterBtn onPlay={onPlay}/>
            </div>
            {isBigWinVisible && <BigWinScreen winAmount={card?.winning} />}
        </div>
    );
}
