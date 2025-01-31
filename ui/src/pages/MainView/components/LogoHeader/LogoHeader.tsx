import styles from './LogoHeader.module.scss';

import crypto_scratch_sign from '@icons/crypto_scratch_sign.svg';

import { Icon } from '@components/shared/Icon';

export interface ILogoHeaderProps {
    className?: string;
}

export function LogoHeader({ className }: ILogoHeaderProps) {
    return (
        <div className={`${styles.container} ${className || ''}`}>
            <Icon name={crypto_scratch_sign} className={styles.logoLabel}></Icon>
        </div>
    )
};
