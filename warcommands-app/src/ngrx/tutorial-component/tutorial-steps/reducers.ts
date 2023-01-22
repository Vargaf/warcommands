import { Action, createReducer, on } from "@ngrx/store";
import * as TutorialStepActions from './actions';
import { TutorialTransformer } from "../../../app/tutorial/services/tutorial-transformer";

export const TutorialStepsStoreKey = 'tutorialSteps';

export interface TutorialStep {
    stepName: string;
    isAlreadyVisited: boolean;
}

export interface Tutorial {
    [tutorialName: string] : Array<TutorialStep>;
}

export interface TutorialStepsState {
    tutorialPath: Tutorial;
}

const initialState: TutorialStepsState = {
    tutorialPath: {},
};

const tutorialStepsReducer = createReducer(
    initialState,
    on(
        TutorialStepActions.addTutorial, (state, { tutorial }) => {
            let tutorialObject = TutorialTransformer.transformToNgrx(tutorial);
            return {
                tutorialPath: {
                    ...state.tutorialPath,
                    ...tutorialObject
                }
            };
        }
    ),
    on(
        TutorialStepActions.stepVisited, (state, { tutorial }) => {
            let tutorialObject = TutorialTransformer.transformToNgrx(tutorial);
            return {
                tutorialPath: {
                    ...state.tutorialPath,
                    ...tutorialObject
                }
            };
        }),
);

export function reducer( state: TutorialStepsState | undefined, action: Action) {
    return tutorialStepsReducer(state, action);
}
