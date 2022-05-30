import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WorkerComponent} from './worker.component';
import {
    GAME_CONFIG,
    GAME_ENGINE_BASIC_MODE_CONFIGURATION
} from "../../../../warcommands/basic-mode/game-engine-basic-mode-configurations";
import {
    UnitNgrxRepositoryService
} from "../../../../warcommands/basic-mode/infrastructure/ngrx/units/unit-ngrx-repository.service";
import {
    CurrentPlayerRepositoryService
} from "../../../../warcommands/commands-panel/domain/current-player/services/current-player-repository.service";
import {
    RequestAnimationFrameService
} from "../../../../warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service";
import {UnitGenericDTO} from "../../../../warcommands/basic-mode/domain/units/model/unit-generic.dto";
import {UnitActionTypeENUM} from "../../../../warcommands/basic-mode/domain/units/model/unit-action-type.enum";
import {UnitActionStatusENUM} from "../../../../warcommands/basic-mode/domain/units/model/unit-action-status.enum";
import {UnitTypeENUM} from "../../../../warcommands/basic-mode/domain/units/unit-type.enum";
import {of} from "rxjs";

describe('WorkerComponent', () => {
    let component: WorkerComponent;
    let fixture: ComponentFixture<WorkerComponent>;

    let unitNgrxRepositoryServiceSpy;
    let currentPlayerRepositoryServiceSpy;
    let requestAnimationFrameServiceSpy;

    let componentDataMock: UnitGenericDTO;

    beforeEach(waitForAsync(() => {
        componentDataMock = {
            action: {
                id: '',
                type: UnitActionTypeENUM.Deliver,
                actionStatus: UnitActionStatusENUM.Finished,
                data: ''
            },
            attributes: {armor: 0, fire: 0, hitPoints: 0, speed: 0},
            baseId: "",
            id: "",
            playerId: "",
            size: {height: 0, width: 0},
            spawnerBuildingId: "",
            type: UnitTypeENUM.Worker,
            xCoordinate: 0,
            yCoordinate: 0
        };

        unitNgrxRepositoryServiceSpy = jasmine.createSpyObj('UnitNgrxRepositoryService', ['watchUnit']);
        unitNgrxRepositoryServiceSpy.watchUnit.and.returnValue(of(componentDataMock));
        currentPlayerRepositoryServiceSpy = jasmine.createSpyObj('CurrentPlayerRepositoryService', ['getPlayer']);
        currentPlayerRepositoryServiceSpy.getPlayer.and.returnValue(componentDataMock);
        requestAnimationFrameServiceSpy = jasmine.createSpyObj('RequestAnimationFrameService', ['onFrameUpdate']);
        const currentTimeMock = 0;
        requestAnimationFrameServiceSpy.onFrameUpdate.and.returnValue(of(currentTimeMock));
        TestBed.configureTestingModule({
            declarations: [WorkerComponent],
            providers: [
                {provide: GAME_CONFIG, useValue: GAME_ENGINE_BASIC_MODE_CONFIGURATION},
                {provide: UnitNgrxRepositoryService, useValue: unitNgrxRepositoryServiceSpy},
                {provide: CurrentPlayerRepositoryService, useValue: currentPlayerRepositoryServiceSpy},
                {provide: RequestAnimationFrameService, useValue: requestAnimationFrameServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerComponent);
        component = fixture.componentInstance;
        component.data = componentDataMock;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
