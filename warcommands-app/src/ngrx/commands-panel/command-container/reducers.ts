import { CommandContainerListDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { createReducer, on, Action } from '@ngrx/store';
import * as CommandContainerActions from './actions';
import { state } from '@angular/animations';

export const CommandContainerStoreKey = 'commandContainer';

export interface CommandContainerState {
    commandContainerList: CommandContainerListDTO;
}

const initialState: CommandContainerState = {
    commandContainerList: {}
};

const commandContainerReducer = createReducer(
    initialState,
    on(CommandContainerActions.addCommandContainer, (state, { commandContainer }) => {
        const newCommandContainer: CommandContainerListDTO = {
            [commandContainer.id]: commandContainer
        };
        return {
            commandContainerList: { ...state.commandContainerList, ...newCommandContainer}
        };
    }),
    on(CommandContainerActions.addCommandToCommandContainer, (state, { command, index }) => {
        const commands = [ ...state.commandContainerList[command.parentCommandContainerId].commands ];
        commands.splice(index, 0, command.id);
        const commandContainer = { ...state.commandContainerList[command.parentCommandContainerId], commands };
        const commandContainerListItem: CommandContainerListDTO = {
            [command.parentCommandContainerId]: commandContainer
        };
        const commandContainerList = { ...state.commandContainerList, ...commandContainerListItem };

        return {
            commandContainerList
        };
    }),
    on(CommandContainerActions.removeCommandFromContainer, (state, { commandId, commandContainerId }) => {
        const currentCommandContainerCommandsList = [ ...state.commandContainerList[commandContainerId].commands ];
        const newCommandContainerCommandsList = currentCommandContainerCommandsList.filter((command) => {
            return commandId !== command;
        });

        const commandContainer = { ...state.commandContainerList[commandContainerId], ...{ commands: newCommandContainerCommandsList } };
        const commandContainerListItem: CommandContainerListDTO = {
            [commandContainerId]: commandContainer
        };
        const commandContainerList = { ...state.commandContainerList, ...commandContainerListItem };

        return {
            commandContainerList
        };
    }),
    on(CommandContainerActions.removeCommandContainer, (state, { commandContainer }) => {
        const commandContainerList = { ...state.commandContainerList };
        delete commandContainerList[commandContainer.id];

        return {
            commandContainerList
        };
    })
);

export function reducer(state: CommandContainerState | undefined, action: Action) {
    return commandContainerReducer(state, action);
}
