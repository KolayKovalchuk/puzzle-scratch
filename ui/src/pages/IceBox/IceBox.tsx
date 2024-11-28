import { useParams } from 'react-router-dom';


import { Icon } from '@components/shared/Icon';

import styles from './IceBox.module.scss';

import { IBgTextureConfig, IScratchCardHandle, ScratchCard } from '@components/ScratchCard';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { ICE_BOX_BUNDLE, IIceBoxBundle } from '@config/iceBoxBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';
import { useBuyCard } from '@services/api/cards.service';

import { BigWinScreen } from '@components/BigWinScreen/BigWinScreen';
import { useScratchGame } from '@hooks/useScratchGame';
import { useSwipeAria } from '@hooks/useSwipeAria';
import { useCallback, useMemo, useRef } from 'react';

import { GameFooterBtn } from '@components/GameFooterBtn/GameFooterBtn';
import { RoundScratchCard } from '@components/ScratchCard/components/RoundScratchCard/RoundScratchCard';
import { IGameMatrixConfig } from '@components/shared/IconMatrix';
import { IceBoxSpriteCell, IIceBoxSpriteCellProps } from './components/IceBoxSpriteCell/IceBoxSpriteCell';
import { useSpriteCellData } from './hooks/useSpriteCellData';
import { IIceBoxCardData } from './IceBox.model';

import twoX_multiplaier from '@icons/iceBox/2x_multiplaier.svg';
import fiveX_multiplaier from '@icons/iceBox/5x_multiplaier.svg';
import ice_box_header_diamonds_stars from '@icons/iceBox/ice_box_header_diamonds_stars.svg';
import ice_box_logo from '@icons/iceBox/ice_box_logo.svg';
import ice_box_logo_shining from '@icons/iceBox/ice_box_logo_shining.svg';

import blue_daimond from '@icons/diamonds/blue_daimond.svg';
import green_diamond from '@icons/diamonds/green_diamond.svg';
import orange_diamond from '@icons/diamonds/orange_diamond.svg';
import pink_diamond from '@icons/diamonds/pink_diamond.svg';
import red_diamond from '@icons/diamonds/red_diamond.svg';

import footer_stars from '@icons/iceBox/footer_stars.svg';
import ice_box_shining from '@icons/iceBox/ice_box_shining.svg';


const bgTextureConfig: IBgTextureConfig = {
    textureName: 'redBall',
}

const roundMatrixConfig: IGameMatrixConfig = {
    containerPadding: 8,
    cellPadding: 8,
}

export function IceBox() {
    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);
    const { buyCard, card } = useBuyCard<IIceBoxCardData>();

    const bundleName = ICE_BOX_BUNDLE.name
    const { bundle, loading: isBundleLoading } = useLoadBundle<IIceBoxBundle>(bundleName)

    const { data } = useSpriteCellData(card, bundleName)

    const x2MultyplierScratchCardRef = useRef<IScratchCardHandle>(null);
    const x5MultyplierScratchCardRef = useRef<IScratchCardHandle>(null);
    const mainScratchCardRef = useRef<IScratchCardHandle>(null);

    const scratchCardsRefConfig = useMemo(() => ({
        'x2MultyplierScratchCard': x2MultyplierScratchCardRef,
        'x5MultyplierScratchCard': x5MultyplierScratchCardRef,
        'mainScratchCard': mainScratchCardRef,
    }), [x2MultyplierScratchCardRef, mainScratchCardRef]);

    const {
        isBigWinVisible,
        onBigWinClicked,
        onCardScratched,
        onPlay,
        onSwipe,
        onScratchStarted,
    } = useScratchGame(batchId, card, buyCard, scratchCardsRefConfig);

    const onMainCardScratched = useCallback(() => { onCardScratched('mainScratchCard') }, [])
    const onX2CardScratched = useCallback(() => { onCardScratched('x2MultyplierScratchCard') }, [])
    const onX5CardScratched = useCallback(() => { onCardScratched('x5MultyplierScratchCard') }, [])

    const renderCell = useCallback((data: IIceBoxSpriteCellProps) => (<IceBoxSpriteCell {...data} />), []);

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

    const isLoading = isBatchLoading || isBundleLoading;
    const hiddenClass = isLoading || !bundle ? 'hidden' : '';

    const x2Multiplier = card?.cardData.x2;
    const x2MultiplierText = x2Multiplier ? 'x' + x2Multiplier : '';
    const x5Multiplier = card?.cardData.x5;
    const x5MultiplierText = x5Multiplier ? 'x' + x5Multiplier : '';

    return (
        <div className={`${styles.mainContainer} ${hiddenClass}`}>
            <div className={styles.headerLogoContainer}>
                <Icon name={ice_box_logo_shining} className={styles.iceBoxHeaderShining} />
                <Icon name={ice_box_logo} className={styles.iceBoxHeaderIcon} />
                <Icon name={ice_box_header_diamonds_stars} className={styles.iceBoxHeaderIconDiamonds} />
            </div>
            <div className={styles.content}>
                <TopPrizeLabel topPrize={batch?.totalPotentialPrizes || 0} className={styles.topPrizeLabel} />
                <div className={styles.multiplierContainer}>
                    <div className={styles.roundScratchCard}>
                        <Icon name={twoX_multiplaier} className={styles.multiplierLabel} />
                        <RoundScratchCard
                            ref={x2MultyplierScratchCardRef}
                            cellData={x2MultiplierText}
                            bundleName={ICE_BOX_BUNDLE.name}
                            bgTextureConfig={bgTextureConfig}
                            matrixConfig={roundMatrixConfig}
                            onScratchedEnought={onX2CardScratched}
                            onScratchStarted={onScratchStarted}
                        />
                    </div>
                    <div className={styles.diamondsRowContainer}>
                        <div className={styles.redLayer}>
                            <Icon name={blue_daimond} className={styles.diamondIcon} />
                            <Icon name={pink_diamond} className={styles.diamondIcon} />
                            <Icon name={red_diamond} className={styles.diamondIcon} />
                            <Icon name={orange_diamond} className={styles.diamondIcon} />
                            <Icon name={green_diamond} className={styles.diamondIcon} />
                        </div>
                    </div>
                    <div className={styles.roundScratchCard}>
                        <Icon name={fiveX_multiplaier} className={styles.multiplierLabel} />
                        <RoundScratchCard
                            ref={x5MultyplierScratchCardRef}
                            cellData={x5MultiplierText}
                            bundleName={ICE_BOX_BUNDLE.name}
                            bgTextureConfig={bgTextureConfig}
                            matrixConfig={roundMatrixConfig}
                            onScratchedEnought={onX5CardScratched}
                            onScratchStarted={onScratchStarted}
                        />
                    </div>
                </div>
                <div className={styles.shiningContainer}>
                    <Icon name={ice_box_shining} className={styles.shiningIcon} />
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
                            renderCell={renderCell}

                            sizeX={batch?.sizeX}
                            sizeY={batch?.sizeY}

                            onScratchedEnought={onMainCardScratched}
                            onScratchStarted={onScratchStarted}
                        />
                    </div>
                </div>
                <GameFooterBtn onPlay={onPlay}>
                    <Icon name={footer_stars} className={styles.footerStars} />
                </GameFooterBtn>
            </div>
            {isBigWinVisible
                && <BigWinScreen
                    winAmount={card?.winning || 0}
                    topPrize={batch?.totalPotentialPrizes || 0}
                    onClick={onBigWinClicked}
                />}
        </div>
    );
}
