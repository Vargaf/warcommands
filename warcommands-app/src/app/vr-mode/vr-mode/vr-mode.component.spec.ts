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

    beforeEach(waitForAsync(() => {
        aFrameStatsServiceSpy = jasmine.createSpyObj('AFrameStatsService', ['a']);
        gameMiddlewareServiceSpy = jasmine.createSpyObj('GameMiddlewareService', ['a']);

        aframeSceneServiceSpy = jasmine.createSpyObj('AframeSceneService', ['isLoaded']);
        const aFrameIsLoaded = false;
        aframeSceneServiceSpy.isLoaded.and.returnValue(Promise.resolve(aFrameIsLoaded));

        gameLogicClockServiceSpy = jasmine.createSpyObj('GameLogicClockService', ['currentSpeedObservable']);
        const speed = 12345;
        gameLogicClockServiceSpy.currentSpeedObservable.and.returnValue(of(speed));
        tutorialComponentToggleServiceInterfaceSpy = jasmine.createSpyObj('TutorialComponentToggleServiceInterface', ['a']);
        gameTutorialServiceSpy = jasmine.createSpyObj('GameTutorialService', ['a']);
        tutorialComponentServiceSpy = jasmine.createSpyObj('TutorialComponentService', ['a']);
        TestBed.configureTestingModule({
            declarations: [VrModeComponent],
            providers: [
                {provide: AFrameStatsService, useValue: aFrameStatsServiceSpy},
                {provide: GameMiddlewareService, useValue: gameMiddlewareServiceSpy},
                {provide: AframeSceneService, useValue: aframeSceneServiceSpy},
                {provide: GameLogicClockService, useValue: gameLogicClockServiceSpy},
                {provide: TutorialComponentToggleServiceInterface, useValue: tutorialComponentToggleServiceInterfaceSpy},
                {provide: GameTutorialService, useValue: gameTutorialServiceSpy},
                {provide: TutorialComponentService, useValue: tutorialComponentServiceSpy},
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
