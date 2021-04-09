import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { MatterFarmBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/matter-farm-building-manager.service";
import { AframeSceneService } from "../aframe-scene.service";


export class AframeMatterFarmBuildingManagerService implements MatterFarmBuildingManagerService{

    constructor(
        private readonly aframeSceneService: AframeSceneService,
    ) {
        
    }

	addFarm(building: BuildingDTO): void {
        const aframeScene = this.aframeSceneService.getSceneElement();
        const poolBase = (aframeScene.components['pool__matter_farm_building'] as any).requestEntity();
        
        poolBase.addEventListener('loaded', (event: any) => {    
            poolBase.setAttribute('matter-farm-building-component', { 'building': building });
        });

        poolBase.setAttribute('position', { x: building.xCoordinate, y: 0, z: building.yCoordinate }); 
        
    }

}