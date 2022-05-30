import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BasicModeComponent} from './basic-mode.component';
import {GameMiddlewareService} from "../../warcommands/game-middleware/game-middleware.service";
import {
    CurrentPlayerManagerService
} from "../../warcommands/commands-panel/domain/current-player/current-player-manager-service";
import {BasicModeGameEngineService} from "../../warcommands/basic-mode/game-engine-basic-mode.service";
import {CurrentPlayerDTO} from "../../warcommands/commands-panel/domain/current-player/model/current-player.dto";

describe('BasicModeComponent', () => {
    let component: BasicModeComponent;
    let fixture: ComponentFixture<BasicModeComponent>;

    let gameMiddlewareServiceSpy;
    let currentPlayerManagerServiceSpy;
    let basicModeGameEngineServiceSpy;

    beforeEach(waitForAsync(() => {
        gameMiddlewareServiceSpy = jasmine.createSpyObj('GameMiddlewareService', ['setMap', 'addPlayer', 'addIAPlayer', 'initialize']);
        currentPlayerManagerServiceSpy = jasmine.createSpyObj('CurrentPlayerManagerService', ['initializePlayer']);
        const playerMock: CurrentPlayerDTO = {id: ''};
        currentPlayerManagerServiceSpy.initializePlayer.and.returnValue(playerMock);
        basicModeGameEngineServiceSpy = jasmine.createSpyObj('BasicModeGameEngineService', ['setViewContainerRef']);
        TestBed.configureTestingModule({
            declarations: [BasicModeComponent],
            providers: [
                {provide: GameMiddlewareService, useValue: gameMiddlewareServiceSpy},
                {provide: CurrentPlayerManagerService, useValue: currentPlayerManagerServiceSpy},
                {provide: BasicModeGameEngineService, useValue: basicModeGameEngineServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicModeComponent);
        component = fixture.componentInstance;
        const viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['a']);
        component.basicModeGraphicsWrapper = {
            viewContainerRef:viewContainerRefMock
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
