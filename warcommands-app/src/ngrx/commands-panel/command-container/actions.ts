import { createAction, props } from '@ngrx/store';
import { CommandContainerDTO } from 'src/warcommands/commands/domain/command-container/model/command-container.dto';
import { CommandInterface } from 'src/warcommands/commands/domain/command/model/command.interface';

export const addCommandContainer =
    createAction('[Commands panel command container] Add a command container', props<{ commandContainer: CommandContainerDTO }>());

export const addCommandToCommandContainer =
    createAction(
        '[Commands panel command container] Add a command to a command container',
        props<{ command: CommandInterface, index: number }>());

export const moveCommandSameContainer =
    createAction('[Commands panel command container] Move a command on the same command container',
    props<{ commandContainerId: string, previousIndex: number, currentIndex: number }>());

export const removeCommandFromCommandContainer =
    createAction('[Commands panel command container] Remove a command from a command container',
    props<{ commandContainerId: string, commandId: string }>());
