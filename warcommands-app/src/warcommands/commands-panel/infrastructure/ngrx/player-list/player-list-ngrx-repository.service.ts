import { Injectable } from '@angular/core';
import * as PlayerListSelectors from 'src/ngrx/commands-panel/player-list/selectors';
import * as PlayerListActions from 'src/ngrx/commands-panel/player-list/actions';
import { Store, select } from '@ngrx/store';
import { CurrentPlayerDTO } from 'src/warcommands/commands-panel/domain/current-player/model/current-player.dto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PlayerListNgrxRepositoryService {

    constructor(
        private readonly store: Store<PlayerListSelectors.PlayerListSelector>
    ) {}

    loadCurrentPlayer(player: CurrentPlayerDTO): void {
        this.store.dispatch(PlayerListActions.loadCurrentPlayer({ player }));
    }

    getCurrentPlayer(): Observable<CurrentPlayerDTO> {
        return this.store.pipe(select(PlayerListSelectors.currentPlayerSelector));
    }

}