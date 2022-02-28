import * as CommandsPanelReducerMap from '../reducer-map';
import { PlayerListStoreKey, PlayerListState } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface PlayerStore {
    [PlayerListStoreKey]: PlayerListState;
}

export interface PlayerListSelector {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: PlayerStore;
}

export const playerListFeatureSelector =
    createFeatureSelector<PlayerStore>(CommandsPanelReducerMap.CommandsPanelStoreKey);

const playerFeatureSelector = createSelector(
    playerListFeatureSelector,
    (state:PlayerStore) => state[PlayerListStoreKey]
);

export const currentPlayerSelector = createSelector(
    playerFeatureSelector,
    (state) => state.currentPlayer
);
