import { BuildingDTO, SpawnerBuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";

export abstract class BaseBuildingManagerService {
    
    abstract addBase(building: BuildingDTO): void;

    abstract spawnUnit(building: SpawnerBuildingDTO): void;

    abstract addUnitToQueue(unit: UnitGenericDTO, building: SpawnerBuildingDTO): void;

    abstract buildingRemoveUnitFromQueue(unit: UnitGenericDTO, building: SpawnerBuildingDTO): void;
}