import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";

export abstract class EnergyFarmBuildingManagerService {
    
    abstract addFarm(building: BuildingDTO): void;
}