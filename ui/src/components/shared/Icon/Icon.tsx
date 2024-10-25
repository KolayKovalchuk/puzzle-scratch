import React from 'react';

import styles from './Icon.module.scss';

interface IconProps {
    name: string;
    title?: string;
    className?: string;
    iconSize?: number | string;
    style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({ name, style = {}, iconSize = "100%", title, className }) => {
    return (
        <div className={`${styles.iconContainer} ${className || ''}`} style={style}>
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
};
