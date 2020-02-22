import { createAction, props } from '@ngrx/store';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';

export const addFile = createAction('[Commands panel files] Add a file', props<{ file: FileDTO }>());
