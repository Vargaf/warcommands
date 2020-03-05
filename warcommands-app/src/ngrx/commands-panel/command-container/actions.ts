import { createAction, props } from '@ngrx/store';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';

const actionNamespace = '[Commands panel command container]';

export const addCommandContainer =
    createAction(actionNamespace + ' Add a command container', props<{ commandContainer: CommandContainerDTO }>());

export const addCommandToCommandContainer =
    createAction(actionNamespace +
        '[Commands panel command container] Add a command to a command container',
        props<{ command: GenericCommandDTO, index: number }>());
