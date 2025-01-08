
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { BatchCardType } from '@models/BatchCard.model';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

import styles from './GameInfoPopup.module.scss';

export interface IGameInfoPopupProps {
    isOpen: boolean;
    onClose: () => void;
    batchCardType: BatchCardType;
}

function getLocKey(batchCardType: BatchCardType) {
    switch (batchCardType) {
        case BatchCardType.CANDY_MAZE:
            return 'puzzle.gallery.candymaze';
        case BatchCardType.ICE_BOX:
            return 'puzzle.gallery.icebox';
        case BatchCardType.SANTA_SAC:
            return 'puzzle.gallery.santasac';
    }
}

export function GameInfoPopup({ isOpen, onClose, batchCardType }: IGameInfoPopupProps) {
    const locKey = getLocKey(batchCardType);
    const content = useSelector(selectLocalValue(locKey));

    return (
        <ModalDialog
            className={styles.container}
            isOpen={isOpen}
            content={content}
            onClose={onClose}
            callOnCloseOnOverlayClick={true}
        >
        </ModalDialog>
    );
};
