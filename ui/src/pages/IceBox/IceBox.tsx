import { useParams } from 'react-router-dom';


import { Icon } from '@components/shared/Icon';

import styles from './IceBox.module.scss';

import { IBgTextureConfig, IScratchCardHandle, ScratchCard } from '@components/ScratchCard';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { ICE_BOX_BUNDLE, IIceBoxBundle } from '@config/iceBoxBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';

import { BigWinScreen } from '@components/BigWinScreen/BigWinScreen';
import { useScratchGame } from '@hooks/useScratchGame/useScratchGame';
import { useCallback, useMemo, useRef } from 'react';

import { Footer } from '@components/Footer/Footer';
import { GameFooterBtn } from '@components/GameFooterBtn/GameFooterBtn';
import { RoundScratchCard } from '@components/ScratchCard/components/RoundScratchCard/RoundScratchCard';
import { IGameMatrixConfig } from '@components/shared/IconMatrix';
import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { DiamondSpriteCell, IDiamondSpriteCellData, IDiamondSpriteCellProps } from './components/DiamondSpriteCell/DiamondSpriteCell';
import { IceBoxSpriteCell, IIceBoxSpriteCellProps } from './components/IceBoxSpriteCell/IceBoxSpriteCell';
import { useSpriteCellData } from './hooks/useSpriteCellData';

import { emptyGradientData } from '@components/ScratchCard/ScratchCardBgGradient';
import { IScratchAnimationHandle, ScratchAnimation, ScratchAnimationName } from '@components/shared/ScratchAnimation/ScratchAnimation';
import twoX_multiplaier from '@icons/iceBox/2x_multiplaier.svg';
import fiveX_multiplaier from '@icons/iceBox/5x_multiplaier.svg';
import footer_stars from '@icons/iceBox/footer_stars.svg';
import ice_box_header_diamonds_stars from '@icons/iceBox/ice_box_header_diamonds_stars.svg';
import ice_box_logo from '@icons/iceBox/ice_box_logo.svg';
import ice_box_logo_shining from '@icons/iceBox/ice_box_logo_shining.svg';
import ice_box_shining from '@icons/iceBox/ice_box_shining.svg';
import { IIceBoxCardData } from './IceBox.model';
import { CardsBonusTypesDict, useIsBonusShining } from '@hooks/useWinningBgConfig';
import { isCellWinnings } from '@utils/isCellWinnings';
import { NO_TAP_SOUND_CLASS } from '@hooks/usePlaySound';


const bgTextureConfig: IBgTextureConfig = {
    textureName: 'redBall',
}

const roundMatrixConfig: IGameMatrixConfig = {
    containerPadding: 8,
    cellPadding: 8,
}

const daimondMatrixConfig: IGameMatrixConfig = {
    containerPadding: 0,
    cellPadding: -6,
}

const mainMatrixConfig: IGameMatrixConfig = {
    cellPadding: 4,
    winningBgTextureYShiftCoef: 1.2,
}

const diamondCardCoverTextureName: string[][] = [
    ['blueDaimond', 'redDaimond', 'pinkDaimond', 'orangeDaimond', 'greenDaimond'],
]
const diamondCardSizeX = diamondCardCoverTextureName[0]?.length || 0;
const diamondCardSizeY = diamondCardCoverTextureName.length;

