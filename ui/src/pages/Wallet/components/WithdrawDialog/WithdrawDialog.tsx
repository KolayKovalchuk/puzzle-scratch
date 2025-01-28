import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon';
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import { updateUserBalance } from '@services/api/balance.service';
import { useSendWithdrawalRequest } from '@services/api/depositWithdrawal.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './WithdrawDialog.module.scss';
import { IWithdrawalFormState, WithdrawBody } from './components/WithdrawBody/WithdrawBody';
import { WithdrawResponse } from './components/WithdrawResponse/WithdrawResponse';
import { useConfirmBtnText } from './hooks/useConfirmBtnText';
import { useDilogTitleText } from './hooks/useDilogTitleText';
import { useIsConfirmBtnDisabled } from './hooks/hooks';

export interface IWithdrawDialogProps {
    className?: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export enum WithdrawalRequestStatus {
    NotSent = 'NotSent',
    Success = 'Success',

    InsufficientBalanceError = 'InsufficientBalance',
    ValidationErrorError = 'ValidationError',
    DefaultError = 'DefaultError',
}

export function WithdrawDialog({ className, isOpen, onCancel, onConfirm }: IWithdrawDialogProps) {
    const [ withdrawalStatus, setWithdrawalStatus ] = useState<WithdrawalRequestStatus>(WithdrawalRequestStatus.NotSent);
    const { titleText } = useDilogTitleText(withdrawalStatus);
    const { confirmBtnText } = useConfirmBtnText(withdrawalStatus);
    const closeBtnText = useSelector(selectLocalValue('txt.btn.close'));

    const [withdrawalForm, setWithdrawalForm] = useState<IWithdrawalFormState>({
        walletAddress: '',
        amount: '',
        tag: '',
    });

    const onFormChange = useCallback((state: IWithdrawalFormState) => {
        setWithdrawalForm(state);
    }, []);

    const { sendRequest, loading: isWithdrawRequestLoading } = useSendWithdrawalRequest();
    const [ isBalanceLoading, setIsBalanceLoading ] = useState(false);

    const onConfirmCb = useCallback(async () => {
        try {
            if (withdrawalStatus === WithdrawalRequestStatus.Success) {
                setIsBalanceLoading(true);
                await updateUserBalance();
                setIsBalanceLoading(false);
                setWithdrawalStatus(WithdrawalRequestStatus.NotSent);
                onConfirm();
                return;
            }

            const response = await sendRequest(
                withdrawalForm.walletAddress,
                withdrawalForm.amount,
                withdrawalForm.tag,
            );
            setWithdrawalStatus(WithdrawalRequestStatus.Success);
            console.log('Withdrawal request sent:', response);
        } catch (error) {
            if (error instanceof AxiosError) {
                switch (error.response?.data?.error) {
                    case WithdrawalRequestStatus.InsufficientBalanceError:
                        setWithdrawalStatus(WithdrawalRequestStatus.InsufficientBalanceError);
                        break;
                    case WithdrawalRequestStatus.ValidationErrorError:
                        setWithdrawalStatus(WithdrawalRequestStatus.ValidationErrorError);
                        break;
                    default:
                        setWithdrawalStatus(WithdrawalRequestStatus.DefaultError);
                        break;
                }
            }
            return;
        }

    }, [
        onConfirm,
        sendRequest,
        withdrawalForm,
        withdrawalStatus
    ]);

    const onCancelCb = useCallback(() => {
        setWithdrawalStatus(WithdrawalRequestStatus.NotSent);
        setWithdrawalForm({
            walletAddress: '',
            amount: '',
            tag: '',
        });
        onCancel();
    }, [onCancel]);

    const [isFormValid, setIsFormValid] = useState(false);

    const { isConfirmDisabled } = useIsConfirmBtnDisabled(withdrawalStatus, withdrawalForm, isFormValid);

    const isLoading = isWithdrawRequestLoading || isBalanceLoading;
    const spinnerContainerClass = withdrawalStatus === WithdrawalRequestStatus.NotSent ? styles.absoluteSpinnerIconContainer : styles.relativeSpinnerIconContainer;
    const withdrawBodyCalss = isLoading ? styles.hidden : '';
    const cancelBtnText = withdrawalStatus !== WithdrawalRequestStatus.Success ? closeBtnText : '';
    const isStatusNotSent = withdrawalStatus === WithdrawalRequestStatus.NotSent;


    return (
        <ModalDialog
            isOpen={isOpen}
            title={titleText}
            cancelText={cancelBtnText}
            confirmText={confirmBtnText}
            onClose={onCancelCb}
            onConfirm={onConfirmCb}
            className={styles.modalDialog}
            isConfirmDisabled={isConfirmDisabled}
        >
            { isLoading && <div className={spinnerContainerClass}>
                    <SpinnerIcon name={robo_token_gold_no_shining} className={styles.spinnerIcon}/>
                </div>
            }
            { isStatusNotSent
                ? <WithdrawBody onFormChange={onFormChange} onFormValidChange={setIsFormValid} className={`${withdrawBodyCalss} ${className || ''}`}/>
                : !isLoading ? <WithdrawResponse withdrawalStatus={withdrawalStatus}/> : null
            }
        </ModalDialog>
    );
}
