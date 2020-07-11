import * as BasicModeReducerMap from '../reducer-map';
import { BuildingListState, BuildingListStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface BuildingListFeatureState {
    [BasicModeReducerMap.GameEngineBasicModeStoreKey]: {
        [BuildingListStoreKey]: BuildingListState
    }
}

export const basicModeFeatureSelector =
    createFeatureSelector<BuildingListFeatureState>(BasicModeReducerMap.GameEngineBasicModeStoreKey);

const buildingListFeatureSelector = createSelector(
    basicModeFeatureSelector,
    (state) => state[BuildingListStoreKey]
);

export const buildingSelector = createSelector(
    buildingListFeatureSelector,
    (state: BuildingListState, props) => state.list[props.buildingId]
);

export const buildingListSelector = createSelector(
    buildingListFeatureSelector,
    (state: BuildingListState) => state.list
);