import { useSelector } from 'react-redux';

import { selectLocalValue } from '@store/selectors/localization.selectors';

import { Header } from '@components/Header';
import { Icon } from '@components/shared/Icon';
import { WinStyledText } from '@components/shared/StyledText';

import styles from './CandyMaze.module.scss';

import { ScratchCard } from '@components/ScratchCard';
import { Button } from '@components/shared/Button/Button';
import { IScrathCardBundle } from '@config/assetsManifest';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import candy_maze from '@icons/candy_maze.svg';
import robo_token_gold from '@icons/robo_token_gold.svg';
import { useBuyCard } from '@services/api/cards.service';
import { selectGameBatch, selectGameBatchId } from '@store/selectors/game.selectors';
import { formatNumber } from '@utils/formatters/formatNumber';
import { useNavigate } from 'react-router-dom';
import { CandyMazeGradientCofig } from './CandyMazeGradient';
import { CandyMazeSpriteCell } from './CandyMazeSpriteCell';
import { useSpriteCellData } from './hooks/useSpriteCellData';

// export interface ICandyMazeProps {
//     batchId: string;
// }

export function CandyMaze() {
    const playButtonText = useSelector(selectLocalValue('txt.btn.play'));
    const winUptoText = useSelector(selectLocalValue('txt.game.winUpTo')).toUpperCase();

    const navigate = useNavigate();
    const { buyCard, card } = useBuyCard();

    const batch = useSelector(selectGameBatch);
    const batchId = useSelector(selectGameBatchId);

    const onCancel = () => {
        navigate(-1)
    }

    const onPlay = async () => {
        console.log('batchId', batchId);


        if (!batchId) return

        await buyCard(batchId)
    }


    const bundleName = 'scratchCard'
    const { bundle, loading: isBundleLoading } = useLoadBundle<IScrathCardBundle>(bundleName)

    const { data, isScratchEnabled } = useSpriteCellData(card, bundleName)

    const onScratchedEnought = () => {
        if (card?.winning) {
            window.alert('You win ' + card.winning + ' RBAX. Your new balance is ' + card?.rbaxBalance + ' RBAX')
        } else {
            window.alert('You lose. Your new balance is ' + card?.rbaxBalance + ' RBAX')
        }
    }

    if (isBundleLoading || !bundle) {
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
                    <ScratchCard
                        data={data}
                        isDisabled={isScratchEnabled}
                        className={styles.scratchCard}
                        bundleName={bundleName}
                        onScratchedEnought={() => { onScratchedEnought() }}
                        renderCell={(data) => (<CandyMazeSpriteCell {...data} />)}
                        gradientData={CandyMazeGradientCofig}
                    />
                </div>
                <div className={styles.footer}>
                    <Button className={styles.playButton} isCancel text='Back' onClick={() => onCancel()} />
                    <Button className={styles.playButton} isConfirm text={playButtonText} onClick={() => onPlay()} />
                </div>
            </div>
        </div>
    );
}
