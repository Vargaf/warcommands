import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";

export abstract class BaseBuildingManagerService {
    
    abstract addBase(building: BuildingDTO): void;
}