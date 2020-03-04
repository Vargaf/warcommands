import { createAction, props } from '@ngrx/store';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';

const actionNamespace = '[Commands panel files]';

export const loadFile = createAction(actionNamespace + ' Load a file', props<{ file: FileDTO }>());
