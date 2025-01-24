import { useCallback, useState } from 'react';

export function useWithdrawDialog() {
    const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);

    const onWithdrawBtnClick = useCallback(() => {
        console.log('Withdraw button clicked');
        setIsWithdrawDialogOpen(true);
    }, [])

    const closeDialog = useCallback(() => {
        setIsWithdrawDialogOpen(false);
    }, [])

    return {
        isWithdrawDialogOpen,
        onWithdrawBtnClick,
        closeDialog,
    }
}
