

import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { InvoiceStatuses } from '@twa-dev/types';
import { useSelector } from 'react-redux';
// import { NotificationConfig } from './NotificationConfig.tsx';

import { useCallback, useState } from 'react';
import { DepositWithDialogBody } from './components/DepositWithDialogBody/DepositWithDialogBody';
import { DepositWithStarsBody } from './components/DepositWithStarsBody/DepositWithStarsBody';
import { DepositWithTransferBody } from './components/DepositWithTransferBody/DepositWithTransferBody';
import { useDialogTitle } from './hooks/useDialogTitle';

export enum DepositWithDialogMode {
    Select = 'select',
    Starts = 'stars',
    Transfer = 'transfer',

    InvoiceSuccess = 'invoiceSuccess',
    InvoiceFailed = 'invoiceFailed',
}

export interface IDepositWithDialogProps {
    isOpen: boolean;
    onCancel: () => void;
}

export function DepositWithDialog({ isOpen, onCancel }: IDepositWithDialogProps) {
    const [mode, setMode] = useState(DepositWithDialogMode.Select);
    const titleText = useDialogTitle(mode);
    const cancelBtnText = useSelector(selectLocalValue('txt.btn.cancel'))

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

    const onInvoiceStatusChange = useCallback((status: InvoiceStatuses) => {
        switch (status) {
            case 'paid':
                setMode(DepositWithDialogMode.InvoiceSuccess);
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
    }, [mode, onStarsSelect, onTransferSelect]);

    return (
        <ModalDialog
            isOpen={isOpen}
            title={titleText}
            cancelText={cancelBtnText}
            onClose={onCancelCb}
        >
            {renderBody()}
        </ModalDialog>
    );
};
