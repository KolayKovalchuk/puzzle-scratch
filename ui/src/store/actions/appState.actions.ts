import { AppSounds } from '@config/sounds';
import { AppErrors } from '@store/reducers/appState.reducer';

export const SHOW_AMOUNT_CHANGE_LABEL = 'SHOW_AMOUNT_CHANGE_LABEL';

export const showAmountChangeLabel = (lastAmountChange: number) => ({
    type: SHOW_AMOUNT_CHANGE_LABEL,
    payload: lastAmountChange,
})

export const PLAY_SOUND = 'PLAY_SOUND';

export const playSound = (soundName: AppSounds, shouldStopAllSounds = true, duration: number | null = null) => ({
    type: PLAY_SOUND,
    payload: {
        soundName,
        shouldStopAllSounds,
        duration,
    },
})

export const BLINK_MATRIX_CELS = 'BLINK_MATRIX_CELS';

export const blinkMatrixCels = () => ({
    type: BLINK_MATRIX_CELS,
})

export const RESET_MATRIX_BLINK_COUNTER = 'RESET_MATRIX_BLINK_COUNTER';

export const resetMatrixBlinkCounter = () => ({
    type: RESET_MATRIX_BLINK_COUNTER,
})

export const SET_APP_ERROR = 'SET_APP_ERROR';

export const setAppError = (error: AppErrors) => ({
    type: SET_APP_ERROR,
    payload: error,
})

export const SET_WITHDRAW_COOLDOWN_EXPIRY = 'SET_WITHDRAW_COOLDOWN_EXPIRY';

export const setWithdrawCooldownExpiry = (cooldownExpiry: number | null) => ({
    type: SET_WITHDRAW_COOLDOWN_EXPIRY,
    payload: cooldownExpiry,
})
