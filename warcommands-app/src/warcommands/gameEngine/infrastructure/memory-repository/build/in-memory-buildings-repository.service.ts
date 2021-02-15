import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { BuildingDTO } from 'src/warcommands/gameEngine/domain/building/model/building.dto';
import { BuildingTypeEnum } from 'src/warcommands/gameEngine/domain/building/model/building-type.enum';
import * as _ from "lodash";

export class InMemoryBuildingsRepositoryService implements BuildingsRepositoryService {

    private buildingsList: Map<string, BuildingDTO> = new Map<string, BuildingDTO>();

    save(building: BuildingDTO): void {
        const clonedBuilding = _.cloneDeep(building);
        this.buildingsList.set(building.id, clonedBuilding);
    }

    findById(buildingId: string): BuildingDTO {
        const building = this.buildingsList.get(buildingId);
        const clonedBuilding = _.cloneDeep(building);
        return clonedBuilding;
    }

    findByTypePlayer(buildingType: BuildingTypeEnum, playerId: string): BuildingDTO[] {
        const foundBuilding:BuildingDTO[] = [];

        for (const building of this.buildingsList.values()) {
            if (building.type === buildingType && building.playerId === playerId) {
                foundBuilding.push(building);
            }
        }

        return foundBuilding;
    }

    remove(building: BuildingDTO): void {
        this.buildingsList.delete(building.id);
    }

}