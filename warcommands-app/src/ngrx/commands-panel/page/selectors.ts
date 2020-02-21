import * as CommandsPagesReducerMap from '../reducer-map';
import { PageStoreKey, PageState } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface PageSelectorState {
    [CommandsPagesReducerMap.CommandsPanelStoreKey]: {
        [PageStoreKey]: PageState;
    };
}

export const pageFeatureSelector =
    createFeatureSelector<PageSelectorState, PageState>(CommandsPagesReducerMap.CommandsPanelStoreKey);

export const pageSelector = createSelector(
    pageFeatureSelector,
    (state: PageState, props) => state.pageList[props.pageId]
);
