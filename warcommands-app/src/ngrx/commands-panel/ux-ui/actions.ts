import { createAction, props } from '@ngrx/store';

const actionNamespace = '[Commands panel UX/UI]';

export const loadWindowsSize = createAction(actionNamespace + ' Set the windows size', props<{ width: number, height: number }>());

export const setCommandListDraggingStatus = createAction(actionNamespace + ' Set if the user is dragging a command', props<{ isDragging: boolean }>());