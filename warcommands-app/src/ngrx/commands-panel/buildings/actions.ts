import { createAction, props } from '@ngrx/store';
import { BuildingDTO } from 'src/warcommands/game-middleware/model/building/building.dto';
import { ResourcesDTO } from 'src/warcommands/game-middleware/model/resources/reources.dto';
import { UnitGenericDTO } from 'src/warcommands/game-middleware/model/unit/unit-generic.dto';

const actionNamespace = '[Building list]';

export const addBuilding = createAction(actionNamespace + ' add builidng', props<{ building: BuildingDTO }>());

export const removeBuilding = createAction(actionNamespace + ' remove building', props<{ building: BuildingDTO }>());

export const addUnitToQueue = createAction(actionNamespace + ' add unit to queue', props<{ unit: UnitGenericDTO }>());

export const removeUnitFromQueue = createAction(actionNamespace + ' remove unit from queue', props<{ unit: UnitGenericDTO }>());

export const updateBaseResources = createAction(actionNamespace + ' update base resources', props<{ baseId: string, resources: ResourcesDTO }>());