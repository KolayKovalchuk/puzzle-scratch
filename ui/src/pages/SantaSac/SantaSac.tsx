import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectLocalValue } from '@store/selectors/localization.selectors';

import { Header } from '@components/Header';
import { Icon } from '@components/shared/Icon';

import styles from './SantaSac.module.scss';

import { Button } from '@components/shared/Button/Button';
import { IScrathCardBundle } from '@config/assetsManifest';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useGetBatchById } from '@services/api/batch.service';
import { useBuyCard } from '@services/api/cards.service';
import { useNavigate } from 'react-router-dom';

import { ScratchCard } from '@components/ScratchCard';
import { TopPrizeLabel } from '@components/TopPrizeLabel/TopPrizeLabel';
import { SANTA_SAC_BUNDLE } from '@config/santaSacBundleConfig';
import { useSpriteCellData } from './hooks/useSpriteCellData';
import { ISantaSacCardData } from './SantaSac.model';
import { SantaSacSpriteCell } from './SantaSacSpriteCell';

import santa_sac from '@icons/santa_sac.svg';

export function SantaSac() {
    const playButtonText = useSelector(selectLocalValue('txt.btn.play'));

    const navigate = useNavigate();
    const { batchId } = useParams();

    const { batch, loading: isBatchLoading } = useGetBatchById(batchId || null);
    const { buyCard, card } = useBuyCard<ISantaSacCardData>();

    const onCancel = () => {
        navigate(-1)
    }

    const onPlay = async () => {
        if (!batchId) return

        await buyCard(batchId)
    }

    const bundleName = SANTA_SAC_BUNDLE.name
    const { bundle, loading: isBundleLoading } = useLoadBundle<IScrathCardBundle>(bundleName)

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
            <div className={styles.headerIconContainer}>
                <Icon name={santa_sac} className={styles.headerIcon} />
            </div>
            <div className={styles.content}>
                <TopPrizeLabel topPrize={batch?.totalPotentialPrizes || 0} />
                <div className={styles.scratchCardContainer}>
                    <ScratchCard
                        data={data}
                        className={styles.scratchCard}
                        bundleName={bundleName}
                        onScratchedEnought={() => { onScratchedEnought() }}
                        renderCell={(data) => (<SantaSacSpriteCell {...data} />)}
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
