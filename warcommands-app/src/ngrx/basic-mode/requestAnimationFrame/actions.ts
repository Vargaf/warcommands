import { createAction, props } from '@ngrx/store';

export const updateFrame = createAction('[Game engine basic mode] Update the request animation frame id', props<{ frameId: number }>());
