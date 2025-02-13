
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { setAppError } from '@store/actions/appState.actions';
import { AppErrors } from '@store/reducers/appState.reducer';
import { selectAppError } from '@store/selectors/appState.selectors';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import store from '@store/store';
import { on } from 'events';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface ISystemErrorPopupProps {
    className?: string;
}

function useSystemErrorPopup() {
    const appError = useSelector(selectAppError);
    const [isSystemErrorVisible, setIsSystemErrorVisible] = useState(appError === AppErrors.SystemError);

    useEffect(() => {
        const isSystemErrorVisible = appError === AppErrors.SystemError;
        setIsSystemErrorVisible(isSystemErrorVisible);
    }, [appError]);

    const onSystemErrorConfirm = useCallback(() => {
        setIsSystemErrorVisible(false);
    }, []);

    return { isSystemErrorVisible, onSystemErrorConfirm };
}

export function SystemErrorPopup({ className }: ISystemErrorPopupProps) {
    const title = useSelector(selectLocalValue('txt.system.title'));
    const content = useSelector(selectLocalValue('txt.system.msg'));

    const okBtnText = useSelector(selectLocalValue('txt.btn.ok'));

    const { isSystemErrorVisible, onSystemErrorConfirm } = useSystemErrorPopup();

    const onConfirmCb = useCallback(() => {
        store.dispatch(setAppError(AppErrors.NoError));
        onSystemErrorConfirm();
    }, [onSystemErrorConfirm]);

    return (
        <ModalDialog
            className={className || ''}
            isOpen={isSystemErrorVisible}
            title={title}
            content={content}
            confirmText={okBtnText}
            onConfirm={onConfirmCb}
        >
        </ModalDialog>
    );
};
