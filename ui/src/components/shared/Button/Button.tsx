import { RegularStyledText } from '../StyledText';
import styles from './Button.module.scss';
import { useButtonConfig } from './hooks/useButtonConfig';

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
    children?: React.ReactNode;
}

export function Button({ text, onClick, className, mode = ButtonType.Default, children }: IButtonProps) {
    const { className: buttonTypeClassName, stroke, textStyles } = useButtonConfig(mode, styles);

    return (
        <button className={`${styles.container} ${buttonTypeClassName} ${className || ''}`} onClick={onClick}>
            {!!children
                ? children
                : <RegularStyledText text={text || ''} className={styles.label} textStyles={{
                    fontSize: 20,
                    stroke,
                    dropShadow: false,
                    ...textStyles
                }}></RegularStyledText>
            }
        </button>
    )
}

export function ButtonGoldBorder(props: IButtonProps) {
    return (
        <div className={`${styles.goldBorder} ${props.className}`}>
            <Button {...props} className='' />
        </div>
    );
}