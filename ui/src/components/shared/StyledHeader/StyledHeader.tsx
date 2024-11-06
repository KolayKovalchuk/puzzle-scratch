
import { StyledHeaderText } from '@components/shared/StyledHeaderText';
import { Icon } from '@components/shared/Icon';

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
    fontSize,
    height = '55px',
}: StyledHeaderTextProps) {
    const {
        mainHeaderBgIconName,
        leftWingIconName,
        rightWingIconName
    } = useGetIconsConfig(type)

    return (<div className={`${styles.container} ${className || ''}`}>
        <Icon name={leftWingIconName} className={styles.leftDialogWing} style={{width: height}}/>
        <Icon name={mainHeaderBgIconName} className={styles.mainHeaderBanner} style={{height: height}}/>
        <Icon name={rightWingIconName} className={styles.rightDialogWing} style={{width: height}}/>
        <div className={styles.headerContainer} style={{ height: height }}>
            <StyledHeaderText text={title} fontSize={fontSize}/>
        </div>
        <div className={`${styles.content}`}>
            {children}
        </div>
    </div>)
}