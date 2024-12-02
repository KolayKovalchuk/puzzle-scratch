import { CSSProperties, forwardRef } from 'react';

import styles from './Icon.module.scss';

interface IconProps {
    name: string;
    title?: string;
    className?: string;
    iconSize?: number | string;
    style?: CSSProperties;
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(({ name, style = {}, iconSize = "100%", title, className }, ref) => {
    return (
        <div ref={ref} className={`${styles.iconContainer} ${className || ''}`} style={style}>
            <div className={styles.iconContent}>
                <svg
                    width={iconSize}
                    height={iconSize}
                    aria-label={title ? title : name}
                    role="img"
                >
                    <use xlinkHref={`#${name}`} />
                </svg>
            </div>
        </div>
    );
});
