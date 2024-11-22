import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectLocalValue } from '@store/selectors/localization.selectors';

import { Header } from '@components/Header';
import { Icon } from '@components/shared/Icon';

import styles from './SantaSac.module.scss';

import { Button, ButtonGoldBorder, ButtonType } from '@components/shared/Button/Button';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';
import { useBuyCard } from '@services/api/cards.service';
import { useNavigate } from 'react-router-dom';

import { IBgTextureConfig, IScratchCardHandle, ScratchCard } from '@components/ScratchCard';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { ISantaSacBundle, SANTA_SAC_BUNDLE } from '@config/santaSacBundleConfig';
import { useSpriteCellData } from './hooks/useSpriteCellData';
import { ISantaSacCardData } from './SantaSac.model';
import { SantaSacSpriteCell } from './SantaSacSpriteCell';

import { IRoundScratchCardHandle, RoundScratchCard } from '@components/ScratchCard/components/RoundScratchCard/RoundScratchCard';

import { BigWinScreen } from '@components/BigWinScreen/BigWinScreen';
import { useScratchGame } from '@hooks/useScratchGame';
import { useSwipeAria } from '@hooks/useSwipeAria';
import back_arrow from '@icons/back_arrow.svg';
import hint from '@icons/hint.svg';
import santa_sac from '@icons/santa_sac.svg';
import shining from '@icons/shining.svg';
import { useMemo, useRef } from 'react';

const bgTextureConfig: IBgTextureConfig = {
    textureName: 'redBallShining',
    xShift: 0,
    yShift: 0,
    padding: 0,
}

export function SantaSac() {
    const playButtonText = useSelector(selectLocalValue('txt.btn.play'));

    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);
    const { buyCard, card } = useBuyCard<ISantaSacCardData>();

    const navigate = useNavigate();
    const onCancel = () => {
        navigate(-1)
    }

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
    if (isLoading || !bundle) {
        return (
            <div className={styles.mainContainer}>
                <span>Loading...</span>
            </div>
        )
    }

    const multiplier = card?.cardData.multiplier;
    const multiplierText = multiplier ? 'x' + multiplier : '';

    return (
        <div className={styles.mainContainer}>
            <Header />
            <div className={styles.headerIconContainer}>
                <Icon name={santa_sac} className={styles.headerIcon} />
            </div>
            <div className={styles.content}>
                <TopPrizeLabel className={styles.topPrizeLabel} topPrize={batch?.totalPotentialPrizes || 0} />
                <div className={styles.multiplierContainer}>
                    <div className={styles.toyChainContainer}>
                        <img className={styles.toyChainImg} src="/santaSac/christmassToyChain.png" />
                    </div>
                    <RoundScratchCard
                        ref={roundScratchCardRef}
                        cellData={multiplierText}
                        className={styles.roundScratchCard}
                        bundleName={SANTA_SAC_BUNDLE.name}
                        bgTextureConfig={bgTextureConfig}
                        onScratchedEnought={() => { onCardScratched('roundScratchCard') }}
                        matrixConfig={{ containerPadding: 14, cellPadding: 0 }}
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
                    <Icon name={shining} className={styles.satnaSacShiningIcon} />
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
                <div className={styles.footer}>
                    <Button className={`${styles.btn} ${styles.backBtn}`} mode={ButtonType.Default} onClick={() => onCancel()}>
                        <Icon name={back_arrow} className={styles.backIcon} />
                    </Button>
                    <ButtonGoldBorder className={`${styles.btn} ${styles.playButton}`} mode={ButtonType.Default} text={playButtonText} onClick={() => onPlay()} />
                    <Button
                        className={`${styles.btn} ${styles.backBtn}`}
                        mode={ButtonType.Default}
                        onClick={() => { }}
                    >
                        <Icon name={hint} className={styles.backIcon} />
                    </Button>
                </div>
            </div>
            {isBigWinVisible && <BigWinScreen winAmount={card?.winning} />}
        </div>
    );
}
