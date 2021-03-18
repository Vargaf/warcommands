import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as AFrame from 'aframe';
import { CurrentPlayerManagerService } from 'src/warcommands/commands-panel/domain/current-player/current-player-manager-service';
import { CurrentPlayerDTO } from 'src/warcommands/commands-panel/domain/current-player/model/current-player.dto';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { MapType } from 'src/warcommands/gameEngine/domain/maps/model/map-type.enum';
import { DifficultyLevel } from 'src/warcommands/gameEngine/domain/player/model/difficulty-level.enum';
import { VrModeGameEngineService } from 'src/warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service';


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

        const currentPlayer: CurrentPlayerDTO = this.currentPlayerMAnager.initializePlayer();
        this.gameMiddlewareService.setMap(MapType.TutorialSecondMap);
        this.gameMiddlewareService.addPlayer(<string>currentPlayer.id);
        this.gameMiddlewareService.addIAPlayer(DifficultyLevel.Mirror);

        this.gameEngine.waitTillSceneInitializes(this.sceneElement.nativeElement as unknown as AFrame.Scene).then(() => {
            this.gameMiddlewareService.initialize(this.gameEngine);
        });
    }
}