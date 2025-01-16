import { AppSounds } from '@config/sounds';
import { NO_TAP_SOUND_CLASS } from '@hooks/usePlaySound';
import btn_3d_elipse from '@icons/btn_3d_elipse.svg';
import { playSound } from '@store/actions/appState.actions';
import store from '@store/store';
import { ITextStyle } from 'pixi.js-legacy';
import { CSSProperties, forwardRef, ReactNode, Ref, useCallback } from 'react';
import { Icon } from '../Icon';
import { RegularStyledText } from '../StyledText';
import { useButtonConfig } from './hooks/useButtonConfig';

import styles from './Button.module.scss';


export enum ButtonType {
    Confirm = 'confirm',
    Cancel = 'cancel',
    Default = 'default',
    Disabled = 'disabled',
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

    isDisabled?: boolean;

    getTextSize?: (textSize: string | number) => void;
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
    isDisabled = false,

    getTextSize,
}: IButtonProps, ref: Ref<HTMLButtonElement>) {
    const { className: buttonTypeClassName, textStyles } = useButtonConfig(mode, styles, isDisabled);

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
                getTextSize={getTextSize}
            ></RegularStyledText>
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
    const isDisabledClass = isDisabled ? styles.disabled : '';
    const btnClassName = `${styles.container} ${buttonTypeClassName} ${isDisabledClass}`;
    const noTapSoundClassName = mode === ButtonType.Cancel ? NO_TAP_SOUND_CLASS : '';
    const containerClassName = `${iconContainerClassName} ${noTapSoundClassName} ${className || ''}`;

    const onClickWithSound = useCallback(() => {
        if (!isDisabled && onClick) {
            onClick();
        }

        if (mode === ButtonType.Cancel) {
            store.dispatch(playSound(AppSounds.Cancel));
        }
    }, [mode, onClick, isDisabled]);

    if (is3d) {
        return (
            <div className={`${containerClassName} ${styles.btn3dContainer} `}>
                <Icon name={btn_3d_elipse} className={`${styles.btnElips} ${styles.topLeftElipse}`} />

                <div className={styles.bottomElipsContianer}>
                    <Icon name={btn_3d_elipse} className={`${styles.btnElips}`} />
                    <Icon name={btn_3d_elipse} className={`${styles.btnElips} ${styles.smallElipse}`} />
                </div>
                <button ref={ref} className={`${btnClassName}`} onClick={onClickWithSound} style={style}>
                    {renderContent()}
                </button>
            </div>
        );
    }

    return (
        <button ref={ref} className={`${btnClassName} ${containerClassName}`} onClick={onClickWithSound} style={style}>
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