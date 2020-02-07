import * as BasicModeReducerMap from '../reducer-map';
import { BaseState, GameEngineBasicModeBaseStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface BaseFeatureState {
    [BasicModeReducerMap.GameEngineBasicModeStoreKey]: {
        [GameEngineBasicModeBaseStoreKey]: BaseState;
    };
}

export const selectBaseFeature = createFeatureSelector<BaseFeatureState, BaseState>(BasicModeReducerMap.GameEngineBasicModeStoreKey);

export const selectBaseStateFeature = createSelector(
    selectBaseFeature,
    (state: BaseState) => state.baseList
);
