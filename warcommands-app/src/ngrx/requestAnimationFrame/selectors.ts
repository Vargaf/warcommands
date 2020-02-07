import { RequestAnimationFrameKey, State } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RequestAnimationFrameState {
    [RequestAnimationFrameKey]: State;
}

export const selectRequestAnimationFrameFeature = createFeatureSelector<RequestAnimationFrameState, State>(RequestAnimationFrameKey);

export const selectFrameId = createSelector(
    selectRequestAnimationFrameFeature,
    (state: State) => state.frameId
);
