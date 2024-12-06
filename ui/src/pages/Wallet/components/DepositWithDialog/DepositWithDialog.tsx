

import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';
// import { NotificationConfig } from './NotificationConfig.tsx';

import { useCallback, useState } from 'react';
import { DepositWithDialogBody } from './components/DepositWithDialogBody/DepositWithDialogBody';
import { DepositWithStarsBody } from './components/DepositWithStarsBody/DepositWithStarsBody';

enum DepositWithDialogMode {
    Select = 'select',
    Starts = 'stars',
    Transfer = 'transfer',
}

export interface IDepositWithDialogProps {
    isOpen: boolean;
    onCancel: () => void;
}

export function DepositWithDialog({ isOpen, onCancel }: IDepositWithDialogProps) {
    const titleText = useSelector(selectLocalValue('deposit.select.title'))
    const cancelBtnText = useSelector(selectLocalValue('txt.btn.cancel'))

    const [mode, setMode] = useState(DepositWithDialogMode.Select);

    const onStarsSelect = useCallback(() => {
        setMode(DepositWithDialogMode.Starts);
    }, []);

    const onTransferSelect = useCallback(() => {
        // setMode(DepositWithDialogMode.Transfer);
    }, []);

    const onCancelCb = useCallback(() => {
        setMode(DepositWithDialogMode.Select);
        onCancel();
    }, [onCancel]);

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
                    <DepositWithStarsBody />
                );
            case DepositWithDialogMode.Transfer:
                return null;
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
