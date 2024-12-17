import { CSSProperties, forwardRef, ReactNode } from 'react';

import styles from './Icon.module.scss';

interface IconProps {
    name?: string;
    title?: string;
    className?: string;
    iconSize?: number | string;
    style?: CSSProperties;

    children?: ReactNode;

    onClick?: () => void;
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(({
    name,
    style = {},
    iconSize = "100%",
    title,
    className,
    onClick,
    children
}, ref) => {
    return (
        <div
            ref={ref}
            className={`${styles.iconContainer}
            ${className || ''}`} style={style}
            onClick={onClick}
        >
            <div className={styles.iconContent}>
                {children
                    ? children
                    : <svg
                        width={iconSize}
                        height={iconSize}
                        aria-label={title ? title : name}
                        role="img"
                    >
                        <use xlinkHref={`#${name}`} />
                    </svg>
                }
            </div>
        </div>
    );
});
