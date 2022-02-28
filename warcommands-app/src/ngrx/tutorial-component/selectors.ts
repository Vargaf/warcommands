import * as TutorialComponentReducerMap from './reducer-map';
import { TutorialComponentKey } from './reducers'
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface TutorialStore {
    [TutorialComponentKey]: boolean;
}

export interface TutorialFeatureState {
    [TutorialComponentReducerMap.TutorialComponentStoreKey]: TutorialStore;
}

const tutorialComponentFeatureSelector =
    createFeatureSelector<TutorialStore>(TutorialComponentReducerMap.TutorialComponentStoreKey);

export const isTutorialOpenedSelector = createSelector(
    tutorialComponentFeatureSelector,
    (state) => state[TutorialComponentKey]
);
