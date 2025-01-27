import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WithdrawalRequestStatus } from '../WithdrawDialog';

export function useDilogTitleText(withdrawalStatus: WithdrawalRequestStatus) {
    const defaulTitleText = useSelector(selectLocalValue('txt.withdrawal.title'));
    const successTitleText = useSelector(selectLocalValue('pop.withdrawal.successTitle'));
    const errortitleText = useSelector(selectLocalValue('pop.withdrawal.errortitle'));

    const [titleText, setTitleText] = useState<string>(defaulTitleText);

    useEffect(() => {
        switch (withdrawalStatus) {
            case WithdrawalRequestStatus.Success:
                setTitleText(successTitleText);
                break;
            case WithdrawalRequestStatus.InsufficientBalanceError:
            case WithdrawalRequestStatus.ValidationErrorError:
            case WithdrawalRequestStatus.DefaultError:
                setTitleText(errortitleText);
                break;
            default:
                setTitleText(defaulTitleText);
                break;
        }
    }, [withdrawalStatus, defaulTitleText, successTitleText, errortitleText]);

    return { titleText };

}