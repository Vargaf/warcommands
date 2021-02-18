import { createReducer, on, Action } from '@ngrx/store';
import * as RequestAnimationFrameActions from './actions';

export const RequestAnimationFrameKey = 'requestAnimationFrameStore';

export interface State {
    frameId: number | null;
}

export const initialState: State = {
    frameId: null,
};

const requestAnimationFrameReducer = createReducer(
    initialState,
    on(RequestAnimationFrameActions.updateFrame, (state, { frameId }) => {
        return {
            ...state,
            frameId
        };
    })
);

export function reducer(state: State | undefined, action: Action) {
    return requestAnimationFrameReducer(state, action);
}
