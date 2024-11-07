
import { Icon } from '@components/shared/Icon';
import { StyledText } from '@components/shared/StyledText';

import styles from './StyledHeader.module.scss';
import { useGetIconsConfig } from './hooks/useGetIconsConfig';

export enum StyledHeaderType {
    BLUE = 'Blue',
    PINK = 'Pink',
    GREEN = 'Green',
    DEFAULT = 'Default',
}

export interface StyledHeaderTextProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    type?: StyledHeaderType;
    fontSize?: number;
    height?: string;
}

export function StyledHeader({
    title,
    className,
    children,
    type = StyledHeaderType.DEFAULT,
    fontSize = 30,
    height = '55px',
}: StyledHeaderTextProps) {
    const {
        mainHeaderBgIconName,
        leftWingIconName,
        rightWingIconName
    } = useGetIconsConfig(type)

    return (
        <div className={`${styles.container} ${className || ''}`}>
            <Icon name={leftWingIconName} className={styles.leftDialogWing} style={{ width: height }} />
            <Icon name={mainHeaderBgIconName} className={styles.mainHeaderBanner} style={{ height: height }} />
            <Icon name={rightWingIconName} className={styles.rightDialogWing} style={{ width: height }} />
            <div className={styles.headerContainer} style={{ height: height }}>
                <StyledText text={title} textStyles={{ fontSize }} textFitCoefficient={0.9}/>
            </div>
            <div className={`${styles.content}`}>
                {children}
            </div>
        </div>
    )
}