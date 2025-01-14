import { FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo } from 'react';

import { Button, ButtonType } from '@components/shared/Button';
import { Icon } from '@components/shared/Icon';
import { StyledHeader } from '@components/shared/StyledHeader';

import close_cross_icon from '@icons/close_cross_icon.svg';

import styles from './ModalDialog.module.scss';
import store from '@store/store';
import { playSound } from '@store/actions/appState.actions';
import { AppSounds } from '@config/sounds';

interface ModalDialogProps {
    isOpen: boolean;
    title?: string;
    content?: string;

    confirmText?: string;
    cancelText?: string;

    children?: ReactNode;

    onClose?: () => void;
    onConfirm?: () => void;

    callOnCloseOnOverlayClick?: boolean;
    className?: string;
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
    callOnCloseOnOverlayClick = false,
}) => {
    const handleClose = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    const handleConfirm = useCallback(() => {
        onConfirm && onConfirm();
    }, [onConfirm]);

    const modalDialogContent = useMemo(() => {
        return (
            <div className={`${styles.modalBody} modalBody`}>
                {children ? children : <p>{content}</p>}
                <div className={`${styles.modalActions} modalActions`}>
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
                        onClick={handleConfirm} />
                    }
                </div>
            </div>
        );
    }, [children, content, confirmText, cancelText, handleClose, handleConfirm]);

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
                        <Icon name={close_cross_icon} className={styles.closeCrossIcon} onClick={handleClose}/>
                        {modalDialogContent}
                    </>
                }
            </div>
        </div>
    );
};

export default ModalDialog;