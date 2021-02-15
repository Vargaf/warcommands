import * as BasicModeReducerMap from '../reducer-map';
import { UnitListState, UnitListStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UnitListFeatureState {
    [BasicModeReducerMap.GameEngineBasicModeStoreKey]: {
        [UnitListStoreKey]: UnitListState
    }
}

export const basicModeFeatureSelector = 
    createFeatureSelector<UnitListFeatureState>(BasicModeReducerMap.GameEngineBasicModeStoreKey);

const unitListFeatureSelector = createSelector(
    basicModeFeatureSelector,
    (state) => state[UnitListStoreKey]
);

export const unitSelector = createSelector(
    unitListFeatureSelector,
    (state: UnitListState, props) => state.list[props.unitId]
);