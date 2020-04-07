import { BuildingDTO } from '../model/building.dto';

export abstract class BuildingsRepositoryService {

    abstract save(building: BuildingDTO): void;

    abstract findById(buildingId: string): BuildingDTO;

    abstract remove(building: BuildingDTO): void;

}