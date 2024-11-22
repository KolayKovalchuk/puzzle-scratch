import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectLocalValue } from '@store/selectors/localization.selectors';

import { Header } from '@components/Header';
import { Icon } from '@components/shared/Icon';
import { WinStyledText } from '@components/shared/StyledText';

import styles from './IceBox.module.scss';

import { Button, ButtonType } from '@components/shared/Button/Button';
import { IScrathCardBundle } from '@config/assetsManifest';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import candy_maze from '@icons/candy_maze.svg';
import robo_token_gold from '@icons/robo_token_gold.svg';
import { useGetBatchById } from '@services/api/batch.service';
import { useBuyCard } from '@services/api/cards.service';
import { formatNumber } from '@utils/formatters/formatNumber';
import { useNavigate } from 'react-router-dom';
// import { CandyMazeGradientCofig } from './CandyMazeGradient';
// import { CandyMazeSpriteCell } from './CandyMazeSpriteCell';
// import { useSpriteCellData } from './hooks/useSpriteCellData';

export function IceBox() {
    const playButtonText = useSelector(selectLocalValue('txt.btn.play'));
    const winUptoText = useSelector(selectLocalValue('txt.game.winUpTo')).toUpperCase();

    const navigate = useNavigate();
    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);
    const { buyCard, card } = useBuyCard();

    const onCancel = () => {
        navigate(-1)
    }

    const onPlay = async () => {
        if (!batchId) return

        await buyCard(batchId)
    }

    const bundleName = 'scratchCard'
    const { bundle, loading: isBundleLoading } = useLoadBundle<IScrathCardBundle>(bundleName)

    // const { data, isScratchEnabled } = useSpriteCellData(card, bundleName)

    const onScratchedEnought = () => {
        if (card?.winning) {
            window.alert('You win ' + card.winning + ' RBAX. Your new balance is ' + card?.rbaxBalance + ' RBAX')
        } else {
            window.alert('You lose. Your new balance is ' + card?.rbaxBalance + ' RBAX')
        }
    }

    const isLoading = isBatchLoading || isBundleLoading;
    if (isLoading || !bundle) {
        return (
            <div className={styles.mainContainer}>
                <span>Loading...</span>
            </div>
        )
    }

    return (
        <div className={styles.mainContainer}>
            <Header />
            <Icon name={candy_maze} className={styles.candyMazeHeaderIcon} />
            <div className={styles.winLabelContainer}>
                <WinStyledText text={winUptoText} textStyles={{ fontSize: 20 }} className={styles.winUpToLabel} />
                <div className={styles.winAmountContainer}>
                    <Icon name={robo_token_gold} className={styles.roboTokenGoldIcon} />
                    <WinStyledText className={styles.winAmount} text={formatNumber(batch?.totalPotentialPrizes || 0)} textStyles={{ fontSize: 26 }} />
                </div>
                <div className={styles.scratchCardContainer}>
                    {/* <ScratchCard
                        data={data}
                        isDisabled={isScratchEnabled}
                        className={styles.scratchCard}
                        bundleName={bundleName}
                        onScratchedEnought={() => { onScratchedEnought() }}
                        renderCell={(data) => (<IceBoxSpriteCell {...data} />)}
                        gradientData={CandyMazeGradientCofig}
                    /> */}

                    {/* {Object.keys(card || {}).map((key) => {
                        return (<div key={key}>{key}: {card[key]?.toString()}</div>)
                    })
                    } */}
                </div>
                <div className={styles.footer}>
                    <Button className={styles.playButton} mode={ButtonType.Cancel} text='Back' onClick={() => onCancel()} />
                    <Button className={styles.playButton} mode={ButtonType.Confirm} text={playButtonText} onClick={() => onPlay()} />
                </div>
            </div>
        </div>
    );
}
