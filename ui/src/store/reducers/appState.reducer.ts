import { SET_IS_MAIN_LOADER_OPEN, SET_IS_MODAL_DIALOG_OPEN, SHOW_AMOUNT_CHANGE_LABEL } from '@store/actions/appState.actions';

// Initial State
export interface IPuzzleGameState {
    lastAmountIncrease: number;
    prizeLabelCounter: number;
    isMainLoaderOpen: boolean;
    isModalDialogOpen: boolean;
}

const initialState: IPuzzleGameState = {
    lastAmountIncrease: 0,
    prizeLabelCounter: 0,
    isMainLoaderOpen: false,
    isModalDialogOpen: false,
};

// Reducer
export const gameReducer = (state = initialState, action: any): IPuzzleGameState => {
    switch (action.type) {
        case SHOW_AMOUNT_CHANGE_LABEL:
            return {
                ...state,
                lastAmountIncrease: action.payload,
                prizeLabelCounter: state.prizeLabelCounter + 1,
            };
        case SET_IS_MAIN_LOADER_OPEN:
            return {
                ...state,
                isMainLoaderOpen: action.payload,
            };
        case SET_IS_MODAL_DIALOG_OPEN:
            return {
                ...state,
                isModalDialogOpen: action.payload,
            };
        default:
            return state;
    }
};
