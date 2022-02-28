import * as BasicModeReducerMap from '../reducer-map';
import { UnitListState, UnitListStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface UnitStore {
    [UnitListStoreKey]: UnitListState;
}

export interface UnitListFeatureState {
    [BasicModeReducerMap.GameEngineBasicModeStoreKey]: UnitStore;
}

export const basicModeFeatureSelector =
    createFeatureSelector<UnitStore>(BasicModeReducerMap.GameEngineBasicModeStoreKey);

const unitListFeatureSelector = createSelector(
    basicModeFeatureSelector,
    (state) => state[UnitListStoreKey]
);

export const unitSelector = createSelector(
    unitListFeatureSelector,
    (state: UnitListState, props: { unitId: string }) => state.list[props.unitId]
);
