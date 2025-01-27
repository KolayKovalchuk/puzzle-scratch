import { useSelector } from 'react-redux';
import { WithdrawalRequestStatus } from '../WithdrawDialog';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useEffect, useState } from 'react';

export function useConfirmBtnText(withdrawalStatus: WithdrawalRequestStatus) {
    const okBtnText = useSelector(selectLocalValue('txt.btn.ok'));
    const withdrawBtnText = useSelector(selectLocalValue('txt.button.withdraw'));

    const [confirmBtnText, setConfirmBtnText] = useState(withdrawBtnText);

    useEffect(() => {
        switch (withdrawalStatus) {
            case WithdrawalRequestStatus.NotSent:
                setConfirmBtnText(withdrawBtnText);
                break;
            case WithdrawalRequestStatus.Success:
                setConfirmBtnText(okBtnText);
                break;
            default:
                setConfirmBtnText('');
                break
        }
    }, [withdrawalStatus, okBtnText, withdrawBtnText]);

    return {
        confirmBtnText,
    };
}