import { ITextStyle } from 'pixi.js';
import { CSSProperties, forwardRef, ReactNode, Ref, useCallback } from 'react';
import { Icon } from '../Icon';
import { RegularStyledText } from '../StyledText';
import { useButtonConfig } from './hooks/useButtonConfig';

import styles from './Button.module.scss';

import btn_3d_elipse from '@icons/btn_3d_elipse.svg';

export enum ButtonType {
    Confirm = 'confirm',
    Cancel = 'cancel',
    Default = 'default',
}

export interface IButtonProps {
    onClick?: () => void;
    className?: string;
    mode?: ButtonType;
    children?: ReactNode;
    iconName?: string;

    text?: string;
    style?: CSSProperties;
    shouldFitFontSize?: boolean;
    textStyle?: Partial<ITextStyle>;

    is3d?: boolean;
}

export function ButtonComponent({
    onClick,
    className,
    mode = ButtonType.Default,
    iconName,

    text,
    children,
    style,
    shouldFitFontSize = true,
    textStyle = {},

    is3d = false,

}: IButtonProps, ref: Ref<HTMLButtonElement>) {
    const { className: buttonTypeClassName, textStyles } = useButtonConfig(mode, styles);

    const renderContent = useCallback(() => {
        if (!!children) {
            return children;
        }

        if (iconName) {
            return (
                <Icon name={iconName} className={styles.icon} />
            )
        }

        return (
            <RegularStyledText
                text={text || ''}
                className={styles.label}
                textStyles={{
                    ...textStyles,
                    ...textStyle,
                }}
                shouldFitFontSize={shouldFitFontSize}
            ></RegularStyledText>
            // <span className={styles.textLabel}>{text}</span>

        );
    }, [
        children,
        iconName,
        text,
        textStyles,
        shouldFitFontSize,
        textStyle,
    ]);

    const iconContainerClassName = iconName ? styles.iconContainer : '';
    let btnClassName = `${styles.container} ${buttonTypeClassName}`
    const containerClassName = `${iconContainerClassName} ${className || ''}`;
    if (is3d) {
        return (
            <div className={`${containerClassName} ${styles.btn3dContainer} `}>
                <Icon name={btn_3d_elipse} className={`${styles.btnElips} ${styles.topLeftElipse}`} />

                <div className={styles.bottomElipsContianer}>
                    <Icon name={btn_3d_elipse} className={`${styles.btnElips}`} />
                    <Icon name={btn_3d_elipse} className={`${styles.btnElips} ${styles.smallElipse}`} />
                </div>
                <button ref={ref} className={`${btnClassName}`} onClick={onClick} style={style}>
                    {renderContent()}
                </button>
            </div>
        );
    }

    return (
        <button ref={ref} className={`${btnClassName} ${containerClassName}`} onClick={onClick} style={style}>
            {renderContent()}
        </button>
    )
}

export const Button = forwardRef(ButtonComponent);

export function ButtonGoldBorder(props: IButtonProps) {
    return (
        <div className={`${styles.goldBorder} ${props.className}`}>
            <Button {...props} className='' />
        </div>
    );
}