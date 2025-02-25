import { useCallback, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Icon } from '@components/shared/Icon';

import styles from './SantaSac.module.scss';

import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';

import { BigWinScreen } from '@components/BigWinScreen/BigWinScreen';
import { Footer } from '@components/Footer/Footer';
import { GameFooterBtn } from '@components/GameFooterBtn/GameFooterBtn';
import { IBgTextureConfig, IScratchCardHandle, ScratchCard } from '@components/ScratchCard';
import { IRoundScratchCardHandle, RoundScratchCard } from '@components/ScratchCard/components/RoundScratchCard/RoundScratchCard';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { ISantaSacBundle, SANTA_SAC_BUNDLE } from '@config/santaSacBundleConfig';
import { useScratchGame } from '@hooks/useScratchGame/useScratchGame';

import { useSpriteCellData } from './hooks/useSpriteCellData';
import { ISantaSacCardData } from './SantaSac.model';
import { ISantaSacSpriteCellProps, SantaSacSpriteCell } from './SantaSacSpriteCell';

import { IGameMatrixConfig } from '@components/shared/IconMatrix';
import { IScratchAnimationHandle, ScratchAnimation, ScratchAnimationName } from '@components/shared/ScratchAnimation/ScratchAnimation';
import round_multiplier from '@icons/round_multiplier.svg';
import santa_sac from '@icons/santa_sac.svg';
import shining from '@icons/shining.svg';
import { CardsBonusTypesDict, useIsBonusShining } from '@hooks/useWinningBgConfig';
import { NO_TAP_SOUND_CLASS } from '@hooks/usePlaySound';

const bgTextureConfig: IBgTextureConfig = {
    textureName: 'redBallShining',
    xShift: 0,
    yShift: 0,
    padding: 0,
}

const roundScratchCardMatrixConfig: IGameMatrixConfig = {
    containerPadding: 14,
    cellPadding: 2
}

const mainScratchCardMatrixConfig: IGameMatrixConfig = {
    cellPadding: 13
}

export function SantaSac() {
    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);

    const bundleName = SANTA_SAC_BUNDLE.name
    const { bundle, loading: isBundleLoading } = useLoadBundle<ISantaSacBundle>(bundleName)

    const roundScratchCardRef = useRef<IRoundScratchCardHandle>(null);
    const mainScratchCardRef = useRef<IScratchCardHandle>(null);

    const scratchCardsRefConfig = useMemo(() => ({
        'roundScratchCard': roundScratchCardRef,
        'mainScratchCard': mainScratchCardRef,
    }), [roundScratchCardRef, mainScratchCardRef]);

    const scratchAnimationRef = useRef<IScratchAnimationHandle>(null);

    const {
        isBigWinVisible,
        onBigWinClicked,
        onPlay,
        onScratchAnimationCompleted,
        card,
        isPlayBtnDisabled,
    } = useScratchGame<ISantaSacCardData>(
        batchId,
        scratchCardsRefConfig,
        scratchAnimationRef
    );

    const renderSantaSacSpriteCell = useCallback((data: ISantaSacSpriteCellProps) => (<SantaSacSpriteCell {...data} />), []);

    const { data } = useSpriteCellData(card, bundleName)

    const isLoading = isBatchLoading || isBundleLoading;
    const hiddenClass = isLoading || !bundle ? 'hidden' : '';

    const multiplier = card?.cardData.multi;
    const multiplierText = typeof multiplier === 'number' ? 'x' + multiplier : '';

    const isBonusShining = useIsBonusShining(CardsBonusTypesDict.SantaSacBonus, card?.cardData.winningCells || null);

    return (
        <div className={`${styles.mainContainer} ${hiddenClass}`}>
            <div className={styles.headerLogoContainer}>
                <Icon name={santa_sac} className={styles.headerIcon} />
            </div>
            <div className={styles.content}>
                <TopPrizeLabel className={styles.topPrizeLabel} topPrize={batch?.maxPrize || 0} />

                <div className={`${styles.scratchAreaContainer} ${NO_TAP_SOUND_CLASS}`}
                    onClick={onPlay}
                >
                    <div className={styles.animationContainer}>
                        <ScratchAnimation
                            ref={scratchAnimationRef}
                            animationName={ScratchAnimationName.santa_action}
                            onComplete={onScratchAnimationCompleted}
                        />
                    </div>
                    <div className={styles.multiplierContainer}>
                        <div className={styles.toyChainContainer}>
                            <img className={styles.toyChainImg} src="/santaSac/christmassToyChain.png" />
                        </div>
                        <Icon name={round_multiplier} className={styles.roundMulriplierIcon} />
                        <div className={styles.roundScratchCardContainer}>
                            <RoundScratchCard
                                ref={roundScratchCardRef}
                                cellData={multiplierText}
                                className={styles.roundScratchCard}
                                bundleName={SANTA_SAC_BUNDLE.name}
                                bgTextureConfig={bgTextureConfig}
                                matrixConfig={roundScratchCardMatrixConfig}
                                xShift={0.52}
                                yShift={0.47}
                                isWinning={isBonusShining}
                            />
                        </div>
                    </div>
                    <div
                        className={styles.scratchCardContainer}
                    >
                        <Icon name={shining} className={styles.shiningIcon} />
                        <ScratchCard
                            ref={mainScratchCardRef}
                            data={data}
                            className={styles.scratchCard}
                            bundleName={bundleName}
                            renderCell={renderSantaSacSpriteCell}

                            sizeX={batch?.sizeX}
                            sizeY={batch?.sizeY}
                            matrixConfig={mainScratchCardMatrixConfig}
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
