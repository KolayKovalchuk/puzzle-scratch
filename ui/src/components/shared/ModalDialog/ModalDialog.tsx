import { FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo } from 'react';

import { Button, ButtonType } from '@components/shared/Button';
import { Icon } from '@components/shared/Icon';
import { StyledHeader } from '@components/shared/StyledHeader';
import { playSound } from '@store/actions/appState.actions';
import store from '@store/store';
import { AppSounds } from '@config/sounds';

import styles from './ModalDialog.module.scss';


interface ModalDialogProps {
    isOpen: boolean;
    title?: string;
    content?: string;

    confirmText?: string;
    cancelText?: string;

    children?: ReactNode;

    onClose?: () => void;
    onConfirm?: () => void;

    isConfirmDisabled?: boolean;

    callOnCloseOnOverlayClick?: boolean;
    className?: string;

    fotterBtnDirection?: 'row' | 'column';
}

const ModalDialog: FC<ModalDialogProps> = ({
    isOpen,
    title,
    content,
    onClose,
    onConfirm,
    confirmText,
    cancelText,
    children,
    className,
    isConfirmDisabled = false,
    callOnCloseOnOverlayClick = false,
    fotterBtnDirection = 'row',
}) => {
    const handleClose = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    const handleConfirm = useCallback(() => {
        onConfirm && onConfirm();
    }, [onConfirm]);

    const modalDialogContent = useMemo(() => {
        const directionClass = fotterBtnDirection === 'row' ? styles.row : styles.column;

        return (
            <div className={`${styles.modalBody} modalBody`}>
                {children ? children : <p>{content}</p>}
                <div className={`${styles.modalActions} ${directionClass} modalActions`}>
                    {cancelText && <Button
                        className={styles.btn}
                        text={cancelText}
                        mode={ButtonType.Cancel}
                        onClick={handleClose}
                        />
                    }
                    {confirmText && <Button
                        className={styles.btn}
                        text={confirmText}
                        mode={ButtonType.Confirm}
                        onClick={handleConfirm}
                        isDisabled={isConfirmDisabled}
                    />
                    }
                </div>
            </div>
        );
    }, [
        children,
        content,
        confirmText,
        cancelText,
        fotterBtnDirection,
        handleClose,
        handleConfirm,
    ]);

    const onOverlayClick = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        if (callOnCloseOnOverlayClick) {
            onClose && onClose();
        }
    }, [callOnCloseOnOverlayClick, onClose]);

    const onModalContentClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }, []);

    useEffect(() => {
        if (isOpen) {
            store.dispatch(playSound(AppSounds.OpenDialog));
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const noTitleCenteredClass = !title ? styles.noTitleCentered : '';

    return (
        <div className={`${styles.modalOverlay} ${className}`} onClick={onOverlayClick}>
            <div className={`${styles.modalContent} ${noTitleCenteredClass} modalContent`} onClick={onModalContentClick}>
                {typeof title === 'string'
                    ? <StyledHeader title={title}>
                        {modalDialogContent}
                    </StyledHeader>
                    : <>
                        <Icon className={styles.closeCrossIcon} onClick={handleClose}>
                            <img src="/close_cross_icon.png" width='100%'/>
                        </Icon>
                        {modalDialogContent}
                    </>
                }
            </div>
        </div>
    );
};

export default ModalDialog;