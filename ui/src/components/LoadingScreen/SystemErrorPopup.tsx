
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { setAppError } from '@store/actions/appState.actions';
import { AppErrors } from '@store/reducers/appState.reducer';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import store from '@store/store';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export interface ISystemErrorPopupProps {
    isOpen: boolean;
    className?: string;
}

export function SystemErrorPopup({ isOpen, className }: ISystemErrorPopupProps) {
    const title = useSelector(selectLocalValue('txt.system.title'));
    const content = useSelector(selectLocalValue('txt.system.msg'));

    const okBtnText = useSelector(selectLocalValue('txt.btn.ok'))

    const onConfirm = useCallback(() => {
        store.dispatch(setAppError(AppErrors.NoError));
    }, []);

    return (
        <ModalDialog
            className={className || ''}
            isOpen={isOpen}
            title={title}
            content={content}
            confirmText={okBtnText}
            onConfirm={onConfirm}
        >
        </ModalDialog>
    );
};
