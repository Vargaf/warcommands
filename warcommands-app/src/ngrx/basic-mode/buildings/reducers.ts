import { createReducer, on, Action } from '@ngrx/store';
import * as BuildingListActions from './actions';
import * as _ from 'lodash';
import { BuildingDTO, SpawnerBuildingDTO } from 'src/warcommands/basic-mode/domain/building/model/building.dto';

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
    }),
    on(BuildingListActions.addUnitToQueue, (state, { unit }) => {
        const building: SpawnerBuildingDTO = (state.list[unit.spawnerBuildingId] as SpawnerBuildingDTO);
        const cloneBuilding = _.cloneDeep(building);
        cloneBuilding.queueList.push(unit);
        const cloneStateList = _.cloneDeep(state.list);
        cloneStateList[unit.spawnerBuildingId] = cloneBuilding;

        return {
            list: cloneStateList
        }
    }),
    on(BuildingListActions.removeUnitFromQueue, (state, { unit }) => {
        const building: SpawnerBuildingDTO = (state.list[unit.spawnerBuildingId] as SpawnerBuildingDTO);
        const cloneBuilding = _.cloneDeep(building);
        
        const unitIndex = cloneBuilding.queueList.findIndex((queuedUnit) => {
            return queuedUnit.id === unit.id;
        });
        cloneBuilding.queueList.splice(unitIndex, 1);

        const cloneStateList = _.cloneDeep(state.list);
        cloneStateList[unit.spawnerBuildingId] = cloneBuilding;

        return {
            list: cloneStateList
        }
    })
);

export function reducer(state: BuildingListState | undefined, action: Action) {
    return buildingListReducer(state, action);
}