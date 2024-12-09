
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { selectFriendRBax, selectFriendToInvite } from '@store/selectors/config.selectors';
import { selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

export interface IBonusInfoDialogPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BonusInfoDialogPopup({ isOpen, onClose }: IBonusInfoDialogPopupProps) {
    const friendToInvite = useSelector(selectFriendToInvite) || 0;
    const friendRBax = useSelector(selectFriendRBax) || 0;

    const content = useSelector(selectLocalValueWithVars('txt.invite.terms', friendRBax, friendToInvite));


    return (
        <ModalDialog
            isOpen={isOpen}
            content={content}
            onClose={onClose}
            callOnCloseOnOverlayClick={true}
        >
        </ModalDialog>
    );
};
