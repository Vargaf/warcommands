import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { ModelLoaderInterfaceService } from "../../game-engine/model-loader-abstract.service";
import { SceneObjectLoaderInterface } from "../../game-engine/scene-object-loader.interface";
import { THREE } from 'aframe';
import { BaseBuildingManagerService } from "./base-building-manager.service";
import { BuildingsRepositoryInterface } from "./buildings-repository.interface";
import { MatterFarmBuildingManagerService } from "./matter-farm-building-manager.service";


export class BuildingsManagerService {
    
    constructor(
		private readonly modelLoader: ModelLoaderInterfaceService,
        private readonly sceneObjectLoader: SceneObjectLoaderInterface,
        private readonly baseBuildingManager: BaseBuildingManagerService,
        private readonly buildingsRepositoy: BuildingsRepositoryInterface,
        private readonly matterFarmBuildingManager: MatterFarmBuildingManagerService,
    ) {}

    addBuilding(building: BuildingDTO): void {

        this.buildingsRepositoy.save(building);

        if(building.type === BuildingTypeEnum.Base) {
            this.baseBuildingManager.addBase(building);
        }

        if(building.type === BuildingTypeEnum.MatterFarm) {
            this.matterFarmBuildingManager.addFarm(building);
            //const position = new THREE.Vector3(building.xCoordinate, 0, building.yCoordinate);
            //this.sceneObjectLoader.addObject(<string>building.id, 'MatterFarm', position);
        }

        if(building.type === BuildingTypeEnum.EnergyFarm) {
            const position = new THREE.Vector3(building.xCoordinate, 0, building.yCoordinate);
            this.sceneObjectLoader.addObject(<string>building.id, 'EnergyFarm', position);
        }
        
    }

}