import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function Input({ className,...props }: IInputProps) {
    return (
        <input
            className={`${styles.input} ${className}`}
            {...props}
        />
    );
}
