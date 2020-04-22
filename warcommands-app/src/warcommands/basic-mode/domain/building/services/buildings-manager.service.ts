import { Injectable } from '@angular/core';
import { BuildingDTO, SpawnerBuildingDTO } from '../model/building.dto';
import { BaseStoreService } from 'src/warcommands/basic-mode/infrastructure/ngrx/base/base-store.service';
import { DomElementInjectorService } from 'src/warcommands/basic-mode/infrastructure/angular/dom-element-injector.service';
import { BaseEntityInterface } from '../base/base-entity-interface';
import { BuildingsRepositoryService } from './buildings-repository.service';
import { UnitGenericDTO } from '../../units/unit-generic.dto';

@Injectable({
    providedIn: 'root'
})
export class BuildingsManagerService {

    constructor(
        private readonly baseStoreService: BaseStoreService,
        private readonly domElementIjenctorService: DomElementInjectorService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService
    ) {}

    addBuilding(building: BuildingDTO): void {
        this.baseStoreService.addBase((building as BaseEntityInterface));
        this.domElementIjenctorService.addBase((building as BaseEntityInterface));
        this.buildingsRepositoryService.save(building);
    }

    spawningUnit(unit: UnitGenericDTO, spawnFinish: number, spawnStart: number): void {
        const building: SpawnerBuildingDTO = (this.buildingsRepositoryService.findById(unit.buildingId) as SpawnerBuildingDTO);
        building.unitSpawning = {
            unit,
            spawnFinish,
            spawnStart
        }
        this.buildingsRepositoryService.save(building);
    }

}