

import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';
// import { NotificationConfig } from './NotificationConfig.tsx';

import { useCallback, useEffect, useState } from 'react';
import { DepositWithDialogBody } from './components/DepositWithDialogBody/DepositWithDialogBody';
import { DepositWithStarsBody } from './components/DepositWithStarsBody/DepositWithStarsBody';
import { DepositWithTransferBody } from './components/DepositWithTransferBody/DepositWithTransferBody';

enum DepositWithDialogMode {
    Select = 'select',
    Starts = 'stars',
    Transfer = 'transfer',
}

export interface IDepositWithDialogProps {
    isOpen: boolean;
    onCancel: () => void;
}

export function useDialogTitle(mode: DepositWithDialogMode) {
    const depositSelectTitleText = useSelector(selectLocalValue('deposit.select.title'))
    const starsTitleText = useSelector(selectLocalValue('deposit.select.starsTitle'))
    const walletTitleText = useSelector(selectLocalValue('txt.transfer.title'))

    const [title, setTitle] = useState('');

    useEffect(() => {
        switch (mode) {
            case DepositWithDialogMode.Select:
                setTitle(depositSelectTitleText);
                break;
            case DepositWithDialogMode.Starts:
                setTitle(starsTitleText);
                break;
            case DepositWithDialogMode.Transfer:
                setTitle(walletTitleText);
                break;
            default:
                setTitle(depositSelectTitleText);
        }
    }, [mode, depositSelectTitleText, starsTitleText, walletTitleText]);

    return title;
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
