import { CommandContainerListDTO } from 'src/warcommands/commands/domain/command-container/model/command-container.dto';
import { createReducer, on, Action } from '@ngrx/store';
import * as CommandContainerActions from './actions';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { CommandInterface } from 'src/warcommands/commands/domain/command/model/command.interface';

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
        const commands = [ ...state.commandContainerList[command.commandContainerId].commands ];
        commands.splice(index, 0, command);
        const commandContainer = { ...state.commandContainerList[command.commandContainerId], commands };
        const commandContainerListItem: CommandContainerListDTO = {
            [command.commandContainerId]: commandContainer
        };
        const commandContainerList = { ...state.commandContainerList, ...commandContainerListItem };

        return {
            commandContainerList
        };
    }),
    on(CommandContainerActions.moveCommandSameContainer, (state, { commandContainerId, previousIndex, currentIndex }) => {
        const commands = [ ...state.commandContainerList[commandContainerId].commands ];
        moveItemInArray(commands, previousIndex, currentIndex);

        const commandContainer = { ...state.commandContainerList[commandContainerId], commands };
        const commandContainerListItem: CommandContainerListDTO = {
            [commandContainerId]: commandContainer
        };
        const commandContainerList = { ...state.commandContainerList, ...commandContainerListItem };

        return {
            commandContainerList
        };
    }),
    on(CommandContainerActions.removeCommandFromCommandContainer, (state, { commandContainerId, commandId }) => {
        const commands = [ ...state.commandContainerList[commandContainerId].commands ];
        const newCommands = commands.filter((item: CommandInterface) => {
            return item.id !== commandId;
        });

        const commandContainer = { ...state.commandContainerList[commandContainerId], ...{ commands: newCommands } };
        const commandContainerListItem: CommandContainerListDTO = {
            [commandContainerId]: commandContainer
        };
        const commandContainerList = { ...state.commandContainerList, ...commandContainerListItem };

        return {
            commandContainerList
        };
    })
);

export function reducer(state: CommandContainerState | undefined, action: Action) {
    return commandContainerReducer(state, action);
}
