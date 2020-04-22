import * as BaseReducer from './base/reducers';
import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import * as BuildingListReducer from './buildings/reducers';
import * as RequestAnimationFrameReducer from './requestAnimationFrame/reducers';

export const GameEngineBasicModeStoreKey = 'basic_mode';

interface State {
    [BaseReducer.GameEngineBasicModeBaseStoreKey]: BaseReducer.BaseState;
    [BuildingListReducer.BuildingListStoreKey]: BuildingListReducer.BuildingListState;
    [RequestAnimationFrameReducer.RequestAnimationFrameKey]: RequestAnimationFrameReducer.State;
}

export const BASIC_MODE_REDUCER_MAP_TOKEN = new InjectionToken<ActionReducerMap<State>>('Basic mode reducers');

export function reducers(): ActionReducerMap<State> {
    // To work with AOT
    const baseStoreKey = BaseReducer.GameEngineBasicModeBaseStoreKey;
    const buildingListStoreKey = BuildingListReducer.BuildingListStoreKey;
    const requestAnimationFrameKey = RequestAnimationFrameReducer.RequestAnimationFrameKey;

    return {
        [baseStoreKey]: BaseReducer.reducer,
        [buildingListStoreKey]: BuildingListReducer.reducer,
        [requestAnimationFrameKey]: RequestAnimationFrameReducer.reducer
    };
}
