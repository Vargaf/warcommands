import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AFrameHolderComponent} from './a-frame-holder.component';
import {GameMiddlewareService} from "../../../../warcommands/game-middleware/game-middleware.service";
import {
    CurrentPlayerManagerService
} from "../../../../warcommands/commands-panel/domain/current-player/current-player-manager-service";
import {VrModeGameEngineService} from "../../../../warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service";
import {
    PlayerRepositoryService
} from "../../../../warcommands/vr-mode/domain/players/services/player-repository.service";
import {
    CurrentPlayerDTO as MiddlewareCurrentPlayerDTO
} from "../../../../warcommands/commands-panel/domain/current-player/model/current-player.dto";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('AFrameHolderComponent', () => {
    let component: AFrameHolderComponent;
    let fixture: ComponentFixture<AFrameHolderComponent>;

    let gameMiddlewareServiceSpy;
    let currentPlayerManagerServiceSpy;
    let vrModeGameEngineServiceSpy;
    let playerRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {
        gameMiddlewareServiceSpy = jasmine.createSpyObj('GameMiddlewareService', ['setMap', 'addPlayer', 'addIAPlayer', 'initialize']);

        currentPlayerManagerServiceSpy = jasmine.createSpyObj('CurrentPlayerManagerService', ['initializePlayer'])
        const playerDTO: MiddlewareCurrentPlayerDTO = {
            id: 'identifier',
        };
        currentPlayerManagerServiceSpy.initializePlayer.and.returnValue(playerDTO);

        playerRepositoryServiceSpy = jasmine.createSpyObj('PlayerRepositoryService', ['save'])

        vrModeGameEngineServiceSpy = jasmine.createSpyObj('VrModeGameEngineService', ['waitTillSceneIsLoaded', 'pauseGame']);
        const mockScene = {};
        vrModeGameEngineServiceSpy.waitTillSceneIsLoaded.and.returnValue(Promise.resolve(mockScene));
        TestBed.configureTestingModule({
            declarations: [AFrameHolderComponent],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [
                {provide: GameMiddlewareService, useValue: gameMiddlewareServiceSpy},
                {provide: CurrentPlayerManagerService, useValue: currentPlayerManagerServiceSpy},
                {provide: VrModeGameEngineService, useValue: vrModeGameEngineServiceSpy},
                {provide: PlayerRepositoryService, useValue: playerRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AFrameHolderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
