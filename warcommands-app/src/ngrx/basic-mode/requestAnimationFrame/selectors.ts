import * as BasicModeReducerMap from '../reducer-map';
import { RequestAnimationFrameKey, State } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface RequestAnimationFrameStore {
    [RequestAnimationFrameKey]: State;
}

export interface RequestAnimationFrameState {
    [BasicModeReducerMap.GameEngineBasicModeStoreKey]: RequestAnimationFrameStore;
}

export const basicModeFeatureSelector = createFeatureSelector<RequestAnimationFrameStore>(BasicModeReducerMap.GameEngineBasicModeStoreKey);

const requestAnimationFrameSelector = createSelector(
    basicModeFeatureSelector,
    (state) => state[RequestAnimationFrameKey]
);

export const selectFrameId = createSelector(
    requestAnimationFrameSelector,
    (state: State) => state?.frameId || 0
);
