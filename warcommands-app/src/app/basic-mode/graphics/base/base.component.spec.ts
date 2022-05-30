import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BaseComponent} from './base.component';
import {
    GAME_CONFIG,
    GAME_ENGINE_BASIC_MODE_CONFIGURATION,
} from "../../../../warcommands/basic-mode/game-engine-basic-mode-configurations";
import {
    BuildingsNgrxRepositoryService
} from "../../../../warcommands/basic-mode/infrastructure/ngrx/buildings/buildings-ngrx-repository.service";
import {
    RequestAnimationFrameService
} from "../../../../warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service";
import {
    CurrentPlayerRepositoryService
} from "../../../../warcommands/commands-panel/domain/current-player/services/current-player-repository.service";
import {Renderer2} from "@angular/core";
import {BuildingTypeEnum} from "../../../../warcommands/basic-mode/domain/building/model/building-type.enum";
import {BaseEntityInterface} from "../../../../warcommands/basic-mode/domain/building/base/base-entity-interface";
import {CurrentPlayerDTO} from "../../../../warcommands/commands-panel/domain/current-player/model/current-player.dto";
import {of} from "rxjs";

describe('BaseComponent', () => {
    let component: BaseComponent;
    let fixture: ComponentFixture<BaseComponent>;
    let currentPlayerRepositoryServiceSpy;
    let buildingsNgrxRepositoryServiceSpy;
    let baseStub: BaseEntityInterface;
    let requestAnimationFrameServiceSpy;

    beforeEach(waitForAsync(() => {
        currentPlayerRepositoryServiceSpy = jasmine.createSpyObj('CurrentPlayerRepositoryService',['getPlayer']);
        const stubPlayer: CurrentPlayerDTO = {id: 'id'};
        currentPlayerRepositoryServiceSpy.getPlayer.and.returnValue(stubPlayer);

        buildingsNgrxRepositoryServiceSpy = jasmine.createSpyObj('BuildingsNgrxRepositoryService', ['watchBuilding']);
        baseStub = {
            resources: {
                matter: 0,
                energy: 0,
            },
            id: "",
            name: "main",
            playerId: "",
            sizeHeight: 0,
            sizeWidth: 0,
            type: BuildingTypeEnum.Base,
            xCoordinate: 0,
            yCoordinate: 0,
            queueList: [],
            spawnRelativeCoordinates: {
                xCoordinate: 0,
                yCoordinate: 0,
            },
            unitSpawning: {
                unit: null,
                spawnFinish: 0,
                spawnStart: 0
            }
        };
        buildingsNgrxRepositoryServiceSpy.watchBuilding.and.returnValue(of(baseStub));

        requestAnimationFrameServiceSpy = jasmine.createSpyObj('RequestAnimationFrameService',['getCurrentTime']);
        requestAnimationFrameServiceSpy.getCurrentTime.and.returnValue(0);

        TestBed.configureTestingModule({
            declarations: [BaseComponent],
            providers: [
                {provide: GAME_CONFIG, useValue: GAME_ENGINE_BASIC_MODE_CONFIGURATION},
                {provide: BuildingsNgrxRepositoryService, useValue: buildingsNgrxRepositoryServiceSpy},
                {provide: RequestAnimationFrameService, useValue: requestAnimationFrameServiceSpy},
                {provide: CurrentPlayerRepositoryService, useValue: currentPlayerRepositoryServiceSpy},
                {provide: Renderer2, useValue: Renderer2Stub},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseComponent);
        component = fixture.componentInstance;

        component.data = baseStub;


        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

let Renderer2Stub: Partial<Renderer2>;

