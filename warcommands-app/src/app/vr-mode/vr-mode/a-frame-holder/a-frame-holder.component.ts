import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrentPlayerManagerService } from 'src/warcommands/commands-panel/domain/current-player/current-player-manager-service';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { VrModeGameEngineService } from 'src/warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service';
import { CurrentPlayerDTO as MiddlewareCurrentPlayerDTO } from 'src/warcommands/commands-panel/domain/current-player/model/current-player.dto';
import { MapType } from 'src/warcommands/gameEngine/domain/maps/model/map-type.enum';
import { DifficultyLevel } from 'src/warcommands/gameEngine/domain/player/model/difficulty-level.enum';
import { Scene } from 'aframe';
import { PlayerDTO } from 'src/warcommands/vr-mode/domain/players/model/player.dto';
import { PlayerRepositoryService } from 'src/warcommands/vr-mode/domain/players/services/player-repository.service';

@Component({
    selector: 'app-a-frame-holder',
    templateUrl: './a-frame-holder.component.html',
    styleUrls: ['./a-frame-holder.component.scss']
})
export class AFrameHolderComponent implements OnInit {

    @ViewChild('sceneElement', { static: true })
    private sceneElement!: ElementRef<HTMLDivElement>;

    constructor(
        private readonly gameMiddlewareService: GameMiddlewareService,
        private readonly currentPlayerMAnager: CurrentPlayerManagerService,
        private readonly gameEngine: VrModeGameEngineService,
        private readonly playerRepository: PlayerRepositoryService,
    ) { }

    ngOnInit(): void {

        const middlewareCurrentPlayer: MiddlewareCurrentPlayerDTO = this.currentPlayerMAnager.initializePlayer();
        const currentPlayer: PlayerDTO = {
            id: middlewareCurrentPlayer.id,
            isCurrentPlayer: true
        }
        this.playerRepository.save(currentPlayer);

        this.gameMiddlewareService.setMap(MapType.TutorialSecondMap);
        this.gameMiddlewareService.addPlayer(<string>middlewareCurrentPlayer.id);
        this.gameMiddlewareService.addIAPlayer(DifficultyLevel.Mirror);

        this.gameEngine.waitTillSceneIsLoaded(this.sceneElement.nativeElement as unknown as Scene).then(() => {
            this.gameMiddlewareService.initialize(this.gameEngine);
        }).then(() => {
            // Since the chosen graphic engine starts automatically we need to pause it once its loaded
            this.gameEngine.pauseGame();
        });
    }
}
