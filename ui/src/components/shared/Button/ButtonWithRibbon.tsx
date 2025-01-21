import coming_soon from '@icons/coming_soon.svg';
import { Icon } from '../Icon';
import { Button, IButtonProps } from './Button';
import styles from './Button.module.scss';

export interface IButtonWithRibbonProps extends IButtonProps {
    ribbonLabel: string;
}

export function ButtonWithRibbon(props: IButtonWithRibbonProps) {
    return (
        <div className={`${styles.ribbonBtnContainer} ${props.className}`}>
            <div className={styles.ribbonContainer}>
                <Icon name={coming_soon} className={styles.ribbonIcon}></Icon>
                <span
                    className={styles.ribbonText}
                >{props.ribbonLabel}</span>
            </div>
            <Button {...props} className='' />
        </div>
    );
}