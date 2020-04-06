import { Component, OnInit } from '@angular/core';
import { CurrentPlayerRepositoryService } from 'src/warcommands/commands-panel/domain/current-player/services/current-player-repository.service';
import { CurrentPlayerDTO } from 'src/warcommands/commands-panel/domain/current-player/model/current-player.dto';
import { v4 as uuid } from 'uuid';
import { PlayerListNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/player-list/player-list-ngrx-repository.service';

@Component({
    selector: 'app-commands-panel',
    templateUrl: './commands-panel.component.html',
    styleUrls: ['./commands-panel.component.scss']
})
export class CommandsPanelComponent implements OnInit {

    constructor(
        private readonly currentPlayerRepository: CurrentPlayerRepositoryService,
        private readonly playerListNgrxRepositoryService: PlayerListNgrxRepositoryService,
    ) { }

    ngOnInit() {

        let player: CurrentPlayerDTO;

        player = this.currentPlayerRepository.getPlayer();

        if (player === null) {
            player = {
                id: uuid()
            };

            this.currentPlayerRepository.save(player);
        }

        this.playerListNgrxRepositoryService.loadCurrentPlayer(player);
    }

}
