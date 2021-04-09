import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";

export abstract class MatterFarmBuildingManagerService {
    
    abstract addFarm(building: BuildingDTO): void;
}