import * as CommandsPanelReducerMap from '../reducer-map';
import { PlayerListStoreKey, PlayerListState } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface PlayerListSelector {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: {
        [PlayerListStoreKey]: PlayerListState;
    };
}

export const playerListFeatureSelector =
    createFeatureSelector<PlayerListSelector, PlayerListState>(CommandsPanelReducerMap.CommandsPanelStoreKey);

export const currentPlayerSelector = createSelector(
    playerListFeatureSelector,
    (state) => state.currentPlayer
);