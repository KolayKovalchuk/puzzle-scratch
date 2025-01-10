export const SHOW_AMOUNT_CHANGE_LABEL = 'SHOW_AMOUNT_CHANGE_LABEL';

export const showAmountChangeLabel = (lastAmountChange: number) => ({
    type: SHOW_AMOUNT_CHANGE_LABEL,
    payload: lastAmountChange,
})
