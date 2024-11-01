
import dialog_header from '@icons/dialog_header.svg';
import left_dialog_wing from '@icons/left_dialog_wing.svg';
import right_dialog_wing from '@icons/right_dialog_wing.svg';
import { StyledHeaderText } from '@components/shared/StyledHeaderText';
import { Icon } from '@components/shared/Icon';

import styles from './StyledHeader.module.scss';

export interface StyledHeaderTextProps {
    title: string;
}

export function StyledHeader({ title }: StyledHeaderTextProps) {
    return (<>
        <Icon name={left_dialog_wing} className={styles.leftDialogWing} />
        <Icon name={dialog_header} className={styles.dialogHeader} />
        <Icon name={right_dialog_wing} className={styles.rightDialogWing} />
        <div className={styles.headerContainer}>
            <StyledHeaderText text={title} />
        </div>
    </>)
}