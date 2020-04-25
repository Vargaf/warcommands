import { createReducer, on, Action } from '@ngrx/store';
import * as BuildingListActions from './actions';
import * as _ from 'lodash';
import { BuildingDTO } from 'src/warcommands/basic-mode/domain/building/model/building.dto';

export const BuildingListStoreKey = 'buildings';

export interface BuildingListState {
    list: { [index: string]: BuildingDTO };
}

const initialState: BuildingListState = {
    list: {}
};

const buildingListReducer = createReducer(
    initialState,
    on(BuildingListActions.addBuilding, (state, { building }) => {
        return {
            list: { ...(_.cloneDeep(state.list)), ...{ [building.id]: _.cloneDeep(building) }}
        }
    }),
    on(BuildingListActions.removeBuilding, (state, { building }) => {
        delete state.list[building.id]
        return {
            list: state.list
        }
    })
);

export function reducer(state: BuildingListState | undefined, action: Action) {
    return buildingListReducer(state, action);
}