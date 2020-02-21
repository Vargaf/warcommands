import * as BasicModeReducerMap from '../reducer-map';
import { BaseState, GameEngineBasicModeBaseStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface BaseFeatureState {
    [BasicModeReducerMap.GameEngineBasicModeStoreKey]: {
        [GameEngineBasicModeBaseStoreKey]: BaseState;
    };
}

export const selectBaseFeatureSelector =
    createFeatureSelector<BaseFeatureState, BaseState>(BasicModeReducerMap.GameEngineBasicModeStoreKey);

export const selectBaseListSelector = createSelector(
    selectBaseFeatureSelector,
    (state: BaseState) => state.baseList
);
