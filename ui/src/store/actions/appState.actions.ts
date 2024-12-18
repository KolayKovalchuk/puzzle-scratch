export const SHOW_AMOUNT_CHANGE_LABEL = 'SHOW_AMOUNT_CHANGE_LABEL';

export const showAmountChangeLabel = (lastAmountIncrease: number) => ({
    type: SHOW_AMOUNT_CHANGE_LABEL,
    payload: lastAmountIncrease,
})

export const SET_IS_MAIN_LOADER_OPEN = 'SET_IS_MAIN_LOADER_OPEN';

export const setIsMainLoaderOpen = (isOpen: boolean) => ({
    type: SET_IS_MAIN_LOADER_OPEN,
    payload: isOpen,
})

export const SET_IS_MODAL_DIALOG_OPEN = 'SET_IS_MODAL_DIALOG_OPEN';

export const setIsModalDialogOpen = (isOpen: boolean) => ({
    type: SET_IS_MODAL_DIALOG_OPEN,
    payload: isOpen,
})
