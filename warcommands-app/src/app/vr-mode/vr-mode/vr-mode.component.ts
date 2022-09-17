import { ElementRef, HostListener, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
    ToggleCommandListPanelService
} from 'src/warcommands/commands-panel/domain/commands-panel/services/toggle-command-list-panel.service';
import {
    ToggleCommandsPanelService
} from 'src/warcommands/commands-panel/domain/commands-panel/services/toggle-commands-panel.service';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { GameLogicClockService } from 'src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service';
import { AFrameStatsService } from 'src/warcommands/vr-mode/infrastructure/aframe/a-frame-stats.service';
import { AframeSceneService } from 'src/warcommands/vr-mode/infrastructure/aframe/aframe-scene.service';
import {
    TutorialComponentToggleServiceInterface
} from "src/warcommands/tutorial/domain/tutorial/services/tutorial-component-toggle-service.interface";
import {
    GameTutorialService
} from "../../../warcommands/tutorial/domain/tutorial/services/game-tutorial.service";
import { EventBusInterface } from "../../../warcommands/shared/domain/event-bus/event-bus-interface";
import {
    TutorialEventTypes
} from "../../../warcommands/tutorial/domain/tutorial/events/tutorial-event-types.enum";
import {ModalPanelService} from "../../modal-panel/modal-panel.service";
import {IntroductionComponent} from "../../tutorial/introduction/introduction.component";

@Component( {
    selector: 'app-vr-mode',
    templateUrl: './vr-mode.component.html',
    styleUrls: [ './vr-mode.component.scss' ]
} )
export class VrModeComponent implements OnInit, OnDestroy {

    @ViewChild( 'TutorialButtonElement', { static: true } )
    tutorialButtonElement!: ElementRef<HTMLElement>;

    isCommandsPanelOpened!: boolean;

    isGamePaused = true;

    isGameLoaded = false;

    gameSpeed = 1;

    private subscriptionManager: Subscription = new Subscription();

    constructor(
        private toggleCommandsPanelService: ToggleCommandsPanelService,
        private aframeStatsPanelService: AFrameStatsService,
        private toggleCommandListPanelService: ToggleCommandListPanelService,
        private gameMiddlewareService: GameMiddlewareService,
        private aframeSceneService: AframeSceneService,
        private gameLogicClockService: GameLogicClockService,
        private tutorialComponentToggleService: TutorialComponentToggleServiceInterface,
        private gameTutorialService: GameTutorialService,
        //private tutorialComponentService: TutorialComponentService,
        @Inject('EventBusInterface') private eventBus: EventBusInterface,
        private modalPanelService: ModalPanelService
    ) {
    }

    ngOnInit(): void {

        const commandPanelVisibleListenerSubscription =
            this.toggleCommandsPanelService.commandPanelVisibleListener().subscribe( ( isCommandsPanelOppened ) => {
                this.isCommandsPanelOpened = isCommandsPanelOppened;
            } );
        this.subscriptionManager.add( commandPanelVisibleListenerSubscription );

        const gameSpeedSubscription = this.gameLogicClockService.currentSpeedObservable().subscribe( ( speed ) => {
            this.gameSpeed = speed;
        } );
        this.subscriptionManager.add( gameSpeedSubscription );

        this.aframeSceneService.isLoaded().then( ( isLoaded: boolean ) => {
            this.isGameLoaded = isLoaded;
            if( isLoaded && !this.gameTutorialService.isWelcomeStepFinished() ) {
                this.gameTutorialService.openWelcomeStep();
            }
        } );

        this.registerTutorialWelcomePageOpenedEvent();
    }

    ngOnDestroy() {
        this.subscriptionManager.unsubscribe();
    }

    // Listen on keydown events on a document level
    @HostListener( 'document:keydown', [ '$event' ] )
    private handleKeydown( event: KeyboardEvent ) {
        if( event.key === 'Escape' ) {
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
        this.modalPanelService.create(IntroductionComponent);
    }

    registerTutorialWelcomePageOpenedEvent(): void {
        this.eventBus.on(TutorialEventTypes.TutorialWelcomePageOpened, () => { this.setTutorialButtonAsPanelRelatedElement() });
    }

    setTutorialButtonAsPanelRelatedElement(): void {
        this.modalPanelService.attachToElement(this.tutorialButtonElement);
    }
}
