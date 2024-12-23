import { useCallback, useState } from 'react';
import ModalDialog from '../ModalDialog/ModalDialog';
import { Button, ButtonType, IButtonProps } from './Button';

import copy_icon from '@icons/copy_icon.svg';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

import styles from './Button.module.scss';

export interface ICopyButtonProps extends IButtonProps {
    getCopyValue: () => string | null;
    onConfirm?: () => void;
    showDialog?: boolean;
}

export function CopyButton(props: ICopyButtonProps) {
    const [isCopiedDialogOpen, setIsCopiedDialogOpen] = useState(false);
    const successCopiedTitleText = useSelector(selectLocalValue('txt.invite.copied'));
    const successCopiedBtnText = useSelector(selectLocalValue('txt.btn.ok'));

    const showDialog = props.showDialog === undefined ? true : props.showDialog;

    const onCopyClicked = useCallback(async () => {
        const url = props.getCopyValue();

        await navigator.clipboard.writeText(url || '')
        setIsCopiedDialogOpen(true);

        if (props.onClick) {
            props.onClick();
        }
    }, []);

    const onConfirmClick = useCallback(() => {
        setIsCopiedDialogOpen(false);
        if (props.onConfirm) {
            props.onConfirm();
        }
    }, []);

    return (<>
        <Button
            {...props}
            iconName={copy_icon}
            mode={ButtonType.Confirm}
            onClick={onCopyClicked}
        />
        {
            showDialog
                ? <ModalDialog
                    className={styles.copyModalDialog}
                    isOpen={isCopiedDialogOpen}
                    title={successCopiedTitleText}
                    content={''}
                    onConfirm={onConfirmClick}
                    confirmText={successCopiedBtnText}
                ></ModalDialog>
                : null
        }
    </>);
}