import { createAction, props } from '@ngrx/store';
import { BaseEntityInterface } from 'src/warcommands/basic-mode/domain/building/base/base-entity-interface';

export const baseCreated = createAction('[Game engine Basic mode BASE] Base created', props<{ base: BaseEntityInterface }>());
