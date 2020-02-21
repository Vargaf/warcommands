import * as CommandsPanelReducerMap from '../reducer-map';
import { CommandContainerState, CommandContainerStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CommandContainerFeatureState {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: {
        [CommandContainerStoreKey]: CommandContainerState;
    };
}

export const commandContainerFeatureSelector =
    createFeatureSelector<CommandContainerFeatureState, CommandContainerState>(CommandsPanelReducerMap.CommandsPanelStoreKey);

export const commandContainerSelector = createSelector(
    commandContainerFeatureSelector,
    (state: CommandContainerState, props) => state.commandContainerList[props.commandContainerId]
);
