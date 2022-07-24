import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PlayerResourcesComponent} from './player-resources.component';
import {
    BuildingsNgrxRepositoryService
} from "../../../../warcommands/basic-mode/infrastructure/ngrx/buildings/buildings-ngrx-repository.service";
import {BuildingTypeEnum} from "../../../../warcommands/basic-mode/domain/building/model/building-type.enum";
import {BaseEntityInterface} from "../../../../warcommands/basic-mode/domain/building/base/base-entity-interface";
import {of} from "rxjs";
import {MatIconModule} from "@angular/material/icon";

describe('PlayerResourcesComponent', () => {
    let component: PlayerResourcesComponent;
    let fixture: ComponentFixture<PlayerResourcesComponent>;

    let buildingsNgrxRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {

        buildingsNgrxRepositoryServiceSpy = jasmine.createSpyObj('BuildingsNgrxRepositoryService', ['watchBuilding'])
        const baseMock: BaseEntityInterface = {
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

        buildingsNgrxRepositoryServiceSpy.watchBuilding.and.returnValue(of(baseMock));

        TestBed.configureTestingModule({
            declarations: [PlayerResourcesComponent],
            imports: [MatIconModule],
            providers: [
                { provide: BuildingsNgrxRepositoryService, useValue: buildingsNgrxRepositoryServiceSpy },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayerResourcesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
