import { CSSProperties, forwardRef, ReactNode, Ref } from 'react';
import { RegularStyledText } from '../StyledText';
import styles from './Button.module.scss';
import { useButtonConfig } from './hooks/useButtonConfig';
import { ITextStyle } from 'pixi.js';

export enum ButtonType {
    Confirm = 'confirm',
    Cancel = 'cancel',
    Default = 'default',
}

export interface IButtonProps {
    text?: string;
    onClick: () => void;
    className?: string;
    mode?: ButtonType;
    children?: ReactNode;
    style?: CSSProperties;
    shouldFitFontSize?: boolean;
    textStyle?: Partial<ITextStyle>;
}

export function ButtonComponent({ text, onClick, className, mode = ButtonType.Default, children, style, shouldFitFontSize = true, textStyle = {} }: IButtonProps,  ref: Ref<HTMLButtonElement>) {
    const { className: buttonTypeClassName, textStyles } = useButtonConfig(mode, styles);

    return (
        <button ref={ref} className={`${styles.container} ${buttonTypeClassName} ${className || ''}`} onClick={onClick} style={style}>
            {!!children
                ? children
                : <RegularStyledText
                    text={text || ''}
                    className={styles.label}
                    textStyles={{
                        ...textStyles,
                        ...textStyle,
                    }}
                    shouldFitFontSize={shouldFitFontSize}
                ></RegularStyledText>
            }
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