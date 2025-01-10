

import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { InvoiceStatuses } from '@twa-dev/types';
import { useSelector } from 'react-redux';

import { DepositWithDialogMode } from '@pages/Wallet/Wallet.models';
import { useCallback, useEffect, useState } from 'react';
import { DepositWithDialogBody } from './components/DepositWithDialogBody/DepositWithDialogBody';
import { DepositWithStarsBody } from './components/DepositWithStarsBody/DepositWithStarsBody';
import { DepositWithTransferBody } from './components/DepositWithTransferBody/DepositWithTransferBody';
import { useDialogTitle } from './hooks/useDialogTitle';

export interface IDepositWithDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    onModeChanged: (mode: DepositWithDialogMode) => void;
}

export function DepositWithDialog({ isOpen, onCancel, onConfirm, onModeChanged }: IDepositWithDialogProps) {
    const [mode, setMode] = useState(DepositWithDialogMode.Select);
    const titleText = useDialogTitle(mode);
    const cancelBtnText = useSelector(selectLocalValue('txt.btn.cancel'))
    const closeBtnText = useSelector(selectLocalValue('txt.btn.close'))
    const okBtnText = useSelector(selectLocalValue('txt.btn.ok'))

    const onStarsSelect = useCallback(() => {
        setMode(DepositWithDialogMode.Starts);
    }, []);

    const onTransferSelect = useCallback(() => {
        setMode(DepositWithDialogMode.Transfer);
    }, []);

    const onCancelCb = useCallback(() => {
        setMode(DepositWithDialogMode.Select);
        onCancel();
    }, [onCancel]);

    const onConfirmCb = useCallback(() => {
        setMode(DepositWithDialogMode.Select);
        onConfirm();
    }, [onConfirm]);

    useEffect(() => {
        onModeChanged(mode);
    }, [mode, onModeChanged]);

    const onInvoiceStatusChange = useCallback((status: InvoiceStatuses, isPaid: boolean) => {
        console.log('onInvoiceStatusChange status:', status, isPaid);
        
        switch (status) {
            case 'paid':
                if (isPaid) {
                    setMode(DepositWithDialogMode.InvoiceSuccess);
                } else {
                    setMode(DepositWithDialogMode.InvoiceFailed);
                }
                break;
            case 'failed':
                setMode(DepositWithDialogMode.InvoiceFailed);
                break;
            default:
                break;
        }
    }, []);

    const renderBody = useCallback(() => {
        switch (mode) {
            case DepositWithDialogMode.Select:
                return (
                    <DepositWithDialogBody
                        onSelectStars={onStarsSelect}
                        onSelectTransfer={onTransferSelect}
                    />);
            case DepositWithDialogMode.Starts:
            case DepositWithDialogMode.InvoiceSuccess:
            case DepositWithDialogMode.InvoiceFailed:
                return (
                    <DepositWithStarsBody onIvoiceStatusChange={onInvoiceStatusChange}/>
                );
            case DepositWithDialogMode.Transfer:
                return (
                    <DepositWithTransferBody />
                );
            default:
                return null;
        }
    }, [mode, onStarsSelect, onTransferSelect, onInvoiceStatusChange]);

    const isStarsConversationDone = mode === DepositWithDialogMode.InvoiceSuccess || mode === DepositWithDialogMode.InvoiceFailed;
    const cancelBtnModeText = [DepositWithDialogMode.Transfer, DepositWithDialogMode.InvoiceSuccess].includes(mode) ? closeBtnText : cancelBtnText;
    const cancelText = isStarsConversationDone ? '' : cancelBtnModeText;
    const confirmText = isStarsConversationDone ? okBtnText : '';

    return (
        <ModalDialog
            isOpen={isOpen}
            title={titleText}
            cancelText={cancelText}
            confirmText={confirmText}
            onClose={onCancelCb}
            onConfirm={onConfirmCb}
        >
            {renderBody()}
        </ModalDialog>
    );
};
