import { createReducer, on, Action } from '@ngrx/store';
import * as UxUiActions from './actions';

export const UxUiStoreKey = 'ux_ui';

export interface UxUiState {
    windowSize: {
        width: number,
        height: number
    }
}

const initialState: UxUiState = {
    windowSize: {
        width: null,
        height: null
    }
}

const uxUiReducer = createReducer(
    initialState,
    on(UxUiActions.loadWindowsSize, (state, { width, height }) => {
        return {
            windowSize: { width, height }
        }
    })
);

export function reducer(state: UxUiState | undefined, action: Action) {
    return uxUiReducer(state, action);
}