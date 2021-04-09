import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { ModelLoaderInterfaceService } from "../../game-engine/model-loader-abstract.service";
import { SceneObjectLoaderInterface } from "../../game-engine/scene-object-loader.interface";
import { THREE } from 'aframe';
import { BaseBuildingManagerService } from "./base-building-manager.service";
import { BuildingsRepositoryInterface } from "./buildings-repository.interface";


export class BuildingsManagerService {
    
    constructor(
		private readonly modelLoader: ModelLoaderInterfaceService,
        private readonly sceneObjectLoader: SceneObjectLoaderInterface,
        private readonly baseBuildingManager: BaseBuildingManagerService,
        private readonly buildingsRepositoy: BuildingsRepositoryInterface,
    ) {}

    addBuilding(building: BuildingDTO): void {

        this.buildingsRepositoy.save(building);
        
        if(building.type === BuildingTypeEnum.Base) {
            /*
            const position = new THREE.Vector3(building.xCoordinate, 0, building.yCoordinate);
            this.sceneObjectLoader.addObject(<string>building.id, 'Base', position);
            */
            this.baseBuildingManager.addBase(building);
            /*
            this.modelLoader.loadPreloadedModel('Base').then((model) => {
                
            });
            */
            
        }

        if(building.type === BuildingTypeEnum.MatterFarm) {
            const position = new THREE.Vector3(building.xCoordinate, 0, building.yCoordinate);
            this.sceneObjectLoader.addObject(<string>building.id, 'MatterFarm', position);
        }

        if(building.type === BuildingTypeEnum.EnergyFarm) {
            const position = new THREE.Vector3(building.xCoordinate, 0, building.yCoordinate);
            this.sceneObjectLoader.addObject(<string>building.id, 'EnergyFarm', position);
        }
        
    }

}