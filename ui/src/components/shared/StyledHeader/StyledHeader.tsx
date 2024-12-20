
import { Icon } from '@components/shared/Icon';
import { StyledText } from '@components/shared/StyledText';

import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { ReactNode } from 'react';
import styles from './StyledHeader.module.scss';
import { useGetIconsConfig } from './hooks/useGetIconsConfig';

export enum StyledHeaderType {
    BLUE = 'Blue',
    PINK = 'Pink',
    GREEN = 'Green',
    RED = 'RED',
    DEFAULT = 'Default',
}

export interface StyledHeaderTextProps {
    title: string;
    children: ReactNode;
    className?: string;
    type?: StyledHeaderType;
    fontSize?: number;
    height?: string;
    noWings?: boolean;
}

export function StyledHeader({
    title,
    className,
    children,
    type = StyledHeaderType.DEFAULT,
    fontSize = 30,
    height = '55px',
    noWings = false,
}: StyledHeaderTextProps) {
    const {
        mainHeaderBgIconName,
        leftWingIconName,
        rightWingIconName
    } = useGetIconsConfig(type)

    const { containerRef, dimensions } = useContainerDimensions()

    const contentMarginTop = dimensions.height ? dimensions.height - 20 : 40

    return (
        <div className={`${styles.container} ${className || ''}`}>
            { !noWings && <Icon
                name={leftWingIconName}
                className={styles.leftDialogWing}
                style={{ width: height }}
            /> }
            <Icon
                ref={containerRef}
                name={mainHeaderBgIconName}
                className={`mainHeaderBanner ${styles.mainHeaderBanner}`}
                style={{ height: height }}
            />
            { !noWings && <Icon
                name={rightWingIconName}
                className={styles.rightDialogWing}
                style={{ width: height }}
            /> }
            <div className={styles.headerContainer} style={{ height: height }}>
                <StyledText text={title} textStyles={{ fontSize }} textFitCoefficient={0.9} />
            </div>
            <div className={`${styles.content}`} style={{ marginTop: contentMarginTop }}>
                {children}
            </div>
        </div>
    )
}