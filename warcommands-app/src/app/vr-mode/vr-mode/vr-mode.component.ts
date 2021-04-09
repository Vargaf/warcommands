import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Scene } from 'aframe';
import { CurrentPlayerManagerService } from 'src/warcommands/commands-panel/domain/current-player/current-player-manager-service';
import { CurrentPlayerDTO as MiddlewareCurrentPlayerDTO } from 'src/warcommands/commands-panel/domain/current-player/model/current-player.dto';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { MapType } from 'src/warcommands/gameEngine/domain/maps/model/map-type.enum';
import { DifficultyLevel } from 'src/warcommands/gameEngine/domain/player/model/difficulty-level.enum';
import { VrModeGameEngineService } from 'src/warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service';
import { PlayerDTO } from 'src/warcommands/vr-mode/domain/players/model/player.dto';


@Component({
    selector: 'app-vr-mode',
    templateUrl: './vr-mode.component.html',
    styleUrls: ['./vr-mode.component.scss']
})
export class VrModeComponent implements OnInit {

    @ViewChild('sceneElement', { static: true })
    private sceneElement!: ElementRef<HTMLDivElement>;

    constructor(
        private readonly gameMiddlewareService: GameMiddlewareService,
        private readonly currentPlayerMAnager: CurrentPlayerManagerService,
        private readonly gameEngine: VrModeGameEngineService,
    ) { }

    ngOnInit(): void {

        const middlewareCurrentPlayer: MiddlewareCurrentPlayerDTO = this.currentPlayerMAnager.initializePlayer();
        this.gameMiddlewareService.setMap(MapType.TutorialSecondMap);
        this.gameMiddlewareService.addPlayer(<string>middlewareCurrentPlayer.id);
        this.gameMiddlewareService.addIAPlayer(DifficultyLevel.Mirror);

        this.gameEngine.waitTillSceneInitializes(this.sceneElement.nativeElement as unknown as Scene).then(() => {
            this.gameMiddlewareService.initialize(this.gameEngine);
            
            const currentPlayer: PlayerDTO = {
                id: middlewareCurrentPlayer.id,
                isCurrentPlayer: true
            }
            this.gameEngine.setCurrentPlayer(currentPlayer);
        });
    }
}