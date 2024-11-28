export const UPDATE_LAST_WIN = 'UPDATE_LAST_WIN';

export interface IUpdateLastWinPayload {
    lastWin: number;
}

export const updateLastWin = (lastWin: number) => ({
    type: UPDATE_LAST_WIN,
    payload: lastWin,
});