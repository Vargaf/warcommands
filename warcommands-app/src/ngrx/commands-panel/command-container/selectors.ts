import * as CommandsPanelReducerMap from '../reducer-map';
import { CommandContainerState, CommandContainerStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface CommandContainerStore {
    [CommandContainerStoreKey]: CommandContainerState;
}

export interface CommandContainerFeatureState {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: CommandContainerStore;
}

export const commandPanelFeatureSelector =
    createFeatureSelector<CommandContainerStore>(CommandsPanelReducerMap.CommandsPanelStoreKey);

const commandContainerFeatureSelector = createSelector(
    commandPanelFeatureSelector,
    (state: CommandContainerStore) => state[CommandContainerStoreKey]
);

export const commandContainerSelector = createSelector(
    commandContainerFeatureSelector,
    (state: CommandContainerState, props: { commandContainerId: string }) => state.commandContainerList[props.commandContainerId]
);
