import * as BaseActions from './actions';
import { BaseListInterface } from 'src/warcommands/basic-mode/domain/base/base-list-interface';
import { createReducer, on, Action } from '@ngrx/store';

export const GameEngineBasicModeBaseStoreKey = 'base';

export interface BaseState {
    baseList: BaseListInterface;
}

const initialState: BaseState = {
    baseList: []
};

const baseReducer = createReducer(
    initialState,
    on(BaseActions.baseCreated, (state, { base }) => {
        const baseList = { ...state.baseList };
        baseList[ base.id ] = base;
        return {
            ...state,
            baseList
        };
    })
);

export function reducer(state: BaseState | undefined, action: Action) {
    return baseReducer(state, action);
}
