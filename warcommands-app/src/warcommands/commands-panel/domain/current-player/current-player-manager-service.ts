import { Injectable } from "@angular/core";
import { CurrentPlayerRepositoryService } from './services/current-player-repository.service';
import { PlayerListNgrxRepositoryService } from '../../infrastructure/ngrx/player-list/player-list-ngrx-repository.service';
import { CurrentPlayerDTO } from './model/current-player.dto';
import { v4 as uuid } from 'uuid';


@Injectable({
    providedIn: 'root'
})
export class CurrentPlayerManagerService {

    constructor(
        private readonly currentPlayerRepository: CurrentPlayerRepositoryService,
        private readonly playerListNgrxRepositoryService: PlayerListNgrxRepositoryService,
    ) {}

    initializePlayer(): CurrentPlayerDTO {
        let player: CurrentPlayerDTO;

        player = this.currentPlayerRepository.getPlayer();

        if (player === null) {
            player = {
                id: uuid()
            };

            this.currentPlayerRepository.save(player);
        }

        this.playerListNgrxRepositoryService.loadCurrentPlayer(player);

        return player;
    }

    getCurrentPlayer(): CurrentPlayerDTO {
        return this.currentPlayerRepository.getPlayer();
    }

}