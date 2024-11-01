import React, { useState } from 'react';
import styles from './ModalDialog.module.scss';
import { StyledHeader } from '@components/shared/StyledHeader';

interface ModalDialogProps {
    isOpen: boolean;
    title: string;
    content: string;

    confirmText?: string;
    cancelText?: string;

    onClose: () => void;
    onConfirm: () => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
    isOpen,
    title,
    content,
    onClose,
    onConfirm,
    confirmText,
    cancelText
}) => {
    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
    }

    const handleConfirm = () => {
        onConfirm();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <StyledHeader title={title}></StyledHeader>
                <div className={styles.modalBody}>
                    <p>{content}</p>
                    <div className={styles.modalActions}>
                        <div className={`${styles.btn} ${styles.cancel}`} onClick={() => handleClose()}>{cancelText}</div>
                        <div className={`${styles.btn} ${styles.confirm}`} onClick={() => handleConfirm()}>{confirmText}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDialog;