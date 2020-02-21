import * as BaseReducer from './base/reducers';
import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

export const GameEngineBasicModeStoreKey = 'basic_mode';

interface State {
    [BaseReducer.GameEngineBasicModeBaseStoreKey]: BaseReducer.BaseState;
}

export const BASIC_MODE_REDUCER_MAP_TOKEN = new InjectionToken<ActionReducerMap<State>>('Basic mode reducers');

export function reducers(): ActionReducerMap<State> {
    // To work with AOT
    const baseStoreKey = BaseReducer.GameEngineBasicModeBaseStoreKey;

    return {
        [baseStoreKey]: BaseReducer.reducer,
    };
}
