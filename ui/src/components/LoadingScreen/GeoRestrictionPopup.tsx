
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { selectLocalValue, selectLocalValueWithLink } from '@store/selectors/localization.selectors';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export interface IGeoRestrictionPopupProps {
    isOpen: boolean;
    className?: string;
}

export function GeoRestrictionPopup({ isOpen, className }: IGeoRestrictionPopupProps) {
    const title = useSelector(selectLocalValue('txt.restricted.title'));
    const content = useSelector(selectLocalValue('txt.restricted'));
    const okBtnConfig = useSelector(selectLocalValueWithLink('txt.restricted.ok'));

    const onConfirm = useCallback(() => {
        window.open(okBtnConfig.linkUrl, '_blank');
    }, [okBtnConfig.linkUrl]);

    return (
        <ModalDialog
            className={className || ''}
            isOpen={isOpen}
            title={title}
            content={content}
            confirmText={okBtnConfig.linkText}
            onConfirm={onConfirm}
        >
        </ModalDialog>
    );
};
