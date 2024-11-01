
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';


export interface ITosApprovePopupProps {
    onClose: () => void;
    onConfirm: () => void;
    isOpen: boolean;
}

export function TosApprovePopup({ isOpen, onClose, onConfirm }: ITosApprovePopupProps) {
    const content = useSelector(selectLocalValue('txt.tos.approve'))
    const declineBtnText = useSelector(selectLocalValue('txt.btn.decline'))

    return (
        <ModalDialog
            isOpen={isOpen}
            title="ToS Approval"
            content={content}
            onClose={() => onClose()}
            onConfirm={() => onConfirm()}
            confirmText='Yes'
            cancelText={declineBtnText}
        ></ModalDialog>
    );
};
