import * as CommandsPanelReducerMap from '../reducer-map';
import { BuildingListState, BuildingListStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface BuildingStore {
    [BuildingListStoreKey]: BuildingListState;
}

export interface BuildingListFeatureState {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: BuildingStore;
}

export const basicModeFeatureSelector =
    createFeatureSelector<BuildingStore>(CommandsPanelReducerMap.CommandsPanelStoreKey);

const buildingListFeatureSelector = createSelector(
    basicModeFeatureSelector,
    (state) => state[BuildingListStoreKey]
);

export const buildingSelector = createSelector(
    buildingListFeatureSelector,
    (state: BuildingListState, props: { buildingId: string }) => state.list[props.buildingId]
);

export const buildingListSelector = createSelector(
    buildingListFeatureSelector,
    (state: BuildingListState) => state.list
);
