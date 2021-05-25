import { BuildingDTO, SpawnerBuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";

export abstract class BaseBuildingManagerService {
    
    abstract addBase(building: BuildingDTO): void;

    abstract spawnUnit(building: SpawnerBuildingDTO): void;
}