
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { AppErrors } from '@store/reducers/appState.reducer';
import { selectAppError } from '@store/selectors/appState.selectors';
import { selectLocalValue, selectLocalValueWithLink } from '@store/selectors/localization.selectors';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface IGeoRestrictionPopupProps {
    className?: string;
}

function useGeoRestrictionPopup() {
    const appError = useSelector(selectAppError);
    const [isGeoRestrictionVisible, setIsGeoRestrictionVisible] = useState(appError === AppErrors.GeoRestriction);

    useEffect(() => {
        const isGeoRestrictionVisible = appError === AppErrors.GeoRestriction;
        setIsGeoRestrictionVisible(isGeoRestrictionVisible);
    }, [appError]);

    const onGeoRestrictionConfirm = useCallback(() => {
        setIsGeoRestrictionVisible(false);
    }, []);

    return { isGeoRestrictionVisible, onGeoRestrictionConfirm };
}

export function GeoRestrictionPopup({ className }: IGeoRestrictionPopupProps) {
    const title = useSelector(selectLocalValue('txt.restricted.title'));
    const content = useSelector(selectLocalValue('txt.restricted'));
    const okBtnConfig = useSelector(selectLocalValueWithLink('txt.restricted.ok'));

    const { isGeoRestrictionVisible, onGeoRestrictionConfirm } = useGeoRestrictionPopup();

    const onConfirmCb = useCallback(() => {
        window.open(okBtnConfig.linkUrl, '_blank');
        onGeoRestrictionConfirm();
    }, [okBtnConfig.linkUrl, onGeoRestrictionConfirm]);

    return (
        <ModalDialog
            className={className || ''}
            isOpen={isGeoRestrictionVisible}
            title={title}
            content={content}
            confirmText={okBtnConfig.linkText}
            onConfirm={onConfirmCb}
        >
        </ModalDialog>
    );
};
