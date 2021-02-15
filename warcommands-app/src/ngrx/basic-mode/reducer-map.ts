import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import * as BuildingListReducer from './buildings/reducers';
import * as RequestAnimationFrameReducer from './requestAnimationFrame/reducers';
import * as UnitListReducer from './units/reducers';

export const GameEngineBasicModeStoreKey = 'basic_mode';

interface State {
    [BuildingListReducer.BuildingListStoreKey]: BuildingListReducer.BuildingListState;
    [RequestAnimationFrameReducer.RequestAnimationFrameKey]: RequestAnimationFrameReducer.State;
    [UnitListReducer.UnitListStoreKey]: UnitListReducer.UnitListState;
}

export const BASIC_MODE_REDUCER_MAP_TOKEN = new InjectionToken<ActionReducerMap<State>>('Basic mode reducers');

export function reducers(): ActionReducerMap<State> {
    // To work with AOT
    const buildingListStoreKey = BuildingListReducer.BuildingListStoreKey;
    const requestAnimationFrameKey = RequestAnimationFrameReducer.RequestAnimationFrameKey;
    const unitListStoreKey = UnitListReducer.UnitListStoreKey;

    return {
        [buildingListStoreKey]: BuildingListReducer.reducer,
        [requestAnimationFrameKey]: RequestAnimationFrameReducer.reducer,
        [unitListStoreKey]: UnitListReducer.reducer,
    };
}
