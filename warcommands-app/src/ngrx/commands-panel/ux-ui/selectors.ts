import * as CommandsPanelReducerMap from '../reducer-map';
import { UxUiState, UxUiStoreKey } from './reducers'
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface UxUiStore {
    [UxUiStoreKey]: UxUiState;
}

export interface UxUiFeatureState {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: UxUiStore;
}

export const commandPanelFeatureSelector =
    createFeatureSelector<UxUiStore>(CommandsPanelReducerMap.CommandsPanelStoreKey);

const uxUiFeatureSelector = createSelector(
    commandPanelFeatureSelector,
    (state) => state[UxUiStoreKey]
);

export const windowSizeSelector = createSelector(
    uxUiFeatureSelector,
    (state: UxUiState) => state.windowSize
);

export const isUserDraggingACommand = createSelector(
    uxUiFeatureSelector,
    (state: UxUiState) => state.isUserDraggingACommand
);
