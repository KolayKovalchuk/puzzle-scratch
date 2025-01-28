import { useDepositWithDialog } from '@components/DepositWithDialog/hooks/useDepositWithDialog';
import { GetRBAXDialogDialog } from '@components/GetRBAXDialog/GetRBAXDialog';
import { BackButton } from '@components/shared/Button/BackButton';
import { Button, ButtonGoldBorder, ButtonType } from '@components/shared/Button/Button';
import { GameDescriptionPopup } from '@components/shared/GameDescriptionPopup/GameDescriptionPopup';
import { NO_TAP_SOUND_CLASS } from '@hooks/usePlaySound';
import { useScrollTo } from '@hooks/useScrollTo';
import hint from '@icons/hint.svg';
import { BatchCardType } from '@models/BatchCard.model';
import { setAppError } from '@store/actions/appState.actions';
import { AppErrors } from '@store/reducers/appState.reducer';
import { selectAppError } from '@store/selectors/appState.selectors';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import store from '@store/store';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './GameFooterBtn.module.scss';


export interface IGameFooterBtnProps {
    onPlay: () => void
    onCancel?: () => void
    children?: ReactNode
    batchCardType: BatchCardType | null
    isPlayBtnDisabled?: boolean
    className?: string
}

export function GameFooterBtn({ onPlay, onCancel, children, batchCardType, isPlayBtnDisabled, className }: IGameFooterBtnProps) {
    const playButtonText = useSelector(selectLocalValue('txt.btn.play'));

    const onCancelCb = useCallback(() => {
        if (onCancel) onCancel();
    }, [onCancel])

    const { targetRef } = useScrollTo();

    const [isGameDescriptionPopupOpen, setIsGameDescriptionPopupOpen] = useState(false);

    const onCloseGameDescriptionPopup = useCallback(() => {
        setIsGameDescriptionPopupOpen(false);
    }, []);

    const { onDepositBtnClick, closeDialog, isDepositDialogOpen } = useDepositWithDialog();
    const appError = useSelector(selectAppError);

    useEffect(() => {
        if (appError === AppErrors.InsufficientBalance) {
            onDepositBtnClick();
            store.dispatch(setAppError(AppErrors.NoError));
        }
    }, [appError]);

    return (<>
        <div ref={targetRef} className={`${styles.footer} ${className || ''}`} id='#gameFooter'>
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
         <GetRBAXDialogDialog
            isOpen={isDepositDialogOpen}
            onCancel={closeDialog}
            onConfirm={closeDialog}
        />
    </>);
}
