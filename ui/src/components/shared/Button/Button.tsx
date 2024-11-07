import { RegularStyledText } from '../StyledText';
import styles from './Button.module.scss';

export interface IButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    isConfirm?: boolean;
    isCancel?: boolean;
}

export function Button({ text, onClick, className, isConfirm, isCancel }: IButtonProps) {
    const buttonTypeClassName = `${isConfirm && styles.confirm} ${isCancel && styles.cancel}`
    const stroke = isConfirm ? '#295808' : isCancel ? '#580808' : '#000000';

    return (
        <button className={`${styles.container} ${buttonTypeClassName} ${className || ''}`} onClick={onClick}>
            <RegularStyledText text={text} className={styles.label} textStyles={{ fontSize: 20, stroke }}></RegularStyledText>
        </button>
    )
}