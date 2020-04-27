import { BuildingsRepositoryService } from 'src/warcommands/basic-mode/domain/building/services/buildings-repository.service';
import { BuildingDTO, SpawnerBuildingDTO } from 'src/warcommands/basic-mode/domain/building/model/building.dto';
import * as _ from "lodash";
import { BuildingsNgrxRepositoryService } from '../../ngrx/buildings/buildings-ngrx-repository.service';
import { Injectable } from '@angular/core';
import { UnitGenericDTO } from 'src/warcommands/basic-mode/domain/units/unit-generic.dto';

@Injectable({
    providedIn: 'root'
})
export class InMemoryBuildingsRepositoryService implements BuildingsRepositoryService {
    
    private buildingList: Map<string, BuildingDTO> = new Map<string, BuildingDTO>();

    constructor(
        private readonly buildingsNgrxRepositoryService: BuildingsNgrxRepositoryService
    ) {}

    save(building: BuildingDTO): void {
        const clone = _.cloneDeep(building);
        this.buildingList.set(clone.id, clone)
        this.buildingsNgrxRepositoryService.save(clone);
    }

    findById(buildingId: string): BuildingDTO {
        return _.cloneDeep(this.buildingList.get(buildingId));
    }

    remove(building: BuildingDTO): void {
        this.buildingList.delete(building.id);
        this.buildingsNgrxRepositoryService.remove(building);
    }

    addUnitToQueue(unit: UnitGenericDTO): void {
        const building: SpawnerBuildingDTO = (this.buildingList.get(unit.spawnerBuildingId) as SpawnerBuildingDTO);
        const clone = _.cloneDeep(building);
        clone.queueList.push(unit);
        this.buildingsNgrxRepositoryService.addUnitToQueue(unit);
        this.buildingList.set(clone.id, clone);
    }

    removeUnitFromQueue(unit: UnitGenericDTO): void {
        const building: SpawnerBuildingDTO = (this.buildingList.get(unit.spawnerBuildingId) as SpawnerBuildingDTO);
        const clone = _.cloneDeep(building);
        
        const unitIndex = clone.queueList.findIndex((queuedUnit) => {
            return queuedUnit.id === unit.id;
        });
        clone.queueList.splice(unitIndex, 1);

        this.buildingsNgrxRepositoryService.removeUnitFromQueue(unit);
        this.buildingList.set(clone.id, clone);
    }
    
}