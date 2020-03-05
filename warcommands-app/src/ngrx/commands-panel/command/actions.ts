import { createAction, props } from '@ngrx/store';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';

const actionNamespace = '[Commands panel commands]';

export const addCommand = createAction(actionNamespace + ' Add a command', props<{ command: GenericCommandDTO }>());
