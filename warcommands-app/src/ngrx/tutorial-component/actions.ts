import { createAction, props } from '@ngrx/store';

const actionNamespace = '[Game Tutorial]';

export const openTutorial = createAction(actionNamespace + ' Open the tutorial');

export const closeTutorial = createAction(actionNamespace + ' Close the tutorial');