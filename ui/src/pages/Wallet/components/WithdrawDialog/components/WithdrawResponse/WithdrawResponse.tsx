import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { WithdrawalRequestStatus } from '../../WithdrawDialog';

export interface IWithdrawResponseBodyProps {
    withdrawalStatus: WithdrawalRequestStatus;
}

export function WithdrawResponse({ withdrawalStatus }: IWithdrawResponseBodyProps) {
    // const contentText = useSelector(selectLocalValue('pop.withdrawal.successText'));
    const successText = useSelector(selectLocalValue('pop.withdrawal.successText'));
    
    const errorDefaultText = useSelector(selectLocalValue('pop.withdrawal.defaultError'));
    const errorWalletText = useSelector(selectLocalValue('pop.withdrawal.errorWallet'));
    const errorAmountText = useSelector(selectLocalValue('pop.withdrawal.errorAmount'));
    // return contentText

    const dialogBody = useMemo(() => {
        switch (withdrawalStatus) {
            case WithdrawalRequestStatus.Success:
                return successText;
            case WithdrawalRequestStatus.InsufficientBalanceError:
                return errorAmountText
            case WithdrawalRequestStatus.ValidationErrorError:
                return errorWalletText;
            default:
                return errorDefaultText;
        }
    }, [withdrawalStatus, successText, errorDefaultText, errorWalletText, errorAmountText]);

    return dialogBody;
}
