import { Component, OnInit, ViewChild, AfterContentInit, ElementRef, OnDestroy } from '@angular/core';
import { BasicModeComponentDirective } from './basic-mode.directive';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { MapType } from 'src/warcommands/gameEngine/domain/maps/model/map-type.enum';
import { DifficultyLevel } from 'src/warcommands/gameEngine/domain/player/model/difficulty-level.enum';
import { CurrentPlayerManagerService } from 'src/warcommands/commands-panel/domain/current-player/current-player-manager-service';
import { CurrentPlayerDTO } from 'src/warcommands/commands-panel/domain/current-player/model/current-player.dto';
import { ToggleCommandsPanelService } from 'src/warcommands/commands-panel/domain/commands-panel/services/toggle-commands-panel.service';
import { Subscription } from 'rxjs';
import { BasicModeGameEngineService } from 'src/warcommands/basic-mode/game-engine-basic-mode.service';

@Component({
    selector: 'app-basic-mode',
    templateUrl: './basic-mode.component.html',
    styleUrls: ['./basic-mode.component.scss']
})
export class BasicModeComponent implements OnInit, OnDestroy, AfterContentInit {

    @ViewChild(BasicModeComponentDirective, { static: true })
    public basicModeGraphicsWrapper!: BasicModeComponentDirective;

    isCommandsPanelOppened!: boolean;
    commandPanelVisibleListenerSubscription!: Subscription;

    constructor(
        private readonly gameMiddlewareService: GameMiddlewareService,
        private readonly currentPlayerManager: CurrentPlayerManagerService,
        private readonly toggleCommandsPanelService: ToggleCommandsPanelService,
        private readonly gameEngine: BasicModeGameEngineService
    ) { }

    ngOnInit() {
        const currentPlayer: CurrentPlayerDTO = this.currentPlayerManager.initializePlayer();
        const viewContainerRef = this.basicModeGraphicsWrapper.viewContainerRef;
        this.gameMiddlewareService.setMap(MapType.TutorialFirstMap);
        this.gameMiddlewareService.addPlayer(<string>currentPlayer.id);
        this.gameMiddlewareService.addIAPlayer(DifficultyLevel.Mirror);

        this.gameEngine.setViewContainerRef(viewContainerRef);
        this.gameMiddlewareService.initialize(this.gameEngine);

        this.commandPanelVisibleListenerSubscription = 
            this.toggleCommandsPanelService.commandPanelVisibleListener().subscribe((isCommandsPanelOppened) => {
                this.isCommandsPanelOppened = isCommandsPanelOppened;
            });
    }

    ngOnDestroy() {
        this.commandPanelVisibleListenerSubscription.unsubscribe();
    }

    ngAfterContentInit() {
        
    }

    showCommandsPanel(): void {
        this.toggleCommandsPanelService.showPanel();
    }

}
