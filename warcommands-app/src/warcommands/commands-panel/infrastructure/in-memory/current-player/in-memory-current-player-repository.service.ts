import { Injectable } from '@angular/core';
import { CurrentPlayerRepositoryService } from 'src/warcommands/commands-panel/domain/current-player/services/current-player-repository.service';
import { CurrentPlayerDTO } from 'src/warcommands/commands-panel/domain/current-player/model/current-player.dto';

@Injectable({
    providedIn: 'root'
})
export class InMemoryCurrentPlayerRepositoryService implements CurrentPlayerRepositoryService {

    private readonly currentPlayerKey = 'currentPlayer';

    save(player: CurrentPlayerDTO): void {
        localStorage.setItem(this.currentPlayerKey, JSON.stringify(player));
    }
    getPlayer(): CurrentPlayerDTO {
        return JSON.parse(<string>localStorage.getItem(this.currentPlayerKey)) || null;
    }
}