export function IceBox() {
    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);
    // const { buyCard, card } = useBuyCard<IIceBoxCardData>();

    const bundleName = ICE_BOX_BUNDLE.name
    const { bundle, loading: isBundleLoading } = useLoadBundle<IIceBoxBundle>(bundleName)

    const x2MultyplierScratchCardRef = useRef<IScratchCardHandle>(null);
    const x5MultyplierScratchCardRef = useRef<IScratchCardHandle>(null);
    const diamondScratchCardRef = useRef<IScratchCardHandle>(null);
    const mainScratchCardRef = useRef<IScratchCardHandle>(null);

    const scratchCardsRefConfig = useMemo(() => ({
        'x2MultyplierScratchCard': x2MultyplierScratchCardRef,
        'x5MultyplierScratchCard': x5MultyplierScratchCardRef,
        'diamondScratchCardRef': diamondScratchCardRef,
        'mainScratchCard': mainScratchCardRef,
    }), [
        x2MultyplierScratchCardRef,
        x5MultyplierScratchCardRef,
        diamondScratchCardRef,
        mainScratchCardRef
    ]);

    const scratchAnimationRef = useRef<IScratchAnimationHandle>(null);

    const {
        isBigWinVisible,
        onBigWinClicked,
        onPlay,
        // onSwipe,
        onScratchAnimationCompleted,
        card,
        isPlayBtnDisabled,
        // onCardScratched,
        // onScratchStarted,
    } = useScratchGame<IIceBoxCardData>(
        batchId,
        // card,
        // buyCard,
        scratchCardsRefConfig,
        scratchAnimationRef
    );

    // const onMainCardScratched = useCallback(() => { onCardScratched('mainScratchCard') }, [])
    // const onDiamondCardScratched = useCallback(() => { onCardScratched('diamondScratchCard') }, [])
    // const onX2CardScratched = useCallback(() => { onCardScratched('x2MultyplierScratchCard') }, [])
    // const onX5CardScratched = useCallback(() => { onCardScratched('x5MultyplierScratchCard') }, [])

    const renderCell = useCallback((data: IIceBoxSpriteCellProps) => (<IceBoxSpriteCell {...data} />), []);
    const renderDaimondCell = useCallback((data: IDiamondSpriteCellProps) => (<DiamondSpriteCell {...data} />), []);

    // const {
    //     onTouchEnd,
    //     onTouchMove,
    //     onTouchStart,
    //     onMouseDown,
    //     onMouseMove,
    //     onMouseUp,
    // } = useSwipeAria({
    //     onSwipedLeft: onSwipe,
    //     onSwipedRight: onSwipe
    // });

    const isLoading = isBatchLoading || isBundleLoading;
    const hiddenClass = isLoading || !bundle ? 'hidden' : '';

    const x2Multiplier = card?.cardData.x2.toString() || '';
    const x5Multiplier = card?.cardData.x5.toString() || '';

    const diamondScratchCardData: IDiamondSpriteCellData[][] = useMemo(() => {
        if (!card) return [[]];

        return [card?.cardData.bonus.map((textureName, index) => {
            const isWinning = isCellWinnings(card.cardData.winningCells || [], CardsBonusTypesDict.IceBoxDiamondBonus[0], index);
            return {
                textureName: textureName.toString(),
                bundleName,
                isWinning,
            }
        })];
    }, [card?.cardData.bonus, card?.cardData.winningCells, bundleName]);

    const { data } = useSpriteCellData(card, bundleName)

    const { containerRef: redlayerRef, dimensions } = useContainerDimensions();
    daimondMatrixConfig.cellWidth = (dimensions.width / diamondCardSizeX) * 1.1;
    daimondMatrixConfig.cellHeight = daimondMatrixConfig.cellWidth;

    const isX2BonusShining = useIsBonusShining(CardsBonusTypesDict.IceBoxX2Bonus, card?.cardData.winningCells || null);
    const isX5BonusShining = useIsBonusShining(CardsBonusTypesDict.IceBoxX5Bonus, card?.cardData.winningCells || null);

    return (
        <div className={`${styles.mainContainer} ${hiddenClass}`}>
            <div className={styles.headerLogoContainer}>
                <Icon name={ice_box_logo_shining} className={styles.iceBoxHeaderShining} />
                <Icon name={ice_box_logo} className={styles.iceBoxHeaderIcon} />
                <Icon name={ice_box_header_diamonds_stars} className={styles.iceBoxHeaderIconDiamonds} />
            </div>
            <TopPrizeLabel topPrize={batch?.maxPrize || 0} className={styles.topPrizeLabel} />
            <div className={styles.content}>
                <div className={`${styles.scratchAreaContainer} ${NO_TAP_SOUND_CLASS}`}
                    // onTouchStart={onTouchStart}
                    // onTouchEnd={onTouchEnd}
                    // onTouchMove={onTouchMove}
                    // onMouseDown={onMouseDown}
                    // onMouseUp={onMouseUp}
                    // onMouseMove={onMouseMove}
                    onClick={onPlay}
                >
                    <div className={styles.animationContainer}>
                        <ScratchAnimation
                            ref={scratchAnimationRef}
                            animationName={ScratchAnimationName.ice_action}
                            onComplete={onScratchAnimationCompleted}
                        />
                    </div>
                    <div className={styles.roundScratchCard}>
                        <Icon name={twoX_multiplaier} className={styles.multiplierLabel} />
                        <RoundScratchCard
                            ref={x2MultyplierScratchCardRef}
                            className={styles.multiplierScratchCard}
                            cellData={x2Multiplier}
                            bundleName={ICE_BOX_BUNDLE.name}
                            bgTextureConfig={bgTextureConfig}
                            matrixConfig={roundMatrixConfig}
                            isWinning={isX2BonusShining}
                        // onScratchedEnought={onX2CardScratched}
                        // onScratchStarted={onScratchStarted}
                        />
                    </div>
                    <div className={`${styles.roundScratchCard} ${styles.right}`}>
                        <Icon name={fiveX_multiplaier} className={styles.multiplierLabel} />
                        <RoundScratchCard
                            ref={x5MultyplierScratchCardRef}
                            className={styles.multiplierScratchCard}
                            cellData={x5Multiplier}
                            bundleName={ICE_BOX_BUNDLE.name}
                            bgTextureConfig={bgTextureConfig}
                            matrixConfig={roundMatrixConfig}
                            isWinning={isX5BonusShining}
                        // onScratchedEnought={onX5CardScratched}
                        // onScratchStarted={onScratchStarted}
                        />
                    </div>
                    <div className={styles.diamondsRowContainer}>
                        <div className={styles.redLayer} ref={redlayerRef}>
                            <ScratchCard
                                ref={diamondScratchCardRef}
                                data={diamondScratchCardData}
                                className={styles.daimondScratchCard}
                                bundleName={bundleName}
                                renderCell={renderDaimondCell}

                                // coverTextureName={diamondCardCoverTextureName}
                                matrixConfig={daimondMatrixConfig}
                                gradientData={emptyGradientData}

                                sizeX={diamondCardSizeX}
                                sizeY={diamondCardSizeY}

                            // onScratchedEnought={onDiamondCardScratched}
                            // onScratchStarted={onScratchStarted}
                            />
                        </div>
                    </div>
                    <div className={styles.shiningContainer}>
                        <Icon name={ice_box_shining} className={styles.shiningIcon} />
                        <div
                            className={styles.scratchCardContainer}
                        >
                            <ScratchCard
                                ref={mainScratchCardRef}
                                data={data}
                                className={styles.scratchCard}
                                bundleName={bundleName}
                                renderCell={renderCell}
                                matrixConfig={mainMatrixConfig}


                                sizeX={batch?.sizeX}
                                sizeY={batch?.sizeY}

                            // onScratchedEnought={onMainCardScratched}
                            // onScratchStarted={onScratchStarted}
                            />
                        </div>
                    </div>
                </div>
                <GameFooterBtn batchCardType={batch?.cardType || null} onPlay={onPlay} isPlayBtnDisabled={isPlayBtnDisabled}>
                    <Icon name={footer_stars} className={styles.footerStars} />
                </GameFooterBtn>
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
