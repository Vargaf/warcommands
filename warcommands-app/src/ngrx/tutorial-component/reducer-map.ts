import { InjectionToken } from "@angular/core";
import { ActionReducerMap } from "@ngrx/store";
import * as TutorialToggleComponentReducer from './tutorial-toggle/reducers';
import * as TutorialStepsImprovedReducer from './tutorial-steps/reducers';


export const TutorialComponentStoreKey = 'tutorial-component';

interface State {
    [TutorialToggleComponentReducer.TutorialComponentKey]: boolean;
    [TutorialStepsImprovedReducer.TutorialStepsStoreKey]: TutorialStepsImprovedReducer.TutorialStepsState;
}

export const TUTORIAL_COMPONENT_REDUCER_MAP_TOKEN = new InjectionToken<ActionReducerMap<State>>('Tutorial component reducers');

export function reducers(): ActionReducerMap<State> {

    // To work with AOT
    const tutorialStoreKey = TutorialToggleComponentReducer.TutorialComponentKey;
    const tutorialStepsImprovedStoreKey = TutorialStepsImprovedReducer.TutorialStepsStoreKey;

    return {
        [tutorialStoreKey]: TutorialToggleComponentReducer.isTutorialOpenedReducer,
        [tutorialStepsImprovedStoreKey]: TutorialStepsImprovedReducer.reducer,
    }
}
