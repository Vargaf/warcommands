import { createReducer, on, Action } from '@ngrx/store';
import * as UxUiActions from './actions';

export const UxUiStoreKey = 'uxUiStore';

export interface UxUiState {
    isUserDraggingACommand: boolean;
    windowSize: {
        width: number | null;
        height: number | null;
    };
}

const initialState: UxUiState = {
    isUserDraggingACommand: false,
    windowSize: {
        width: null,
        height: null
    }
}

const uxUiReducer = createReducer(
    initialState,
    on(UxUiActions.loadWindowsSize, (state, { width, height }) => {
        return {
            ...state,
            windowSize: { width, height },
        }
    }),
    on(UxUiActions.setCommandListDraggingStatus, (state, { isDragging }) => {
        return {
            ...state,
            isUserDraggingACommand: isDragging
        }
    })
);

export function reducer(state: UxUiState | undefined, action: Action) {
    return uxUiReducer(state, action);
}