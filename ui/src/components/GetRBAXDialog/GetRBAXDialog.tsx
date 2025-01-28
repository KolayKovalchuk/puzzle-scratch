

import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

import { useCallback, useState } from 'react';

import { DepositWithDialog } from '@components/DepositWithDialog/DepositWithDialog';
import { Button, ButtonType } from '@components/shared/Button';
import { useGetWidestChild, widestChildTargetClassName } from '@hooks/useGetWidestChild';
import { ROUTES } from '@routers/routerConfig';
import { useNavigate } from 'react-router-dom';
import styles from './GetRBAXDialog.module.scss';


export enum GetRBAXDialogMode {
    Default = 'Default',
    Deposit = 'Deposit',
}


export interface IGetRBAXDialogDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export function GetRBAXDialogDialog({ isOpen, onCancel, onConfirm }: IGetRBAXDialogDialogProps) {
    const [mode, setMode] = useState(GetRBAXDialogMode.Default);

    const titleText = useSelector(selectLocalValue('txt.outofrbax.title'));
    const contentText = useSelector(selectLocalValue('txt.outofrbax.msg'));

    const depositBtnText = useSelector(selectLocalValue('txt.outofrbax.btn.deposit'));
    const askBtnText = useSelector(selectLocalValue('txt.outofrbax.btn.ask'));
    const cancelBtnText = useSelector(selectLocalValue('txt.btn.cancel'));

    const onCancelCb = useCallback(() => {
        setMode(GetRBAXDialogMode.Default);
        onCancel();
    }, [onCancel]);

    const { containerRef, width: btnWidth } = useGetWidestChild();

    const onDepositBtnClick = useCallback(() => {
        console.log('Deposit button clicked');

        setMode(GetRBAXDialogMode.Deposit);
    }, []);

    const navigate = useNavigate();
    const onAskBtnClick = useCallback(() => {
        console.log('Ask button clicked');
        navigate(ROUTES.InviteFriends);
    }, []);

    if (mode === GetRBAXDialogMode.Deposit) {
        return <DepositWithDialog isOpen={isOpen} onCancel={onCancelCb} onConfirm={onConfirm} />
    }

    return (<ModalDialog
        isOpen={isOpen}
        title={titleText}
        cancelText={cancelBtnText}
        onClose={onCancelCb}
    >
        <div className={styles.container} ref={containerRef}>
            <div className={styles.content}>
                {contentText}
            </div>
            <Button
                className={`${widestChildTargetClassName} ${styles.btn}`}
                text={askBtnText}
                mode={ButtonType.Confirm}
                style={{ width: btnWidth || 'auto' }}
                onClick={onAskBtnClick}
            />
            <Button
                className={`${widestChildTargetClassName} ${styles.btn}`}
                text={depositBtnText}
                mode={ButtonType.Confirm}
                style={{ width: btnWidth || 'auto' }}
                onClick={onDepositBtnClick}
            />
        </div>
    </ModalDialog>);
};
