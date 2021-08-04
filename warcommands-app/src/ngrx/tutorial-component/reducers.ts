import { createReducer, on, Action } from '@ngrx/store';
import * as TutorialComponentActions from './actions';

export const TutorialComponentKey = 'isTutorialOpened';

export interface TutorialState {
    [ TutorialComponentKey ]: boolean;
}

const initialState: TutorialState = {
    [ TutorialComponentKey ]: false,
}

const TutorialReducer = createReducer(
    initialState[TutorialComponentKey],
    on(TutorialComponentActions.openTutorial, state => state = true),
    on(TutorialComponentActions.closeTutorial, state => state = false )
);

export function isTutorialOpenedReducer(state: boolean | undefined, action: Action) {
    return TutorialReducer(state, action);
}