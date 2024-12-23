import { useCallback, useState } from 'react';

export function useDepositWithDialog() {
    const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);

    const onDepositBtnClick = useCallback(() => {
        console.log('Deposit button clicked');
        setIsDepositDialogOpen(true);
    }, [])

    const onCancel = useCallback(() => {
        setIsDepositDialogOpen(false);
    }, [])

    return {
        isDepositDialogOpen,
        onDepositBtnClick,
        onCancel,
    }
}
