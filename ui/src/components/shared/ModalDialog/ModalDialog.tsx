import { StyledHeader } from '@components/shared/StyledHeader';
import { ReactNode } from 'react';
import styles from './ModalDialog.module.scss';
import { Button } from '../Button/Button';

interface ModalDialogProps {
    isOpen: boolean;
    title: string;
    content: string;

    confirmText?: string;
    cancelText?: string;

    children?: ReactNode;

    onClose?: () => void;
    onConfirm: () => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
    isOpen,
    title,
    content,
    onClose,
    onConfirm,
    confirmText,
    cancelText,
    children
}) => {
    if (!isOpen) return null;

    const handleClose = () => {
        onClose && onClose();
    }

    const handleConfirm = () => {
        onConfirm();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <StyledHeader title={title}>
                    <div className={styles.modalBody}>
                        {children ? children : <p>{content}</p>}
                        <div className={styles.modalActions}>
                            {cancelText && <Button
                                className={styles.btn}
                                text={cancelText}
                                isCancel
                                onClick={() => handleClose()} />
                            }
                            {confirmText && <Button
                                className={styles.btn}
                                text={confirmText}
                                isConfirm
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