import { BuildingsRepositoryService } from 'src/warcommands/basic-mode/domain/building/services/buildings-repository.service';
import { BuildingDTO, SpawnerBuildingDTO } from 'src/warcommands/basic-mode/domain/building/model/building.dto';
import * as _ from 'lodash';
import { BuildingsNgrxRepositoryService } from '../../ngrx/buildings/buildings-ngrx-repository.service';
import { Injectable } from '@angular/core';
import { UnitGenericDTO } from 'src/warcommands/basic-mode/domain/units/model/unit-generic.dto';
import { ResourcesDTO } from 'src/warcommands/basic-mode/domain/share/model/resources.dto';
import { BaseEntityInterface } from 'src/warcommands/basic-mode/domain/building/base/base-entity-interface';
import { QueryFilterDTO } from 'src/warcommands/basic-mode/domain/share/model/query-filter.dto';

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
        return <BuildingDTO>_.cloneDeep(this.buildingList.get(buildingId));
    }

    findBy(filterList: QueryFilterDTO): BuildingDTO[] {
        const filteredList: BuildingDTO[] = [];
        const filterKeyList = Object.keys(filterList);

        this.buildingList.forEach((building) => {
            
            let filtersMatch = true;

            for (const filterKey of filterKeyList) {
                const objectKey = filterKey as keyof BuildingDTO;
                if (building[objectKey] !== filterList[objectKey]) {
                    filtersMatch = false;
                    break;
                }
            }

            if (filtersMatch) {
                filteredList.push(_.cloneDeep(building));
            }
        });

        return filteredList;
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

    updateBaseResources(baseId: string, resources: ResourcesDTO): void {
        let base: BaseEntityInterface = (this.buildingList.get(baseId) as BaseEntityInterface);
        base = _.cloneDeep(base);
        base.resources = resources;
        this.buildingList.set(baseId, base);

        this.buildingsNgrxRepositoryService.updateBaseResources(baseId, resources);
    }
}