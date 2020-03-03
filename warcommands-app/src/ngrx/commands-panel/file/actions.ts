import { createAction, props } from '@ngrx/store';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';

const actionNamespace = '[Commands panel files]';

export const addFile = createAction(actionNamespace + ' Add a file', props<{ file: FileDTO }>());

export const loadFiles = createAction(actionNamespace + ' Load the files oppened', props<{ fileList: FileDTO[] }>());
