import * as CommandsPanelReducerMap from '../reducer-map';
import { UxUiState, UxUiStoreKey } from './reducers'
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UxUiFeatureState {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: {
        [UxUiStoreKey]: UxUiState;
    }
}

export const commandPanelFeatureSelector =
    createFeatureSelector<UxUiFeatureState, UxUiState>(CommandsPanelReducerMap.CommandsPanelStoreKey);

const uxUiFeatureSelector = createSelector(
    commandPanelFeatureSelector,
    (state) => state[UxUiStoreKey]
);

export const windowSizeSelector = createSelector(
    uxUiFeatureSelector,
    (state: UxUiState) => state.windowSize
);