import { Button, ButtonGoldBorder, ButtonType } from '@components/shared/Button/Button';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { ReactNode, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './GameFooterBtn.module.scss';

import { BackButton } from '@components/shared/Button/BackButton';
import { GameDescriptionPopup } from '@components/shared/GameDescriptionPopup/GameDescriptionPopup';
import { useScrollTo } from '@hooks/useScrollTo';
import hint from '@icons/hint.svg';
import { BatchCardType } from '@models/BatchCard.model';
import { NO_TAP_SOUND_CLASS } from '@hooks/usePlaySound';


export interface IGameFooterBtnProps {
    onPlay: () => void
    onCancel?: () => void
    children?: ReactNode
    batchCardType: BatchCardType | null
    isPlayBtnDisabled?: boolean
}

export function GameFooterBtn({ onPlay, onCancel, children, batchCardType, isPlayBtnDisabled }: IGameFooterBtnProps) {
    const playButtonText = useSelector(selectLocalValue('txt.btn.play'));

    const onCancelCb = useCallback(() => {
        if (onCancel) onCancel();
    }, [onCancel])

    const { targetRef } = useScrollTo();

    const [isGameDescriptionPopupOpen, setIsGameDescriptionPopupOpen] = useState(false);

    const onCloseGameDescriptionPopup = useCallback(() => {
        setIsGameDescriptionPopupOpen(false);
    }, []);

    return (<>
        <div ref={targetRef} className={styles.footer} id='#gameFooter'>
            <BackButton
                className={`${styles.btn}`}
                onClick={onCancelCb}
            />
            <ButtonGoldBorder
                className={`${styles.btn} ${styles.playButton} ${NO_TAP_SOUND_CLASS}`}
                mode={ButtonType.Default}
                text={playButtonText}
                onClick={() => onPlay()}
                isDisabled={isPlayBtnDisabled}
            />
            <Button
                className={`${styles.btn} ${styles.iconBtn}`}
                mode={ButtonType.Default}
                onClick={() => {setIsGameDescriptionPopupOpen(true)}}
                iconName={hint}
            >
            </Button>
            {children}
        </div>
        {!!batchCardType
            && <GameDescriptionPopup
                isOpen={isGameDescriptionPopupOpen}
                onClose={onCloseGameDescriptionPopup}
                batchCardType={batchCardType}
            />
        }
    </>);
}
