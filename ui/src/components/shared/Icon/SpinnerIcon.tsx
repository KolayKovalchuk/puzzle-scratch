import { Icon, IconProps } from './Icon';

import styles from './Icon.module.scss';

export function SpinnerIcon(props: IconProps) {
    return (
        <Icon {...props} className={`${styles.spinnerIcon} ${props.className || ''}`} />
    );
}
