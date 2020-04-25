import { createAction, props } from '@ngrx/store';
import { UnitGenericDTO } from 'src/warcommands/basic-mode/domain/units/unit-generic.dto';

const actionNamespace = '[Units list]';

export const addUnit = createAction(actionNamespace + ' add unit', props<{ unit: UnitGenericDTO }>());

export const removeUnit = createAction(actionNamespace + ' remove unit', props<{ unit: UnitGenericDTO }>()); 