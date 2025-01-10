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

// Implemented for Telegram Web App
function legacyCopy(value: string) {
    try {
        const ta = document.createElement('textarea')
        ta.value = value ?? ''
        ta.style.position = 'absolute'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
        console.warn('Legacy copied to clipboard: ', value);
    } catch (error) {
        console.error('Error legacy copying to clipboard:', error);
    }
}

async function copyToClipboard(value: string) {
    try {
        await navigator.clipboard.writeText(value || '');
        console.log('Copied to clipboard:', value);
    } catch (error) {
        if (error instanceof Error && error.name === 'NotAllowedError') {
            legacyCopy(value);
        } else {
            console.error('Error copying to clipboard:', error);
        }
    }
}


export function CopyButton(props: ICopyButtonProps) {
    const [isCopiedDialogOpen, setIsCopiedDialogOpen] = useState(false);
    const successCopiedTitleText = useSelector(selectLocalValue('txt.invite.copied'));
    const successCopiedBtnText = useSelector(selectLocalValue('txt.btn.ok'));

    const showDialog = props.showDialog === undefined ? true : props.showDialog;

    const onCopyClicked = useCallback(async () => {
        try {
            const url = props.getCopyValue();
            await copyToClipboard(url || '');
            setIsCopiedDialogOpen(true);

            if (props.onClick) {
                props.onClick();
            }
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    }, [props.getCopyValue, props.onClick]);

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