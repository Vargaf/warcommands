import { BuildingDTO } from '../model/building.dto';
import { BuildingTypeEnum } from '../model/building-type.enum';

export abstract class BuildingsRepositoryService {

    abstract save(building: BuildingDTO): void;

    abstract findById(buildingId: string): BuildingDTO;

    abstract findByTypePlayer(buildingType: BuildingTypeEnum, playerId: string): BuildingDTO[];

    abstract remove(building: BuildingDTO): void;

}