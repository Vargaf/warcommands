import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { BaseBuildingManagerService } from "./base-building-manager.service";
import { BuildingsRepositoryInterface } from "./buildings-repository.interface";
import { MatterFarmBuildingManagerService } from "./matter-farm-building-manager.service";
import { EnergyFarmBuildingManagerService } from "./energy-farm-building-manager.service";
import { ResourcesDTO } from "src/warcommands/game-middleware/model/resources/reources.dto";
import { BaseBuildingDTO } from "src/warcommands/game-middleware/model/building/base-building.dto";


export class BuildingsManagerService {
    
    constructor(
		private readonly baseBuildingManager: BaseBuildingManagerService,
        private readonly buildingsRepositoy: BuildingsRepositoryInterface,
        private readonly matterFarmBuildingManager: MatterFarmBuildingManagerService,
        private readonly energyFarmBuildingManager: EnergyFarmBuildingManagerService,
    ) {}

    addBuilding(building: BuildingDTO): void {

        this.buildingsRepositoy.save(building);

        if(building.type === BuildingTypeEnum.Base) {
            this.baseBuildingManager.addBase(building);
        }

        if(building.type === BuildingTypeEnum.MatterFarm) {
            this.matterFarmBuildingManager.addFarm(building);
        }

        if(building.type === BuildingTypeEnum.EnergyFarm) {
            this.energyFarmBuildingManager.addFarm(building);
        }
        
    }

    updateBaseResources(baseId: string, resources: ResourcesDTO): void {
        const base: BaseBuildingDTO = <BaseBuildingDTO>this.buildingsRepositoy.findOneById(baseId);
        base.resources = resources;
        this.buildingsRepositoy.save(base);
    }

}