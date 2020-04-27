import { Injectable } from '@angular/core';
import { BuildingDTO, SpawnerBuildingDTO } from '../model/building.dto';
import { DomElementInjectorService } from 'src/warcommands/basic-mode/infrastructure/angular/dom-element-injector.service';
import { BaseEntityInterface } from '../base/base-entity-interface';
import { BuildingsRepositoryService } from './buildings-repository.service';
import { UnitGenericDTO } from '../../units/unit-generic.dto';

@Injectable({
    providedIn: 'root'
})
export class BuildingsManagerService {

    constructor(
        private readonly domElementIjenctorService: DomElementInjectorService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService
    ) {}

    addBuilding(building: BuildingDTO): void {
        this.domElementIjenctorService.addBase((building as BaseEntityInterface));
        this.buildingsRepositoryService.save(building);
    }

    spawningUnit(unit: UnitGenericDTO, spawnFinish: number, spawnStart: number): void {
        const building: SpawnerBuildingDTO = (this.buildingsRepositoryService.findById(unit.spawnerBuildingId) as SpawnerBuildingDTO);
        building.unitSpawning = {
            unit,
            spawnFinish,
            spawnStart
        }
        this.buildingsRepositoryService.save(building);
    }

    unitSpawned(unit: UnitGenericDTO): void {
        const building: SpawnerBuildingDTO = (this.buildingsRepositoryService.findById(unit.spawnerBuildingId) as SpawnerBuildingDTO);
        building.unitSpawning = {
            unit: null,
            spawnFinish: 0,
            spawnStart: 0
        }
        this.buildingsRepositoryService.save(building);
    }

    queueingUnit(unit: UnitGenericDTO): void {
        this.buildingsRepositoryService.addUnitToQueue(unit);
    }

    removingUnitFromQueue(unit: UnitGenericDTO): void {
        this.buildingsRepositoryService.removeUnitFromQueue(unit);
    }

}