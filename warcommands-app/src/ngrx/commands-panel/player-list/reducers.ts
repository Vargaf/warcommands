import { CurrentPlayerDTO } from 'src/warcommands/commands-panel/domain/current-player/model/current-player.dto';
import { createReducer, on, Action } from '@ngrx/store';
import * as PlayerListActions from './actions';

export const PlayerListStoreKey = 'players';

export interface PlayerListState {
    currentPlayer: CurrentPlayerDTO;
}

const initialState: PlayerListState = {
    currentPlayer: {
        id: null
    }
}

const playerListReducer = createReducer(
    initialState,
    on(PlayerListActions.loadCurrentPlayer, (state, { player }) => {
        return {
            currentPlayer: { ...player }
        }
    })
);

export function reducer(state: PlayerListState | undefined, action: Action) {
    return playerListReducer(state, action);
}