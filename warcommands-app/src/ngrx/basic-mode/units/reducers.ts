import { createReducer, on, Action } from '@ngrx/store';
import * as UnitListActions from './actions';
import * as _ from 'lodash';
import { UnitGenericDTO } from 'src/warcommands/basic-mode/domain/units/unit-generic.dto';

export const UnitListStoreKey = 'units';

export interface UnitListState {
    list: { [index: string]: UnitGenericDTO };
}

const initialState: UnitListState = {
    list: {}
};

const unitListReducer = createReducer(
    initialState,
    on(UnitListActions.addUnit, (state, { unit }) => {
        return {
            list: { ...state.list, ...{ [unit.id]: _.cloneDeep(unit) } }
        }
    }),
    on(UnitListActions.removeUnit, (state, { unit }) => {
        delete state.list[unit.id];
        return {
            list: state.list
        }
    })
);

export function reducer(state: UnitListState | undefined, action: Action) {
    return unitListReducer(state, action);
}