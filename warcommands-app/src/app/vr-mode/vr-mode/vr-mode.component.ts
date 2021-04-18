import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleCommandListPanelService } from 'src/warcommands/commands-panel/domain/commands-panel/services/toggle-command-list-panel.service';
import { ToggleCommandsPanelService } from 'src/warcommands/commands-panel/domain/commands-panel/services/toggle-commands-panel.service';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { AFrameStatsService } from 'src/warcommands/vr-mode/infrastructure/aframe/a-frame-stats.service';


@Component({
    selector: 'app-vr-mode',
    templateUrl: './vr-mode.component.html',
    styleUrls: ['./vr-mode.component.scss']
})
export class VrModeComponent implements OnInit, OnDestroy {

    commandPanelVisibleListenerSubscription!: Subscription;

    isCommandsPanelOppened!: boolean;

    isCommandListVisible: boolean = true;

    isGamePaused = true;

    constructor(
        private readonly toggleCommandsPanelService: ToggleCommandsPanelService,
        private readonly aframeStatsPanelService: AFrameStatsService,
        private readonly toggleCommandListPanelService: ToggleCommandListPanelService,
        private readonly gameMiddlewareService: GameMiddlewareService,
    ) { }

    ngOnInit(): void {

        this.commandPanelVisibleListenerSubscription =
            this.toggleCommandsPanelService.commandPanelVisibleListener().subscribe((isCommandsPanelOppened) => {
                this.isCommandsPanelOppened = isCommandsPanelOppened;
            });
    }

    ngOnDestroy() {
        this.commandPanelVisibleListenerSubscription.unsubscribe();
    }

    toggleCommandsPanel(): void {
        this.toggleCommandsPanelService.togglePanel();
    }

    toggleCommandList(): void {
        this.toggleCommandListPanelService.togglePanel();
    }

    toggleStatsPanel(): void {
        this.aframeStatsPanelService.togglePanel();
    }

    onPauseGame(): void {
        this.isGamePaused = true;
        //this.gameMiddlewareService.pauseGame();
    }

    onResumeGame(): void {
        this.isGamePaused = false;
        //this.gameMiddlewareService.resumeGame();
    }
}