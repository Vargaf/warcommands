import { createAction, props } from '@ngrx/store';
import { PageDTO } from 'src/warcommands/commands/domain/page/model/page.dto';

export const addPage = createAction('[Commands panel pages] Add a page', props<{ page: PageDTO }>());
