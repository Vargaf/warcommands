import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { BuildingFilterDTO } from "src/warcommands/vr-mode/domain/buildings/model/building-filter.dto";
import { BuildingsRepositoryInterface } from "src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface";
import * as _ from 'lodash';

export class InMemoryBuildingsRepositoryService implements BuildingsRepositoryInterface {
    
    private buildingList: Map<string, BuildingDTO> = new Map<string, BuildingDTO>();

    save(building: BuildingDTO): void {
        this.buildingList.set(<string>building.id, _.cloneDeep(building));
    }

    findBy(filter: BuildingFilterDTO): BuildingDTO[] {
        const filteredList: BuildingDTO[] = [];
        const filterKeyList = Object.keys(filter);

        this.buildingList.forEach((item) => {
            
            let filtersMatch = true;

            for (const filterKey of filterKeyList) {
                const objectKey = filterKey as keyof BuildingFilterDTO;
                if (item[objectKey] !== filter[objectKey]) {
                    filtersMatch = false;
                    break;
                }
            }

            if (filtersMatch) {
                filteredList.push(_.cloneDeep(item));
            }
        });

        return filteredList;
    }
    
}