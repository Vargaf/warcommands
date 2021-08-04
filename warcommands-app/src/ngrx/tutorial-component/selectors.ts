import * as TutorialComponentReducerMap from './reducer-map';
import { TutorialState, TutorialComponentKey } from './reducers'
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface TutorialStore {
    [TutorialComponentKey]: TutorialState;
}

export interface TutorialFeatureState {
    [TutorialComponentReducerMap.TutorialComponentStoreKey]: TutorialStore;
}

const tutorialComponentFeatureSelector =
    createFeatureSelector<TutorialFeatureState, TutorialStore>(TutorialComponentReducerMap.TutorialComponentStoreKey);

const tutorialFeatureSelector = createSelector(
    tutorialComponentFeatureSelector,
    (state) => state[TutorialComponentKey]
);

export const isTutorialOpenedSelector = createSelector(
    tutorialFeatureSelector,
    (state: TutorialState) => state.isTutorialOpened
);