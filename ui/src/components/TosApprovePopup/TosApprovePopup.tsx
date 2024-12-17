
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { selectLocalValue, selectLocalValueWithLink } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

export interface ITosApprovePopupProps {
    onClose: () => void;
    onConfirm: () => void;
    isOpen: boolean;
}

export function TosApprovePopup({ isOpen, onClose, onConfirm }: ITosApprovePopupProps) {
    const titleText = useSelector(selectLocalValue('txt.tos.title'))

    const {
        followingText,
        linkText,
        linkUrl,
        prevText,
    } = useSelector(selectLocalValueWithLink('txt.tos.approve'))
    const agreeBtnText = useSelector(selectLocalValue('txt.btn.agree'))
    const declineBtnConfig = useSelector(selectLocalValueWithLink('txt.tos.decline'))

    const onCloseCB = () => {
        window.open(declineBtnConfig.linkUrl, '_blank');
        onClose();
    }

    return (
        <ModalDialog
            isOpen={isOpen}
            title={titleText}
            onClose={() => onCloseCB()}
            onConfirm={() => onConfirm()}
            confirmText={agreeBtnText}
            cancelText={declineBtnConfig.linkText}
        >
            <div>
                {prevText}
                <a href='' onClick={(e) => {
                    e.preventDefault();
                    window.open(linkUrl, '_blank');
                }}>{linkText}</a>
                {followingText}
            </div>
        </ModalDialog>
    );
};
