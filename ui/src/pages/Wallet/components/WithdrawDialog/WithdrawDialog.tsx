import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon';
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import { updateUserBalance } from '@services/api/balance.service';
import { useSendWithdrawalRequest } from '@services/api/depositWithdrawal.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './WithdrawDialog.module.scss';
import { IWithdrawalFormState, WithdrawBody } from './components/WithdrawBody/WithdrawBody';
import { WithdrawResponse } from './components/WithdrawResponse/WithdrawResponse';
import { useIsConfirmBtnDisabled } from './hooks/hooks';
import { useConfirmBtnText } from './hooks/useConfirmBtnText';
import { useDilogTitleText } from './hooks/useDilogTitleText';
import { useWithrawCooldownExpiry } from './hooks/useWithrawCooldownExpiry';
import { handleWithdrawError } from './utils/handleWithdrawError';

export interface IWithdrawDialogProps {
    className?: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export enum WithdrawalRequestStatus {
    NotSent = 'NotSent',
    Success = 'Success',

    WithdrawMaxAmountExceeded = 'WithdrawMaxAmountExceeded',
    WithdrawMinAmountExceeded = 'WithdrawMinAmountExceeded',
    AddressInvalid = 'AddressInvalid',

    WithdrawCooldownPeriod = 'WithdrawCooldownPeriod',
    InsufficientBalanceError = 'InsufficientBalance',
    ValidationErrorError = 'ValidationError',
    DefaultError = 'DefaultError',
}

export function WithdrawDialog({ className, isOpen, onCancel, onConfirm }: IWithdrawDialogProps) {
    const [ withdrawalStatus, setWithdrawalStatus ] = useState<WithdrawalRequestStatus>(WithdrawalRequestStatus.NotSent);
    const { titleText } = useDilogTitleText(withdrawalStatus);
    const { confirmBtnText } = useConfirmBtnText(withdrawalStatus);
    const closeBtnText = useSelector(selectLocalValue('txt.btn.close'));

    const { onWithrawCooldownExpiry, isCooldownExpired } = useWithrawCooldownExpiry(setWithdrawalStatus);

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

    const loadBalance = useCallback(async () => {
        setIsBalanceLoading(true);
        await updateUserBalance();
        setIsBalanceLoading(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            loadBalance();
        }
    }, [isOpen]);

    const onConfirmCb = useCallback(async () => {
        try {
            if (withdrawalStatus === WithdrawalRequestStatus.Success) {
                loadBalance();
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
            handleWithdrawError(error, setWithdrawalStatus);
        }

    }, [
        onConfirm,
        sendRequest,
        withdrawalForm,
        withdrawalStatus
    ]);

    const onCancelCb = useCallback(() => {
        if (!isCooldownExpired) {
            setWithdrawalStatus(WithdrawalRequestStatus.WithdrawCooldownPeriod);
        } else {
            setWithdrawalStatus(WithdrawalRequestStatus.NotSent);
        }

        setWithdrawalForm({
            walletAddress: '',
            amount: '',
            tag: '',
        });
        onCancel();
    }, [onCancel, isCooldownExpired]);

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
                : !isLoading && <WithdrawResponse withdrawalStatus={withdrawalStatus} onWithrawCooldownExpiry={onWithrawCooldownExpiry}/>
            }
        </ModalDialog>
    );
}
