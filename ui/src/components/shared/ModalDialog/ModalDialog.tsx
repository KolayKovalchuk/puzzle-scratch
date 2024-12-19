import { FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo } from 'react';

import { StyledHeader } from '@components/shared/StyledHeader';
import { Button, ButtonType } from '@components/shared/Button';
import { Icon } from '@components/shared/Icon';

import close_cross_icon from '@icons/close_cross_icon.svg';

import styles from './ModalDialog.module.scss';
import store from '@store/store';
import { setIsModalDialogOpen } from '@store/actions/appState.actions';

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
    shouldDispatchIsModalDialogOpen?: boolean;

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
    shouldDispatchIsModalDialogOpen = true,
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
                        isModalDialogPixiEl={shouldDispatchIsModalDialogOpen}
                        className={styles.btn}
                        text={cancelText}
                        mode={ButtonType.Cancel}
                        onClick={handleClose}
                        />
                    }
                    {confirmText && <Button
                        isModalDialogPixiEl={shouldDispatchIsModalDialogOpen}
                        className={styles.btn}
                        text={confirmText}
                        mode={ButtonType.Confirm}
                        onClick={handleConfirm} />
                    }
                </div>
            </div>
        );
    }, [children, content, confirmText, cancelText, handleClose, handleConfirm]);

    const onOverlayClick = useCallback(() => {
        if (callOnCloseOnOverlayClick) {
            onClose && onClose();
        }
    }, [callOnCloseOnOverlayClick, onClose]);

    const onModalContentClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }, []);

    useEffect(() => {
        if (!shouldDispatchIsModalDialogOpen) return;

        store.dispatch(setIsModalDialogOpen(isOpen));

        return () => {
            store.dispatch(setIsModalDialogOpen(false));
        }
    }, [isOpen, shouldDispatchIsModalDialogOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`${styles.modalOverlay} ${className}`} onClick={onOverlayClick}>
            <div className={`${styles.modalContent} modalContent`} onClick={onModalContentClick}>
                {typeof title === 'string'
                    ? <StyledHeader title={title} isModalDialogPixiEl={shouldDispatchIsModalDialogOpen}>
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