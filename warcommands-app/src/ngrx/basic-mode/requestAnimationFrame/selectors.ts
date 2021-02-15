import * as BasicModeReducerMap from '../reducer-map';
import { RequestAnimationFrameKey, State } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RequestAnimationFrameState {
    [BasicModeReducerMap.GameEngineBasicModeStoreKey]: {
        [RequestAnimationFrameKey]: State;
    }
}

export const basicModeFeatureSelector = createFeatureSelector<RequestAnimationFrameState>(BasicModeReducerMap.GameEngineBasicModeStoreKey);

const requestAnimationFrameSelector = createSelector(
    basicModeFeatureSelector,
    (state) => state[RequestAnimationFrameKey]
);

export const selectFrameId = createSelector(
    requestAnimationFrameSelector,
    (state: State) => state?.frameId || 0
);
