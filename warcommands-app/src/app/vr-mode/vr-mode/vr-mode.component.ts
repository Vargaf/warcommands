import { ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleCommandListPanelService } from 'src/warcommands/commands-panel/domain/commands-panel/services/toggle-command-list-panel.service';
import { ToggleCommandsPanelService } from 'src/warcommands/commands-panel/domain/commands-panel/services/toggle-commands-panel.service';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { GameLogicClockService } from 'src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service';
import { AFrameStatsService } from 'src/warcommands/vr-mode/infrastructure/aframe/a-frame-stats.service';
import { AframeSceneService } from 'src/warcommands/vr-mode/infrastructure/aframe/aframe-scene.service';
import { TutorialComponentService } from 'src/warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component.service';
import { TutorialComponentToggleServiceInterface } from "src/warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component-toggle-service.interface";

@Component({
    selector: 'app-vr-mode',
    templateUrl: './vr-mode.component.html',
    styleUrls: ['./vr-mode.component.scss']
})
export class VrModeComponent implements OnInit, OnDestroy {

    @ViewChild('TutorialButtonElement', { static: true })
    tutorialButtonElement!: ElementRef<HTMLElement>;

    isCommandsPanelOppened!: boolean;

    isCommandListVisible: boolean = true;

    isGamePaused = true;

    isGameLoaded = false;

    gameSpeed = 1;

    private subscriptionManager: Subscription = new Subscription();

    constructor(
        private readonly toggleCommandsPanelService: ToggleCommandsPanelService,
        private readonly aframeStatsPanelService: AFrameStatsService,
        private readonly toggleCommandListPanelService: ToggleCommandListPanelService,
        private readonly gameMiddlewareService: GameMiddlewareService,
        private readonly afameSceneService: AframeSceneService,
        private readonly gameLogicClockService: GameLogicClockService,
        private readonly tutorialComponentService: TutorialComponentService,
        private tutorialComponentToggleService: TutorialComponentToggleServiceInterface
    ) { }

    ngOnInit(): void {

        const commandPanelVisibleListenerSubscription =
            this.toggleCommandsPanelService.commandPanelVisibleListener().subscribe((isCommandsPanelOppened) => {
                this.isCommandsPanelOppened = isCommandsPanelOppened;
            });
        this.subscriptionManager.add(commandPanelVisibleListenerSubscription);

        const gameSpeedSubscription = this.gameLogicClockService.currentSpeedObservable().subscribe((speed) => {
            this.gameSpeed = speed;
        });
        this.subscriptionManager.add(gameSpeedSubscription);

        this.afameSceneService.isLoaded().then((isLoaded: boolean) => {
            this.isGameLoaded = isLoaded;
        });

        const openTutorialSubscription = this.tutorialComponentToggleService.openListener().subscribe(() => {
            this.tutorialComponentService.setTutorialPanelRelatedElement(this.tutorialButtonElement);
        });
        this.subscriptionManager.add(openTutorialSubscription);
    }

    ngOnDestroy() {
        this.subscriptionManager.unsubscribe();
    }

    // Listen on keydown events on a document level
    @HostListener('document:keydown', ['$event'])
    private handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.tutorialComponentToggleService.close();
        }
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
        this.gameMiddlewareService.pauseGame();
    }

    onResumeGame(): void {
        this.isGamePaused = false;
        this.gameMiddlewareService.resumeGame();
    }

    speedUp(): void {
        this.gameMiddlewareService.speedUp();
    }

    slowDown(): void {
        this.gameMiddlewareService.slowDown();
    }

    openTutorial(): void {
        this.tutorialComponentToggleService.open();
    }
}
