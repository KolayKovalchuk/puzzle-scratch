import { selectLocalValue } from '@store/selectors/localization.selectors';
import { getIsTonAddress } from '@utils/isTonAddress';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IFormValidState } from '../components/WithdrawBody/WithdrawBody';

export function useValidateWalletAddress(setFormValidStatus: Dispatch<SetStateAction<IFormValidState>>) {
    const wrongWalletLabel = useSelector(selectLocalValue('txt.withdrawal.wrongwallet'));

    const validateWalletAddress = useCallback((value: string) => {
        const isTonAddress = getIsTonAddress(value);
        console.log('isTonAddress', value, isTonAddress);
        
        if (!isTonAddress) {
            setFormValidStatus((prev) => ({ ...prev, walletAddress: false }));
            return { isValid: false, validationErrorMsg: wrongWalletLabel };
        }

        setFormValidStatus((prev) => ({ ...prev, walletAddress: true }));
        return { isValid: true };
    }, [wrongWalletLabel]);

    return {
        validateWalletAddress,
    }
}