import { Button, ButtonGoldBorder, ButtonType } from '@components/shared/Button/Button';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { ReactNode, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './GameFooterBtn.module.scss';

import { useScrollTo } from '@hooks/useScrollTo';
import back_arrow from '@icons/back_arrow.svg';
import hint from '@icons/hint.svg';
import { GameDescriptionPopup } from '@components/shared/GameDescriptionPopup/GameDescriptionPopup';
import { BatchCardType } from '@models/BatchCard.model';


export interface IGameFooterBtnProps {
    onPlay: () => void
    onCancel?: () => void
    children?: ReactNode
    batchCardType: BatchCardType | null
}

export function GameFooterBtn({ onPlay, onCancel, children, batchCardType }: IGameFooterBtnProps) {
    const playButtonText = useSelector(selectLocalValue('txt.btn.play'));

    const navigate = useNavigate();
    const onCancelCb = useCallback(() => {
        navigate(-1)
    }, [navigate])

    const { targetRef } = useScrollTo();

    const [isGameDescriptionPopupOpen, setIsGameDescriptionPopupOpen] = useState(false);

    const onCloseGameDescriptionPopup = useCallback(() => {
        setIsGameDescriptionPopupOpen(false);
    }, []);

    return (<>
        <div ref={targetRef} className={styles.footer} id='#gameFooter'>
            <Button
                className={`${styles.btn} ${styles.backBtn}`}
                mode={ButtonType.Default}
                onClick={() => onCancel ? onCancel() : onCancelCb()}
                iconName={back_arrow}
            >
            </Button>
            <ButtonGoldBorder
                className={`${styles.btn} ${styles.playButton}`}
                mode={ButtonType.Default}
                text={playButtonText}
                onClick={() => onPlay()}
            />
            <Button
                className={`${styles.btn} ${styles.backBtn}`}
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
