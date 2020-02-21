import * as PageActions from './actions';
import { PageDTO } from 'src/warcommands/commands/domain/page/model/page.dto';
import { createReducer, on, Action } from '@ngrx/store';

export const PageStoreKey = 'page';

export interface PageState {
    pageList: PageDTO[];
}

const initialState: PageState = {
    pageList: []
};

const pageReducer = createReducer(
    initialState,
    on(PageActions.addPage, (state, { page }) => {
        return {
            pageList: [ ...state.pageList, page ]
        };
    })
);

export function reducer(state: PageState | undefined, action: Action) {
    return pageReducer(state, action);
}
