import { AppSounds } from '@config/sounds';

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