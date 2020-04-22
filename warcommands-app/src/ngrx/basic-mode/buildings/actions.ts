import { createAction, props } from '@ngrx/store';
import { BuildingDTO } from 'src/warcommands/basic-mode/domain/building/model/building.dto';

const actionNamespace = '[Building list]';

export const addBuilding = createAction(actionNamespace + ' add builidng', props<{ building: BuildingDTO }>());

export const removeBuilding = createAction(actionNamespace + ' remove building', props<{ building: BuildingDTO }>());