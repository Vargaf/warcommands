import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EnergyFarmComponent} from './energy-farm.component';
import {
    GAME_CONFIG,
    GAME_ENGINE_BASIC_MODE_CONFIGURATION
} from "../../../../warcommands/basic-mode/game-engine-basic-mode-configurations";
import {
    BuildingsNgrxRepositoryService
} from "../../../../warcommands/basic-mode/infrastructure/ngrx/buildings/buildings-ngrx-repository.service";
import {
    EnergyFarmBuildingDTO
} from "../../../../warcommands/basic-mode/domain/building/energy-farm/energy-farm-building.dto";
import {BuildingTypeEnum} from "../../../../warcommands/basic-mode/domain/building/model/building-type.enum";
import {of} from "rxjs";

describe('EnergyFarmComponent', () => {
    let component: EnergyFarmComponent;
    let fixture: ComponentFixture<EnergyFarmComponent>;

    let buildingsNgrxRepositoryServiceSpy;
    let energyFarmBuildingMock: EnergyFarmBuildingDTO;

    beforeEach(waitForAsync(() => {
        buildingsNgrxRepositoryServiceSpy = jasmine.createSpyObj('BuildingsNgrxRepositoryService', ['watchBuilding']);
        energyFarmBuildingMock = {
            id: "",
            playerId: "",
            sizeHeight: 0,
            sizeWidth: 0,
            type: BuildingTypeEnum.EnergyFarm,
            xCoordinate: 0,
            yCoordinate: 0
        };
        buildingsNgrxRepositoryServiceSpy.watchBuilding.and.returnValue(of(energyFarmBuildingMock));
        TestBed.configureTestingModule({
            declarations: [EnergyFarmComponent],
            providers: [
                {provide: GAME_CONFIG, useValue: GAME_ENGINE_BASIC_MODE_CONFIGURATION},
                {provide: BuildingsNgrxRepositoryService, useValue: buildingsNgrxRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnergyFarmComponent);
        component = fixture.componentInstance;

        component.data = energyFarmBuildingMock;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
