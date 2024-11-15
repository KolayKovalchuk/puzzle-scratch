import { useSelector } from 'react-redux';

import { selectLocalValue } from '@store/selectors/localization.selectors';

import { Header } from '@components/Header';
import { Icon } from '@components/shared/Icon';
import { WinStyledText } from '@components/shared/StyledText';

import styles from './CandyMaze.module.scss';

import { ScratchCard } from '@components/ScratchCard';
import { Button } from '@components/shared/Button/Button';
import candy_maze from '@icons/candy_maze.svg';
import robo_token_gold from '@icons/robo_token_gold.svg';
import { IScrathCardBundle } from '@src/assetsManifest';
import { ISpriteCellData } from '@src/components/shared/IconMatrix';
import { useLoadBundle } from '@src/hooks/useAssetsBundleLoader';
import { useBuyCard } from '@src/services/api/cards.service';
import { selectGameBatch, selectGameBatchId } from '@src/store/selectors/game.selectors';
import { formatNumber } from '@utils/formatters/formatNumber';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CandyMazeScratchItemsEnum } from './scratchItemsEnum';

// export interface ICandyMazeProps {
//     batchId: string;
// }

export function CandyMaze() {
    const playButtonText = useSelector(selectLocalValue('txt.btn.play'));
    const winUptoText = useSelector(selectLocalValue('txt.game.winUpTo')).toUpperCase();

    const navigate = useNavigate();
    const { buyCard, card, loading } = useBuyCard();

    const batch = useSelector(selectGameBatch);
    const batchId = useSelector(selectGameBatchId);

    const [isScratchEnabled, setIsScratchEnabled] = useState(true);

    const onCancel = () => {
        navigate(-1)
    }

    const onPlay = async () => {
        console.log('batchId', batchId);


        if (!batchId) return

        await buyCard(batchId)
    }


    // let data: IGameMatrixProps<ISpriteCellProps>['data'] = []
    const { bundle } = useLoadBundle<IScrathCardBundle>('scratchCard')

    console.log('bundle', bundle);
    console.log('card', card);

    const [data, setData] = useState<ISpriteCellData[][]>([])

    useEffect(() => {

        if (!card || !bundle) return

        setIsScratchEnabled(false)

        const newData = card.cardData.matrix.reduce<ISpriteCellData[][]>((acc, row) => {
            const newRow = row.map(cell => {
                const textureName = Object.keys(CandyMazeScratchItemsEnum).find(key => {
                    // @ts-ignore
                    const item = CandyMazeScratchItemsEnum[key];

                    return item === cell
                })

                console.log('textureName', textureName);
                // @ts-ignore
                const texture = bundle[textureName]

                console.log('texture', texture);
                return { texture }
            })
            acc.push(newRow)
            return acc;
        }, []);

        setData(newData)

    }, [card, bundle])

    const onScratchedEnought = () => {
        if (card?.winning) {
            window.alert('You win ' + card.winning + ' RBAX. Your new balance is ' + card?.rbaxBalance + ' RBAX')
        } else {
            window.alert('You lose. Your new balance is ' + card?.rbaxBalance + ' RBAX')
        }
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
                        bundleName='scratchCard'
                        onScratchedEnought={() => { onScratchedEnought() }}
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
