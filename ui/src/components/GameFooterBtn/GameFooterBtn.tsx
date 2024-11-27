import { Button, ButtonGoldBorder, ButtonType } from '@components/shared/Button/Button';
import { Icon } from '@components/shared/Icon';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';
import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './GameFooterBtn.module.scss';

import { useScrollTo } from '@hooks/useScrollTo';
import back_arrow from '@icons/back_arrow.svg';
import hint from '@icons/hint.svg';


export interface IGameFooterBtnProps {
    onPlay: () => void
    onCancel?: () => void
    children?: ReactNode
}

export function GameFooterBtn({ onPlay, onCancel, children }: IGameFooterBtnProps) {
    const playButtonText = useSelector(selectLocalValue('txt.btn.play'));

    const navigate = useNavigate();
    const onCancelCb = useCallback(() => {
        navigate(-1)
    }, [navigate])

    const { targetRef } = useScrollTo();

    return (
        <div ref={targetRef} className={styles.footer} id='#gameFooter'>
            <Button
                className={`${styles.btn} ${styles.backBtn}`}
                mode={ButtonType.Default}
                onClick={() => onCancel ? onCancel() : onCancelCb()}
            >
                <Icon name={back_arrow} className={styles.backIcon} />
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
                onClick={() => {}}
            >
                <Icon name={hint} className={styles.backIcon} />
            </Button>
            {children}
        </div>
    );
}
