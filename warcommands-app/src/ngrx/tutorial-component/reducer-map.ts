import { InjectionToken } from "@angular/core";
import { ActionReducerMap } from "@ngrx/store";
import * as TutorialComponentReducer from './reducers';


export const TutorialComponentStoreKey = 'tutorial-component';

interface State {
    [TutorialComponentReducer.TutorialComponentKey]: boolean;
}

export const TUTORIAL_COMPONENT_REDUCER_MAP_TOKEN = new InjectionToken<ActionReducerMap<State>>('Tutorial component reducers');

export function reducers(): ActionReducerMap<State> {

    // To work with AOT
    const tutorialStoreKey = TutorialComponentReducer.TutorialComponentKey;

    return {
        [tutorialStoreKey]: TutorialComponentReducer.isTutorialOpenedReducer,
    }
}
