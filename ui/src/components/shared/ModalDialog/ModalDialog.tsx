import { StyledHeader } from '@components/shared/StyledHeader';
import { FC, ReactNode } from 'react';
import { Button, ButtonType } from '../Button/Button';
import styles from './ModalDialog.module.scss';

interface ModalDialogProps {
    isOpen: boolean;
    title: string;
    content?: string;

    confirmText?: string;
    cancelText?: string;

    children?: ReactNode;

    onClose?: () => void;
    onConfirm?: () => void;

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
}) => {
    if (!isOpen) return null;

    const handleClose = () => {
        onClose && onClose();
    }

    const handleConfirm = () => {
        onConfirm && onConfirm();
    }

    return (
        <div className={`${styles.modalOverlay} ${className}`}>
            <div className={`${styles.modalContent} modalContent`}>
                <StyledHeader title={title}>
                    <div className={`${styles.modalBody} modalBody`}>
                        {children ? children : <p>{content}</p>}
                        <div className={`${styles.modalActions} modalActions`}>
                            {cancelText && <Button
                                className={styles.btn}
                                text={cancelText}
                                mode={ButtonType.Cancel}
                                onClick={() => handleClose()} />
                            }
                            {confirmText && <Button
                                className={styles.btn}
                                text={confirmText}
                                mode={ButtonType.Confirm}
                                onClick={() => handleConfirm()} />
                            }
                        </div>
                    </div>
                </StyledHeader>
            </div>
        </div>
    );
};

export default ModalDialog;