import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { ChangeEvent, InputHTMLAttributes, useCallback, useState } from 'react';
import styles from './Input.module.scss';

export interface IValidatoionState {
    isValid: boolean;
    validationErrorMsg?: string;
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    validate?: (value: string) => IValidatoionState;
}

export function Input({ className, validate, ...props }: IInputProps) {
    const [validatoionState, setValidatoionState] = useState<IValidatoionState>({ isValid: true });

    const runValidator = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (validate) {
            const { isValid, validationErrorMsg } = validate(event.target.value);
            setValidatoionState({ isValid, validationErrorMsg });
        }
    }, [validate]);
    const debouncedValidator = useDebouncedCallback(runValidator);
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(event);
        debouncedValidator(event);
    }, [props.onChange, debouncedValidator]);

    const isValidationErrorVisible = !validatoionState.isValid && validatoionState.validationErrorMsg;
    const errorContainerClassname = isValidationErrorVisible ? styles.errorContier : '';
    const containerClassname = `${styles.inputContainer} ${errorContainerClassname} ${className || ''}`

    return (
        <div className={containerClassname}>
            <input
                {...props}
                className={`${styles.input}`}
                onChange={onChange}
            />
            {isValidationErrorVisible &&
                <div className={styles.validationError}>
                    * {validatoionState.validationErrorMsg}
                </div>
            }
        </div>
    );
}
