
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { BatchCardType } from '@models/BatchCard.model';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

import styles from './GameDescriptionPopup.module.scss';

export interface IGameDescriptionPopupProps {
    isOpen: boolean;
    onClose: () => void;
    batchCardType: BatchCardType;
}

function getLocKey(batchCardType: BatchCardType) {
    switch (batchCardType) {
        case BatchCardType.CANDY_MAZE:
            return 'puzzle.info.candymaze';
        case BatchCardType.VEGAS_LOOT:
            return 'puzzle.info.vegasloot';
        case BatchCardType.ICE_BOX:
            return 'puzzle.info.icebox';
        case BatchCardType.SANTA_SAC:
            return 'puzzle.info.santasac';
    }
}

export function GameDescriptionPopup({ isOpen, onClose, batchCardType }: IGameDescriptionPopupProps) {
    const locKey = getLocKey(batchCardType);
    const content = useSelector(selectLocalValue(locKey || ''));

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
