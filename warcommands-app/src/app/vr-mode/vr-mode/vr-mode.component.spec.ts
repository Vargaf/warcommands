import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {VrModeComponent} from './vr-mode.component';
import {AFrameStatsService} from "../../../warcommands/vr-mode/infrastructure/aframe/a-frame-stats.service";
import {GameMiddlewareService} from "../../../warcommands/game-middleware/game-middleware.service";
import {AframeSceneService} from "../../../warcommands/vr-mode/infrastructure/aframe/aframe-scene.service";
import {GameLogicClockService} from "../../../warcommands/vr-mode/domain/game-engine/game-logic-clock.service";
import {
    TutorialComponentToggleServiceInterface
} from "../../../warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component-toggle-service.interface";
import {
    GameTutorialService
} from "../../../warcommands/tutorial-component/domain/tutorial-component/services/game-tutorial.service";
import {
    TutorialComponentService
} from "../../../warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component.service";
import {of} from "rxjs";
import {AFrameHolderComponent} from "./a-frame-holder/a-frame-holder.component";
import {
    CurrentPlayerManagerService
} from "../../../warcommands/commands-panel/domain/current-player/current-player-manager-service";
import {VrModeGameEngineService} from "../../../warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service";
import {PlayerRepositoryService} from "../../../warcommands/vr-mode/domain/players/services/player-repository.service";
import {MatIconModule} from "@angular/material/icon";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PlayerDTO} from "../../../warcommands/vr-mode/domain/players/model/player.dto";

describe('VrModeComponent', () => {
    let component: VrModeComponent;
    let fixture: ComponentFixture<VrModeComponent>;

    let aFrameStatsServiceSpy;
    let gameMiddlewareServiceSpy;
    let aframeSceneServiceSpy;
    let gameLogicClockServiceSpy;
    let tutorialComponentToggleServiceInterfaceSpy;
    let gameTutorialServiceSpy;
    let tutorialComponentServiceSpy;
    let currentPlayerManagerServiceSpy;
    let vrModeGameEngineServiceSpy;
    let playerRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {
        aFrameStatsServiceSpy = jasmine.createSpyObj('AFrameStatsService', ['togglePanel']);
        gameMiddlewareServiceSpy = jasmine.createSpyObj('GameMiddlewareService', ['pauseGame', 'resumeGame', 'speedUp', 'slowDown', 'setMap', 'addPlayer', 'addIAPlayer', 'initialize']);

        aframeSceneServiceSpy = jasmine.createSpyObj('AframeSceneService', ['isLoaded']);
        const aFrameIsLoaded = false;
        aframeSceneServiceSpy.isLoaded.and.returnValue(Promise.resolve(aFrameIsLoaded));

        gameLogicClockServiceSpy = jasmine.createSpyObj('GameLogicClockService', ['currentSpeedObservable']);
        const speed = 12345;
        gameLogicClockServiceSpy.currentSpeedObservable.and.returnValue(of(speed));
        tutorialComponentToggleServiceInterfaceSpy = jasmine.createSpyObj('TutorialComponentToggleServiceInterface', ['close', 'open']);
        gameTutorialServiceSpy = jasmine.createSpyObj('GameTutorialService', ['start']);
        tutorialComponentServiceSpy = jasmine.createSpyObj('TutorialComponentService', ['setTutorialPanelRelatedElement']);
        currentPlayerManagerServiceSpy = jasmine.createSpyObj('CurrentPlayerManagerService', ['initializePlayer']);
        const playerMock: PlayerDTO = {id: '', isCurrentPlayer: true};
        currentPlayerManagerServiceSpy.initializePlayer.and.returnValue(playerMock);
        vrModeGameEngineServiceSpy = jasmine.createSpyObj('VrModeGameEngineService', ['waitTillSceneIsLoaded', 'pauseGame']);
        vrModeGameEngineServiceSpy.waitTillSceneIsLoaded.and.returnValue(Promise.resolve(null));
        playerRepositoryServiceSpy = jasmine.createSpyObj('PlayerRepositoryService', ['save']);
        TestBed.configureTestingModule({
            declarations: [VrModeComponent, AFrameHolderComponent],
            imports: [
                MatIconModule,
                FlexLayoutModule,
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [
                {provide: AFrameStatsService, useValue: aFrameStatsServiceSpy},
                {provide: GameMiddlewareService, useValue: gameMiddlewareServiceSpy},
                {provide: AframeSceneService, useValue: aframeSceneServiceSpy},
                {provide: GameLogicClockService, useValue: gameLogicClockServiceSpy},
                {provide: TutorialComponentToggleServiceInterface, useValue: tutorialComponentToggleServiceInterfaceSpy},
                {provide: GameTutorialService, useValue: gameTutorialServiceSpy},
                {provide: TutorialComponentService, useValue: tutorialComponentServiceSpy},
                {provide: CurrentPlayerManagerService, useValue: currentPlayerManagerServiceSpy},
                {provide: VrModeGameEngineService, useValue: vrModeGameEngineServiceSpy},
                {provide: PlayerRepositoryService, useValue: playerRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VrModeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
