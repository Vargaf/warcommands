import * as TutorialComponentReducerMap from '../reducer-map';
import { TutorialStepsStoreKey, TutorialStepsState } from './reducers';
import { createFeatureSelector, createSelector } from "@ngrx/store";

interface TutorialStepsStore {
    [TutorialStepsStoreKey]: TutorialStepsState;
}

export interface TutorialStepsFeatureState {
    [TutorialComponentReducerMap.TutorialComponentStoreKey]: TutorialStepsStore;
}

export const tutorialComponentFeatureSelector =
    createFeatureSelector<TutorialStepsStore>(TutorialComponentReducerMap.TutorialComponentStoreKey);

const tutorialStepsFeatureSelector = createSelector(
    tutorialComponentFeatureSelector,
    (state) => state[TutorialStepsStoreKey]
);
export const tutorialSelector =
    (tutorialName: string) => createSelector( tutorialStepsFeatureSelector, (state: TutorialStepsState) => {
        return state.tutorialPath[tutorialName];
});
