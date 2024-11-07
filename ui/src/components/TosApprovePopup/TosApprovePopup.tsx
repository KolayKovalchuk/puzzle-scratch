
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { selectLocalValue, selectLocalValueWithLinkHTML, selectLocalValueWithLinkConfig } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';


export interface ITosApprovePopupProps {
    onClose: () => void;
    onConfirm: () => void;
    isOpen: boolean;
}

export function TosApprovePopup({ isOpen, onClose, onConfirm }: ITosApprovePopupProps) {
    const titleText = useSelector(selectLocalValue('txt.tos.title'))

    const content = useSelector(selectLocalValueWithLinkHTML('txt.tos.approve'))

    const agreeBtnText = useSelector(selectLocalValue('txt.btn.agree'))
    const declineBtnConfig = useSelector(selectLocalValueWithLinkConfig('txt.tos.decline'))

    const onCloseCB = () => {
        window.open(declineBtnConfig.linkUrl, '_blank');
        onClose();
    }

    return (
        <ModalDialog
            isOpen={isOpen}
            title={titleText}
            content={content}
            onClose={() => onCloseCB()}
            onConfirm={() => onConfirm()}
            confirmText={agreeBtnText}
            cancelText={declineBtnConfig.linkText}
        >
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </ModalDialog>
    );
};
