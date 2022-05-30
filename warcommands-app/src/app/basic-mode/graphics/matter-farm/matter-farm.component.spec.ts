import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MatterFarmComponent} from './matter-farm.component';
import {
    GAME_CONFIG,
    GAME_ENGINE_BASIC_MODE_CONFIGURATION
} from "../../../../warcommands/basic-mode/game-engine-basic-mode-configurations";
import {
    BuildingsNgrxRepositoryService
} from "../../../../warcommands/basic-mode/infrastructure/ngrx/buildings/buildings-ngrx-repository.service";
import {
    MatterFarmBuildingDTO
} from "../../../../warcommands/basic-mode/domain/building/matter-farm/matter-farm-building.dto";
import {BuildingTypeEnum} from "../../../../warcommands/basic-mode/domain/building/model/building-type.enum";
import {of} from "rxjs";

describe('MatterFarmComponent', () => {
    let component: MatterFarmComponent;
    let fixture: ComponentFixture<MatterFarmComponent>;

    let buildingsNgrxRepositoryServiceSpy;
    let matterFarmBuildingMock: MatterFarmBuildingDTO;

    beforeEach(waitForAsync(() => {
        buildingsNgrxRepositoryServiceSpy = jasmine.createSpyObj('BuildingsNgrxRepositoryService', ['watchBuilding']);
        matterFarmBuildingMock = {
            id: "",
            playerId: "",
            sizeHeight: 0,
            sizeWidth: 0,
            type: BuildingTypeEnum.MatterFarm,
            xCoordinate: 0,
            yCoordinate: 0
        };
        buildingsNgrxRepositoryServiceSpy.watchBuilding.and.returnValue(of(matterFarmBuildingMock));
        TestBed.configureTestingModule({
            declarations: [MatterFarmComponent],
            providers: [
                {provide: GAME_CONFIG, useValue: GAME_ENGINE_BASIC_MODE_CONFIGURATION},
                {provide: BuildingsNgrxRepositoryService, useValue: buildingsNgrxRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatterFarmComponent);
        component = fixture.componentInstance;
        component.data = matterFarmBuildingMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
