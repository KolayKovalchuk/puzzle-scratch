import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectLocalValue } from '@store/selectors/localization.selectors';

import { Header } from '@components/Header';
import { Icon } from '@components/shared/Icon';

import styles from './CandyMaze.module.scss';

import { ScratchCard } from '@components/ScratchCard';
import { Button, ButtonGoldBorder, ButtonType } from '@components/shared/Button/Button';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { CANDY_MAZE_BUNDLE, ICandyMazeBundle } from '@config/candyMazeBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';
import { useBuyCard } from '@services/api/cards.service';
import { useNavigate } from 'react-router-dom';
import { CandyMazeSpriteCell } from './CandyMazeSpriteCell';
import { useSpriteCellData } from './hooks/useSpriteCellData';

import candy_maze from '@icons/candy_maze.svg';
import back_arrow from '@icons/back_arrow.svg';
import hint from '@icons/hint.svg';

export function CandyMaze() {
    const playButtonText = useSelector(selectLocalValue('txt.btn.play'));
    // const winUptoText = useSelector(selectLocalValue('txt.game.winUpTo')).toUpperCase();

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

    const bundleName = CANDY_MAZE_BUNDLE.name
    const { bundle, loading: isBundleLoading } = useLoadBundle<ICandyMazeBundle>(bundleName)

    const { data } = useSpriteCellData(card, bundleName)

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
            <div className={styles.content}>
                <TopPrizeLabel topPrize={batch?.totalPotentialPrizes || 0} />
                <div className={styles.scratchCardContainer}>
                    <ScratchCard
                        data={data}
                        className={styles.scratchCard}
                        bundleName={bundleName}
                        onScratchedEnought={() => { onScratchedEnought() }}
                        renderCell={(data) => (<CandyMazeSpriteCell {...data} />)}
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
                        onClick={() => {}}
                    >
                        <Icon name={hint} className={styles.backIcon} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
